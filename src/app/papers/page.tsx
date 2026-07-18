import Link from "next/link";
import { getDocuments } from "outstatic/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Paper = {
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
};

export default async function PapersPage() {
  const papers = getDocuments("papers", ["title", "slug", "publishedAt", "excerpt"]) as Paper[];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">
          Papers
        </h1>
        <p className="text-neutral-400">
          Research notes, technical write-ups, and deep dives into topics I am actively exploring.
        </p>
      </header>

      <div className="grid gap-4">
        {papers.length === 0 && (
          <p className="text-neutral-500 text-sm">No papers published yet.</p>
        )}
        {papers.map((paper) => (
          <Link key={paper.slug} href={`/papers/${paper.slug}`}>
            <Card>
              <CardHeader>
                <CardTitle>{paper.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <span className="text-neutral-700">•</span>
                  <span>
                    {paper.publishedAt
                      ? new Date(paper.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </CardDescription>
              </CardHeader>
              {paper.excerpt && (
                <CardContent className="text-neutral-300">
                  {paper.excerpt}
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
