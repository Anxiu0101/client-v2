import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: '',
        pathname: "/Anxiu0101/PicgoImg/master/**",
        search: '',
      }
    ]
  }
};

export default nextConfig;


// import type { NextConfig } from "next";
// import createMDX from '@next/mdx';
//
// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
// };
//
// // const withMDX = createMDX({
// //   options: {
// //     remarkPlugins: [], // 物理逻辑插件，如 remark-gfm
// //     rehypePlugins: [], // 渲染逻辑插件，如 rehype-highlight
// //   }
// // });
//
// export default withMDX(nextConfig);
