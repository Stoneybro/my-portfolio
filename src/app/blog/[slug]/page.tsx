import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post" };

  const baseUrl = "https://stoneybro.dev";
  const ogImage = `${baseUrl}/${post.image}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const source = post.mdxPath
    ? await fs.readFile(
        path.join(process.cwd(), "src", "content", "blog", post.mdxPath),
        "utf8"
      )
    : post.content ?? "";

  return (
    <article className='space-y-6'>
      <div className='space-y-4'>
        <Link
          href='/blog'
          className='text-sm text-neutral-400 hover:text-neutral-200'
        >
          ← All posts
        </Link>
        <h1 className='text-4xl font-semibold tracking-tight text-neutral-100 mt-4'>
          {post.title}
        </h1>
        <div className='flex items-center gap-1 text-sm text-neutral-400'>
          <span className='text-neutral-700'>•</span>
          <span>{post.date}</span>

          <span className='flex flex-wrap gap-1'></span>
        </div>
      </div>

      <div className='prose prose-invert max-w-none'>
        <MDXRemote
          source={source}
          components={{
            a: (props) => (
              // eslint-disable-next-line jsx-a11y/anchor-has-content
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
