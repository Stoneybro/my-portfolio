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
    image: "csm.png",
    excerpt:
      "Smart wallets unlock automation and flexibility onchain. This guide covers ERC-4337 and how to build  smart wallets for any use case.",

    mdxPath: "understanding-custom-smart-wallets.mdx",
  },
  {
    slug: "cryptography-and-smartwallets",
    title: "Cryptography and Smart Wallets",
    date: "Nov 2025",
    excerpt: "A personal deep dive into Elliptic Curve Cryptography (ECC), Diffie-Hellman key exchange, and how they power modern smart wallets.",
    mdxPath: "cryptography-and-smartwallets.mdx",
  },

];
