import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Page() {
  return (
    <section className="min-h-[calc(100dvh-56px-80px)] flex flex-col justify-center gap-6">
      <div className="inline-flex items-center gap-2 text-sm text-neutral-400">
        <span className="font-mono">stoneybro</span>
        <span className="text-neutral-600">/</span>
        <span>Portfolio</span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-5xl">
        I’m Zion Livingstone, a Solidity and frontend developer focused on building secure, scalable, and user-friendly Web3 applications.
      </h1>
      <p className="text-neutral-300">
        I build at the intersection of smart contract engineering and modern frontend frameworks, applying industry standards, rigorous testing, and solid architecture to deliver reliable and maintainable products.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/blog">Read blog</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/works">Selected works</Link>
        </Button>
      </div>

      {/* Social links */}
      <div className="mt-4 flex items-center gap-5 text-neutral-400 self-end">
        <Link
          href="https://github.com/stoneybro"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithubSquare className="h-6 w-6 hover:text-neutral-200 transition-colors" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/zionlivingstone"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="h-6 w-6 hover:text-neutral-200 transition-colors" />
        </Link>
      </div>
    </section>
  );
}