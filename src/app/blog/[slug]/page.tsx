import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";
import { Badge } from "@/components/ui/badge";

function slugify(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <Link href="/blog" className="text-sm text-neutral-400 hover:text-neutral-200">
          ← All posts
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-neutral-400">
          <span>{post.date}</span>
          <span className="text-neutral-700">•</span>
          <span className="flex flex-wrap gap-1">
            {post.tags.map((t) => (
              <Link key={t} href={`/blog/topics/${slugify(t)}`}>
                <Badge>{t}</Badge>
              </Link>
            ))}
          </span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        {post.content.split("\n\n").map((para, idx) => (
          <p key={idx} className="text-neutral-300">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
