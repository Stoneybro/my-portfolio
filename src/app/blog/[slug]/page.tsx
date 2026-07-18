import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocuments, getDocumentBySlug } from "outstatic/server";
import { MDXRemote } from "next-mdx-remote/rsc";

type Blog = {
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  content?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getDocumentBySlug("blogs", slug, ["title", "excerpt"]) as Blog | null;
  if (!blog) return { title: "Post" };

  const baseUrl = "https://stoneybro.dev";

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `${baseUrl}/blog/${blog.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const blogs = getDocuments("blogs", ["slug"]);
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getDocumentBySlug("blogs", slug, [
    "title",
    "publishedAt",
    "excerpt",
    "content",
  ]) as Blog | null;

  if (!blog) return notFound();

  return (
    <article className="space-y-6">
      <div className="space-y-4">
        <Link
          href="/blog"
          className="text-sm text-neutral-400 hover:text-neutral-200"
        >
          ← All posts
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-100 mt-4">
          {blog.title}
        </h1>
        <div className="flex items-center gap-1 text-sm text-neutral-400">
          <span className="text-neutral-700">•</span>
          <span>
            {new Date(blog.publishedAt!).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <MDXRemote
          source={blog.content ?? ""}
          components={{
            a: (props) => (
              <a
                {...props}
                className={`underline decoration-neutral-600 hover:decoration-neutral-400 ${
                  props.className ?? ""
                }`}
              />
            ),
            h1: (props) => (
              <h1
                {...props}
                className={`text-4xl font-semibold tracking-tight ${
                  props.className ?? ""
                }`}
              />
            ),
            h2: (props) => (
              <h2
                {...props}
                className={`text-3xl font-semibold tracking-tight mt-8 ${
                  props.className ?? ""
                }`}
              />
            ),
            h3: (props) => (
              <h3
                {...props}
                className={`text-2xl font-semibold tracking-tight mt-6 ${
                  props.className ?? ""
                }`}
              />
            ),
            p: (props) => (
              <p
                {...props}
                className={`text-neutral-300 leading-7 ${
                  props.className ?? ""
                }`}
              />
            ),
            code: (props) => (
              <code
                {...props}
                className={`bg-neutral-900/60 px-1.5 py-0.5 rounded ${
                  props.className ?? ""
                }`}
              />
            ),
            pre: (props) => (
              <pre
                {...props}
                className={`bg-neutral-900/60 p-4 rounded-md overflow-x-auto ${
                  props.className ?? ""
                }`}
              />
            ),
            ul: (props) => (
              <ul
                {...props}
                className={`list-disc pl-6 ${props.className ?? ""}`}
              />
            ),
            ol: (props) => (
              <ol
                {...props}
                className={`list-decimal pl-6 ${props.className ?? ""}`}
              />
            ),
          }}
        />
      </div>
    </article>
  );
}
