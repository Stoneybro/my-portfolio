import Link from "next/link";
import { getDocuments } from "outstatic/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Blog = {
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
};

export default async function BlogPage() {
  const blogs = getDocuments("blogs", ["title", "slug", "publishedAt", "excerpt"]) as Blog[];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">
          Blog
        </h1>
        <p className="text-neutral-400">
          Exploring contract architecture, frontend patterns, and Web3
          infrastructure, documenting approaches to building secure and scalable
          decentralized apps.
        </p>
      </header>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`}>
            <Card>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <span className="text-neutral-700">•</span>
                  <span>
                    {new Date(blog.publishedAt!).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-neutral-300">
                {blog.excerpt}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
