export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
};

export const posts: Post[] = [
  {
    slug: "fetching-managing-blockchain-data-nextjs",
    title: "Fetching and Managing Blockchain Data in Next.js",
    date: "Sep 2025",
    excerpt:
      "Fetching data from the blockchain isn’t like calling a normal API. RPC calls are costly, indexers can lag, and on-chain types need normalization before they’re usable in a Next.js app. This post explores strategies for managing blockchain data effectively in Next.js, from choosing the right data source to caching, serialization, and client-side state.",
    tags: ["Nextjs", "Viem"],
    content:
      "Account abstraction introduces new surfaces in validation and paymaster logic.\n\nThis post walks through designing handlers that minimize attack windows, adopting replay protection, and creating safe defaults for sponsor policies.\n\nKey ideas include separating validation and execution paths, rate limiting at the paymaster, and audit-friendly invariants.",
  },

];
