import { getDocuments } from "outstatic/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Work = {
  title: string;
  slug: string;
  description?: string;
  liveUrl?: string;
  githubUrl?: string;
  content?: string;
};

export default async function WorksPage() {
  const works = getDocuments("works", [
    "title",
    "slug",
    "description",
    "liveUrl",
    "githubUrl",
    "content",
  ]) as Work[];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">
          Selected works
        </h1>
        <p className="text-neutral-400">
          A selection of projects experimenting with Ethereum&apos;s evolving
          standards, Web3 infrastructure, embedded wallets, and account
          abstraction while testing ideas for building scalable Web3
          applications.
        </p>
      </header>

      <div className="grid gap-4">
        {works.map((work) => {
          const features = (work.content ?? "")
            .split("\n")
            .filter((line) => line.startsWith("- "))
            .map((line) => line.replace(/^- /, ""));

          return (
            <Card key={work.slug}>
              <CardHeader>
                <CardTitle>{work.title}</CardTitle>
                <CardDescription>{work.description}</CardDescription>
              </CardHeader>
              {features.length > 0 && (
                <CardContent className="space-y-2 text-neutral-300">
                  <ul className="list-disc space-y-1 pl-5">
                    {features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              )}
              <CardFooter className="flex gap-3">
                {work.liveUrl && (
                  <Button asChild>
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live project
                    </a>
                  </Button>
                )}
                {work.githubUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
