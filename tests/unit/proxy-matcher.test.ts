import { describe, it, expect } from "vitest"
import * as fs from "node:fs"
import * as path from "node:path"
import { config } from "@/proxy"

describe("Proxy Matcher Route Coverage", () => {
  it("covers every route folder under app/(main)", () => {
    const mainDir = path.resolve(process.cwd(), "app/(main)")
    const dirents = fs.readdirSync(mainDir, { withFileTypes: true })
    const mainFolders = dirents
      .filter((d) => d.isDirectory())
      .map((d) => d.name)

    expect(mainFolders.length).toBeGreaterThan(0)

    const matchers = Array.isArray(config.matcher) ? config.matcher : [config.matcher]

    for (const folder of mainFolders) {
      const isCovered = matchers.some((m) => {
        // e.g. /dashboard/:path* matches folder 'dashboard'
        return m === `/${folder}/:path*` || m === `/${folder}` || m.startsWith(`/${folder}/`)
      })
      expect(
        isCovered,
        `Expected folder app/(main)/${folder} to be covered by proxy matcher in proxy.ts, but found no matching pattern in ${JSON.stringify(matchers)}`
      ).toBe(true)
    }
  })

  it("covers critical guarded routes /dashboard, /onboarding, and /callback", () => {
    const matchers = Array.isArray(config.matcher) ? config.matcher : [config.matcher]
    expect(matchers).toContain("/dashboard/:path*")
    expect(matchers).toContain("/onboarding/:path*")
    expect(matchers).toContain("/callback")
    expect(matchers).toContain("/api/:path*")
  })
})
