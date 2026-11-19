import { describe, it, expect } from "vitest"
import { VERIFIED_HELPLINES } from "@/features/marketing/components/HelplineDirectory"

describe("Get Help Page — Verified Helpline Directory Data Integrity", () => {
  it("contains all 6 required official Indian emergency & mental health services", () => {
    const ids = VERIFIED_HELPLINES.map((h) => h.id)
    expect(ids).toContain("erss-112")
    expect(ids).toContain("childline-1098")
    expect(ids).toContain("telemanas-14416")
    expect(ids).toContain("kiran-18005990019")
    expect(ids).toContain("vandrevala-foundation")
    expect(ids).toContain("icall-tiss")
  })

  it("verifies every entry has dialable raw numbers with only digits", () => {
    VERIFIED_HELPLINES.forEach((helpline) => {
      expect(helpline.rawNumber).toMatch(/^[0-9]+$/)
      expect(helpline.rawNumber.length).toBeGreaterThanOrEqual(3)
    })
  })

  it("verifies all source URLs use secure HTTPS protocol from official authorities", () => {
    VERIFIED_HELPLINES.forEach((helpline) => {
      expect(helpline.officialUrl).toMatch(/^https:\/\//)
      expect(helpline.authority).toBeTruthy()
    })
  })

  it("accurately classifies 24/7 toll-free emergency numbers vs timed or standard carrier lines", () => {
    const erss = VERIFIED_HELPLINES.find((h) => h.id === "erss-112")
    const childline = VERIFIED_HELPLINES.find((h) => h.id === "childline-1098")
    const telemanas = VERIFIED_HELPLINES.find((h) => h.id === "telemanas-14416")
    const kiran = VERIFIED_HELPLINES.find((h) => h.id === "kiran-18005990019")
    const icall = VERIFIED_HELPLINES.find((h) => h.id === "icall-tiss")
    const vandrevala = VERIFIED_HELPLINES.find((h) => h.id === "vandrevala-foundation")

    expect(erss).toBeDefined()
    expect(childline).toBeDefined()
    expect(telemanas).toBeDefined()
    expect(kiran).toBeDefined()
    expect(icall).toBeDefined()
    expect(vandrevala).toBeDefined()

    // Toll-Free verified services
    expect(erss?.isTollFree).toBe(true)
    expect(erss?.is24x7).toBe(true)

    expect(childline?.isTollFree).toBe(true)
    expect(childline?.is24x7).toBe(true)

    expect(telemanas?.isTollFree).toBe(true)
    expect(telemanas?.is24x7).toBe(true)

    expect(kiran?.isTollFree).toBe(true)
    expect(kiran?.is24x7).toBe(true)

    // iCALL is free counselling, but uses standard carrier airtime charges and has timed hours
    expect(icall?.isTollFree).toBe(false)
    expect(icall?.is24x7).toBe(false)
    expect(icall?.availability).toContain("Mon-Sat, 10am-8pm")

    // Vandrevala Foundation has dedicated WhatsApp integration
    expect(vandrevala?.hasWhatsApp).toBe(true)
    expect(vandrevala?.whatsAppLink).toContain("wa.me/919999666555")
  })
})
