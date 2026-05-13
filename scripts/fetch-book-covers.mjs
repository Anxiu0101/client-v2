/**
 * Fetch hi-res book covers from Amazon by ISBN.
 *
 * Usage: node scripts/fetch-book-covers.mjs
 *
 * Reads content/books/index.yml, downloads covers for each book
 * with an ISBN, saves to public/images/books/{isbn}.jpg,
 * and updates the YAML cover path.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { get } from 'https'
import yaml from 'js-yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const YML_PATH = join(root, 'content', 'books', 'index.yml')
const OUTPUT_DIR = join(root, 'public', 'images', 'books')

// Amazon hi-res cover URL template — ISBN works as ASIN for most books
const COVER_URL = (isbn) => `https://ec2.images-amazon.com/images/P/${isbn}.01.LZZZZZZZ.jpg`
// Fallback: medium size
const FALLBACK_URL = (isbn) => `https://ec2.images-amazon.com/images/P/${isbn}.01.MZZZZZZZ.jpg`

function download(url, dest) {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      // Amazon may redirect to a different domain
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, dest).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => {
        // Check if response is an image (not HTML error page)
        const contentType = res.headers['content-type'] || ''
        if (!contentType.startsWith('image/')) {
          reject(new Error(`Non-image response: ${contentType}`))
          return
        }
        writeFileSync(dest, Buffer.concat(chunks))
        resolve()
      })
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function main() {
  if (!existsSync(YML_PATH)) {
    console.error(`Not found: ${YML_PATH}`)
    process.exit(1)
  }

  mkdirSync(OUTPUT_DIR, { recursive: true })

  const raw = readFileSync(YML_PATH, 'utf-8')
  const books = yaml.load(raw)

  if (!Array.isArray(books)) {
    console.error('Expected YAML array in books/index.yml')
    process.exit(1)
  }

  let updated = false

  for (const book of books) {
    const isbn = book.isbn
    if (!isbn) continue

    // Strip hyphens for Amazon URL
    const cleanIsbn = isbn.replace(/-/g, '')
    const destFile = join(OUTPUT_DIR, `${cleanIsbn}.jpg`)
    const publicPath = `/images/books/${cleanIsbn}.jpg`

    if (book.cover === publicPath && existsSync(destFile)) {
      console.log(`  ✓ ${book.title} — already up to date`)
      continue
    }

    const url = COVER_URL(cleanIsbn)
    console.log(`  → ${book.title} (${cleanIsbn})`)

    try {
      await download(url, destFile)
      book.cover = publicPath
      updated = true
      console.log(`    ✓ saved to ${publicPath}`)
    } catch {
      // Try fallback URL
      console.log(`    ⚡ primary failed, trying fallback...`)
      try {
        await download(FALLBACK_URL(cleanIsbn), destFile)
        book.cover = publicPath
        updated = true
        console.log(`    ✓ saved to ${publicPath} (fallback)`)
      } catch (e) {
        console.error(`    ✗ failed: ${e.message}`)
      }
    }
  }

  if (updated) {
    const newYaml = yaml.dump(books, {
      lineWidth: 120,
      noRefs: true,
      quotingType: '"',
      forceQuotes: false,
    })
    writeFileSync(YML_PATH, newYaml, 'utf-8')
    console.log(`\n  Updated ${YML_PATH}`)
  }

  console.log('\nDone.')
}

main()
