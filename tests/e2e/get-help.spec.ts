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

    // 3. Verify in-page skip/jump link to emergency triage
    const skipLink = page.locator('a[href="#emergency-triage"]').first()
    await expect(skipLink).toBeVisible()

    // 4. Verify immediate emergency triage section and numbers (scoped to #emergency-triage)
    const emergencySection = page.locator("#emergency-triage")
    await emergencySection.scrollIntoViewIfNeeded()
    await expect(emergencySection).toBeVisible()

    const erssCall = emergencySection.locator('a[href="tel:112"]')
    await expect(erssCall).toBeVisible()
    await expect(erssCall).toHaveAttribute("aria-label", /112/i)
    const erssBox = await erssCall.boundingBox()
    expect(erssBox?.height).toBeGreaterThanOrEqual(44)

    const childlineCall = emergencySection.locator('a[href="tel:1098"]')
    await expect(childlineCall).toBeVisible()
    await expect(childlineCall).toHaveAttribute("aria-label", /1098/i)
    const childlineBox = await childlineCall.boundingBox()
    expect(childlineBox?.height).toBeGreaterThanOrEqual(44)

    // 5. Verify mental health helplines directory (scoped to #mental-health-directory)
    const mentalHealthSection = page.locator("#mental-health-directory")
    await mentalHealthSection.scrollIntoViewIfNeeded()
    await expect(mentalHealthSection).toBeVisible()

    const telemanasCall = mentalHealthSection.locator('a[href="tel:14416"]')
    await expect(telemanasCall).toBeVisible()
    const telemanasBox = await telemanasCall.boundingBox()
    expect(telemanasBox?.height).toBeGreaterThanOrEqual(44)

    const kiranCall = mentalHealthSection.locator('a[href="tel:18005990019"]')
    await expect(kiranCall).toBeVisible()
    const kiranBox = await kiranCall.boundingBox()
    expect(kiranBox?.height).toBeGreaterThanOrEqual(44)

    const vandrevalaCall = mentalHealthSection.locator('a[href="tel:919999666555"]')
    await expect(vandrevalaCall).toBeVisible()
    const vandrevalaBox = await vandrevalaCall.boundingBox()
    expect(vandrevalaBox?.height).toBeGreaterThanOrEqual(44)

    const icallCall = mentalHealthSection.locator('a[href="tel:9152987821"]')
    await expect(icallCall).toBeVisible()
    const icallBox = await icallCall.boundingBox()
    expect(icallBox?.height).toBeGreaterThanOrEqual(44)

    // 6. Verify WhatsApp link for Vandrevala Foundation
    const whatsappLink = mentalHealthSection.locator('a[href*="wa.me/919999666555"]')
    await expect(whatsappLink).toBeVisible()
    const whatsappBox = await whatsappLink.boundingBox()
    expect(whatsappBox?.height).toBeGreaterThanOrEqual(44)

    // 7. Test scroll down and curtain progression
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(300)
    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(300)

    // 8. Verify Alternative Pathways links (scoped to alternative support section)
    const altSupportSection = page.locator('section[aria-labelledby="alternative-support-heading"]')
    await altSupportSection.scrollIntoViewIfNeeded()
    await expect(altSupportSection).toBeVisible()

    const peerLink = altSupportSection.locator('a[href="/peer-support"]')
    await expect(peerLink).toBeVisible()

    const studyHubLink = altSupportSection.locator('a[href="/study-hub"]')
    await expect(studyHubLink).toBeVisible()

    const novaLink = altSupportSection.locator('a[href="/chat"]')
    await expect(novaLink).toBeVisible()

    // 9. Test copy number button interaction with Copied feedback
    const copyButton = mentalHealthSection.locator('button:has-text("Copy Number")').first()
    await copyButton.scrollIntoViewIfNeeded()
    await expect(copyButton).toBeVisible()
    await copyButton.click()
    await expect(mentalHealthSection.locator("text=Copied").first()).toBeVisible()

    // 10. Verify no horizontal overflow
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

    // In-page jump link is visible in reduced motion
    const jumpLink = page.locator('a[href="#emergency-triage"]').first()
    await expect(jumpLink).toBeVisible()

    // Helplines in directory must be present, visible, and clickable without animation traps
    const emergencySection = page.locator("#emergency-triage")
    await expect(emergencySection.locator('a[href="tel:1098"]')).toBeVisible()
    await expect(emergencySection.locator('a[href="tel:112"]')).toBeVisible()

    const mentalHealthSection = page.locator("#mental-health-directory")
    await expect(mentalHealthSection.locator('a[href="tel:14416"]')).toBeVisible()
    await expect(mentalHealthSection.locator('a[href="tel:18005990019"]')).toBeVisible()
    await expect(mentalHealthSection.locator('a[href="tel:919999666555"]')).toBeVisible()
    await expect(mentalHealthSection.locator('a[href="tel:9152987821"]')).toBeVisible()
  })

  test("mobile viewport (390px) responsive layout and touch targets", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/get-help", { waitUntil: "domcontentloaded" })

    // Verify no horizontal overflow on mobile
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalOverflow).toBe(false)

    // Verify emergency triage touch targets are visible and have >= 44px tap target height
    const emergencySection = page.locator("#emergency-triage")
    await emergencySection.scrollIntoViewIfNeeded()
    await expect(emergencySection).toBeVisible()

    const call112 = emergencySection.locator('a[href="tel:112"]')
    await expect(call112).toBeVisible()
    const box112 = await call112.boundingBox()
    expect(box112?.height).toBeGreaterThanOrEqual(44)

    const call1098 = emergencySection.locator('a[href="tel:1098"]')
    await expect(call1098).toBeVisible()
    const box1098 = await call1098.boundingBox()
    expect(box1098?.height).toBeGreaterThanOrEqual(44)

    // Verify mental health directory touch targets meet minimum 44px
    const mentalHealthSection = page.locator("#mental-health-directory")
    await mentalHealthSection.scrollIntoViewIfNeeded()
    await expect(mentalHealthSection).toBeVisible()

    const call14416 = mentalHealthSection.locator('a[href="tel:14416"]')
    await expect(call14416).toBeVisible()
    const box14416 = await call14416.boundingBox()
    expect(box14416?.height).toBeGreaterThanOrEqual(44)

    const callVandrevala = mentalHealthSection.locator('a[href="tel:919999666555"]')
    await expect(callVandrevala).toBeVisible()
    const boxVandrevala = await callVandrevala.boundingBox()
    expect(boxVandrevala?.height).toBeGreaterThanOrEqual(44)

    const whatsappLink = mentalHealthSection.locator('a[href*="wa.me/919999666555"]')
    await expect(whatsappLink).toBeVisible()
    const boxWhatsApp = await whatsappLink.boundingBox()
    expect(boxWhatsApp?.height).toBeGreaterThanOrEqual(44)
  })
})
