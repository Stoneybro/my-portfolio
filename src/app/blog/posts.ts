export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  content?: string;
  mdxPath?: string;
};
export const posts: Post[] = [
  {
    slug: "understanding-custom-smart-wallets",
    title: "Understanding Custom Smart Wallets",
    date: "Sep 2025",
    image:"csm.png",
    excerpt:
      "Smart wallets unlock automation and flexibility onchain. This guide covers ERC-4337 and how to build  smart wallets for any use case.",

    mdxPath: "understanding-custom-smart-wallets.mdx",
  },

];
