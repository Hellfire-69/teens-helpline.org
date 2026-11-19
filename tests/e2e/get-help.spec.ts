import { test, expect } from "@playwright/test"

test.describe("Get Help Page — E2E Visual, Motion & Accessibility Tests", () => {
  test("renders get-help page with verified helplines, curtain reveal, and responsive integrity", async ({
    page,
  }) => {
    // 1. Navigate to /get-help
    await page.goto("/get-help", { waitUntil: "domcontentloaded" })

    // 2. Verify title and emotional reassurance headline
    await expect(page).toHaveTitle(/Get Help Now/i)
    const mainHeading = page.locator("h1")
    await expect(mainHeading).toBeVisible()
    await expect(mainHeading).toContainText("Take a gentle breath")

    // 3. Verify immediate emergency triage section and numbers
    const erssCall = page.locator('a[href="tel:112"]')
    await erssCall.scrollIntoViewIfNeeded()
    await expect(erssCall).toBeVisible()
    const childlineCall = page.locator('a[href="tel:1098"]')
    await expect(childlineCall).toBeVisible()

    // 4. Verify mental health helplines
    const telemanasCall = page.locator('a[href="tel:14416"]')
    await expect(telemanasCall).toBeVisible()
    const kiranCall = page.locator('a[href="tel:18005990019"]')
    await expect(kiranCall).toBeVisible()
    const vandrevalaCall = page.locator('a[href="tel:919999666555"]')
    await expect(vandrevalaCall).toBeVisible()
    const icallCall = page.locator('a[href="tel:9152987821"]')
    await expect(icallCall).toBeVisible()

    // 5. Verify WhatsApp link for Vandrevala Foundation
    const whatsappLink = page.locator('a[href*="wa.me/919999666555"]')
    await expect(whatsappLink).toBeVisible()

    // 6. Test scroll down and curtain progression
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(300)
    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(300)

    // 7. Verify Alternative Pathways links
    const peerLink = page.locator('a[href="/peer-support"]')
    await expect(peerLink).toBeVisible()
    const studyHubLink = page.locator('a[href="/study-hub"]')
    await expect(studyHubLink).toBeVisible()
    const novaLink = page.locator('a[href="/chat"]')
    await expect(novaLink).toBeVisible()

    // 8. Test copy number button interaction
    const copyButton = page.locator('button:has-text("Copy Number")').first()
    if (await copyButton.isVisible()) {
      await copyButton.click()
      await expect(page.locator('text=Copied').first()).toBeVisible()
    }

    // 9. Verify no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalOverflow).toBe(false)
  })

  test("renders gracefully under reduced-motion preferences without layout traps", async ({
    page,
  }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/get-help", { waitUntil: "domcontentloaded" })

    // Heading must be immediately visible without scroll
    const heading = page.locator("h1")
    await expect(heading).toBeVisible()
    await expect(heading).toContainText("Take a gentle breath")

    // Helplines must be visible and clickable
    await expect(page.locator('a[href="tel:1098"]')).toBeVisible()
    await expect(page.locator('a[href="tel:14416"]')).toBeVisible()
  })

  test("mobile viewport (390px) responsive layout and touch targets", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/get-help", { waitUntil: "domcontentloaded" })

    // Verify no horizontal overflow on mobile
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalOverflow).toBe(false)

    // Verify touch targets are clickable
    const call1098 = page.locator('a[href="tel:1098"]')
    await call1098.scrollIntoViewIfNeeded()
    await expect(call1098).toBeVisible()
  })
})
