import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/app/blog/posts";

function slugify(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export default function TopicsPage() {
  const map = new Map<string, number>();
  posts.forEach((p) => p.tags.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)));
  const topics = Array.from(map.entries()).map(([name, count]) => ({ name, count, slug: slugify(name) }));

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">Topics</h1>
        <p className="text-neutral-400">Browse posts by topic.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <Link key={t.slug} href={`/blog/topics/${t.slug}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {t.name}
                  <Badge variant="secondary">{t.count}</Badge>
                </CardTitle>
                <CardDescription>Articles related to {t.name}.</CardDescription>
              </CardHeader>
              <CardContent className="text-neutral-300 text-sm">View posts →</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
