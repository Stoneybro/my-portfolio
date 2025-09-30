"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteNav() {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/works", label: "Work", active: pathname?.startsWith("/works") },
    { href: "/blog", label: "Blog", active: pathname?.startsWith("/blog") },
  ];
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900/80 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-neutral-200">
          stoneybro
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {items.filter((i) => !i.active).map((i) => (
            <Link key={i.href} href={i.href} className="text-neutral-300 hover:text-white">
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
