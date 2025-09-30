import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { posts } from "./posts";

function slugify(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">Blog</h1>
        <p className="text-neutral-400">Exploring contract architecture, frontend patterns, and Web3 infrastructure, documenting approaches to building secure and scalable decentralized apps.</p>
      </header>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center gap-3">
                <span>{post.date}</span>
                <span className="text-neutral-700">•</span>
                <span className="flex flex-wrap gap-1">
                  {post.tags.map((tag,index) => (

                      <Badge key={index}>{tag}</Badge>

                  ))}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-neutral-300">{post.excerpt}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
