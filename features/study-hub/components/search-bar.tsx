"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";

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
    <form onSubmit={handleSubmit} className="relative flex w-full max-w-md items-center group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-400 group-focus-within:text-aurora-sea transition-colors">
        <MagnifyingGlass weight="bold" className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Search articles and tools..."
        aria-label="Search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-radius-full py-3 pl-12 pr-4 text-type-body-md text-ink-900 dark:text-white placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-aurora-sea/50 focus:bg-white dark:focus:bg-night-950 transition-all shadow-sm"
      />
    </form>
  );
}
