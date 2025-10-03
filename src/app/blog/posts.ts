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
      "Smart wallets are the future of blockchain interaction. Just as MetaMask defined the EOA era, smart wallets will define what comes next. Learn the fundamentals of ERC-4337 and start building custom wallets that enforce rules, automate flows, and adapt to specific use cases.",

    mdxPath: "understanding-custom-smart-wallets.mdx",
  },

];
