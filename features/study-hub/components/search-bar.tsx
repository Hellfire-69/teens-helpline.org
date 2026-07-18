"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/study-hub?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/study-hub`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full max-w-md items-center gap-space-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlass size={20} className="text-ink-300" weight="duotone" />
        </div>
        <Input
          type="text"
          placeholder="Search articles and tools..."
          aria-label="Search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" variant="secondary" size="md">
        Search
      </Button>
    </form>
  );
}
