# Font Optimization — Anxiu Online Client-v2

> 字体加速方案：jsDelivr CDN + 七牛云后备

---

## 当前方案

### 字体加载架构

```
jsDelivr CDN（全球免费 CDN）
├── LXGW WenKai  500 + 700 (正文)  → ~14.5 MB  woff2
├── LXGW WenKai Mono TC 700 (代码) → ~2.0 MB woff2（unicode-range 子集分片）
└── Google Fonts Geist (回退)      → ~30 KB（Next.js 自动子集化）
```

字体 CSS 在 `app/globals.css` 通过 `@import` 从 jsDelivr 加载，`@font-face` 内的 `src: url(...)` 使用相对路径，浏览器会自动解析为 CDN 绝对地址。

`app/layout.tsx` 中添加了 `<link rel="preload">` 预加载核心字重文件。

### 流量所属

| 资源 | 来源 | 服务器带宽消耗 |
|------|------|---------------|
| LXGW WenKai woff2 | jsDelivr CDN | **0** |
| LXGW WenKai Mono TC woff2 | jsDelivr CDN | **0** |
| Geist woff2 | Next.js 自托管 | ~30 KB |
| 页面 HTML/JS/CSS | 服务器 | 正常 |

### 字重说明

- `@fontsource/lxgw-wenkai` 无 400 字重，使用 **500** 作为常规正文字重
- **700** 用于标题/加粗文本
- 代码字体仅加载 **700** 字重

---

## 验证 CDN 生效

### 开发环境

```bash
yarn dev
```

打开 DevTools → Network → 筛选 Font → 确认字体请求 URL 以 `cdn.jsdelivr.net` 开头。

### 生产构建

```bash
yarn build
```

确认 `.next/static/media/` 下**不再有** `lxgw-wenkai` 开头的 `.woff2` 文件。

### 页面验证

1. 打开 DevTools → Elements → 选中正文 `<p>` 标签
2. Computed 面板 → `font-family` 应显示 `"LXGW WenKai", sans-serif`
3. Network 面板 → Font → 确认无 `_next/static/media` 的大体积字体请求

---

## 后备方案：切换到七牛云 CDN

jsDelivr 在国内偶有 DNS 污染或访问缓慢的情况下，可将字体回退到七牛云 CDN。

### 下载字体文件

```bash
# 在服务器上执行
cd /tmp
mkdir lxgw-fonts

# 下载 LXGW WenKai (正文)
wget https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai@5.2.5/files/lxgw-wenkai-latin-500-normal.woff2 -P lxgw-fonts/
wget https://cdn.jsdelivr.net/npm/@fontsource/lxgw-wenkai@5.2.5/files/lxgw-wenkai-latin-700-normal.woff2 -P lxgw-fonts/
```

### 上传到七牛云

1. 登录 [七牛云控制台](https://portal.qiniu.com)
2. 对象存储 → 选择对应 Bucket → 文件管理
3. 上传 `lxgw-fonts/` 下的 `.woff2` 文件到目录 `fonts/`
4. 获取七牛云 CDN 加速域名（如 `https://cdn.your-domain.com`）

### 修改 CSS

将 `app/globals.css` 第 3-4 行的 `@import` 替换为七牛云 `@font-face` 声明：

```css
/* 替换 @import CDN 行为硬编码 @font-face，指向七牛云 */

@font-face {
  font-family: 'LXGW WenKai';
  font-style: normal;
  font-display: swap;
  font-weight: 500;
  src: url('https://cdn.your-domain.com/fonts/lxgw-wenkai-latin-500-normal.woff2') format('woff2');
}
@font-face {
  font-family: 'LXGW WenKai';
  font-style: normal;
  font-display: swap;
  font-weight: 700;
  src: url('https://cdn.your-domain.com/fonts/lxgw-wenkai-latin-700-normal.woff2') format('woff2');
}
```

同样更新 `app/layout.tsx` 中 `<link rel="preload">` 的 `href` 为七牛云地址。

### 构建并部署

```bash
yarn build
bash deploy.sh
```

---

## 简中代码字体方案

### 现状

`@fontsource/lxgw-wenkai-mono` 在 npm 上不存在（仅有 `-tc` 变体）。当前代码字体使用 `LXGW WenKai Mono TC`（繁体变体），该字体完整覆盖简繁字符，对简体中文代码块显示无功能影响。

### 切换到简中 Mono 字体（通过七牛云）

如需使用纯简体中文等宽字体，可基于 `public/fonts/lxgw-wenkai-lite/` 下的 TTF 文件：

**1. 转换为 woff2（需要 Python + fonttools）**

```bash
pip install fonttools brotli

# 转换简中等宽字体
pyftsubset \
  "public/fonts/lxgw-wenkai-lite/LXGWWenKaiMonoLite-Regular.ttf" \
  --output-file="lxgw-wenkai-mono-sc-regular.woff2" \
  --flavor=woff2 \
  --layout-features='*' \
  --unicodes='*'

# 如需极小化子集（仅含博客用到的字符），可指定 --unicodes 或 --text
```

**2. 上传到七牛云** 并记录 CDN 地址。

**3. 在 `globals.css` 中添加 `@font-face`：**

```css
@font-face {
  font-family: 'LXGW WenKai Mono';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url('https://cdn.your-domain.com/fonts/lxgw-wenkai-mono-sc-regular.woff2') format('woff2');
}
```

**4. 修改 `@theme` 中的 `--font-mono`：**

```css
--font-mono: 'LXGW WenKai Mono', 'LXGW WenKai Mono TC', monospace;
```

---

## 可选清理

### 移除未使用的 npm 依赖（不再需要时）

```bash
yarn remove @fontsource/lxgw-wenkai @fontsource/lxgw-wenkai-mono-tc
```

> 保留也无害（约 100 KB 的 JS/CSS 元数据），不影响构建产物体积。

### 移除 public/fonts/ 目录

82.8 MB 的 TTF 文件不再使用，可从仓库中删除：

```bash
git rm -r public/fonts/
```

---

## 故障排查

| 现象 | 原因 | 解决 |
|------|------|------|
| 页面无中文字体，显示宋体 | jsDelivr 被阻断 | 切换至七牛云后备方案 |
| 字体短暂闪烁为 Geist | `font-display: swap` 预期行为 | 首次加载正常，后续由浏览器缓存 |
| 构建报 fonts 相关错误 | `lib/fonts.ts` 引用了已删除的 localFont | 确认文件已按本次变更修改 |
| 开发环境 404 字体 CSS | 本地无 CDN 访问 | 开发时字体从 CDN 获取，需网络连接 |
