"use client";

import { useState } from "react";

/**
 * DEV ONLY: Study Hub Smoke Test Page
 * DO NOT USE IN PRODUCTION.
 * This is an unstyled, raw JSON viewer to verify the /api/resources endpoints against real data.
 */
export default function StudyHubTestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState("smoke-test-article");

  async function fetchResources() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/resources");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchResourceBySlug() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/resources/${slug}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 font-mono text-sm max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-red-500">DEV ONLY: Study Hub Smoke Test</h1>
      <p>This page tests the <code className="bg-gray-100 px-1 py-0.5 rounded">/api/resources</code> API.</p>

      <div className="flex gap-4 items-center">
        <button 
          onClick={fetchResources}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Fetch All Resources (GET /api/resources)
        </button>

        <div className="flex gap-2 items-center">
          <input 
            type="text" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            placeholder="slug..."
          />
          <button 
            onClick={fetchResourceBySlug}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Fetch by Slug
          </button>
        </div>
      </div>

      {loading && <div className="text-gray-500">Loading...</div>}
      
      {error && <div className="text-red-500 font-bold border border-red-200 bg-red-50 p-4 rounded">Error: {error}</div>}

      {data && !loading && (
        <div className="mt-4">
          <h2 className="font-bold mb-2">Result:</h2>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-[600px] shadow-inner">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
