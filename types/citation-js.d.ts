declare module '@citation-js/core' {
  interface Author {
    given: string
    family: string
  }

  interface CSLDate {
    'date-parts'?: [[number]]
    literal?: string
  }

  interface CSLData {
    id: string
    type: string
    title: string
    author?: Author[]
    issued?: CSLDate
    publisher?: string
    'container-title'?: string
    URL?: string
    DOI?: string
    ISBN?: string
    ISSN?: string
    volume?: string
    issue?: string
    page?: string
    [key: string]: unknown
  }

  export class Cite {
    constructor(data: string)
    data: CSLData[]
    format(formatName: string, options?: Record<string, unknown>): string
  }

  export const plugins: {
    config: Record<string, unknown>
    add: (plugin: unknown) => void
  }
}

declare module '@citation-js/plugin-bibtex' {
  // Side-effect plugin, no exports needed
}
