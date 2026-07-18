import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocuments, getDocumentBySlug } from "outstatic/server";
import { MDXRemote } from "next-mdx-remote/rsc";

type Paper = {
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
  const paper = getDocumentBySlug("papers", slug, ["title", "excerpt"]) as Paper | null;
  if (!paper) return { title: "Paper" };

  const baseUrl = "https://stoneybro.dev";

  return {
    title: paper.title,
    description: paper.excerpt,
    openGraph: {
      title: paper.title,
      description: paper.excerpt,
      url: `${baseUrl}/papers/${paper.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: paper.title,
      description: paper.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const papers = getDocuments("papers", ["slug"]);
  return papers.map((p) => ({ slug: p.slug }));
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getDocumentBySlug("papers", slug, [
    "title",
    "publishedAt",
    "excerpt",
    "content",
  ]) as Paper | null;

  if (!paper) return notFound();

  return (
    <article className="space-y-6">
      <div className="space-y-4">
        <Link
          href="/papers"
          className="text-sm text-neutral-400 hover:text-neutral-200"
        >
          ← All papers
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-100 mt-4">
          {paper.title}
        </h1>
        <div className="flex items-center gap-1 text-sm text-neutral-400">
          <span className="text-neutral-700">•</span>
          <span>
            {paper.publishedAt
              ? new Date(paper.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <MDXRemote
          source={paper.content ?? ""}
          components={{
            a: (props) => (
              <a
                {...props}
                className={`underline decoration-neutral-600 hover:decoration-neutral-400 ${
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
