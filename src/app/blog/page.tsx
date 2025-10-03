import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { posts } from "./posts";



export default function BlogPage() {
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold tracking-tight text-neutral-100'>
          Blog
        </h1>
        <p className='text-neutral-400'>
          Exploring contract architecture, frontend patterns, and Web3
          infrastructure, documenting approaches to building secure and scalable
          decentralized apps.
        </p>
      </header>

      <div className='grid gap-4'>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
          >
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className='flex items-center gap-1'>
                  <span className='text-neutral-700'>•</span>
                  <span>{post.date}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className='text-neutral-300'>
                {post.excerpt}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
