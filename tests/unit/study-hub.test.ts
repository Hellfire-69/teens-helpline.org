import { describe, it, expect, vi } from "vitest";
import { getResourcesQuerySchema } from "@/features/study-hub/schema";
import * as dataLayer from "@/features/study-hub/data";
import { getResources, getResource } from "@/features/study-hub/service";

vi.mock("@/features/study-hub/data", () => ({
  fetchResources: vi.fn().mockResolvedValue([{ id: "test-1" }]),
  fetchResourceBySlug: vi.fn().mockResolvedValue({ id: "test-slug-id", category_id: "cat-1" }),
  fetchRelatedResources: vi.fn().mockResolvedValue([{ id: "related-1" }])
}));

describe("Study Hub Unit Tests", () => {
  describe("getResourcesQuerySchema", () => {
    it("validates an empty query, supplying defaults", () => {
      const result = getResourcesQuerySchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(10);
      }
    });

    it("accepts all valid content types", () => {
      const types = ["article", "breathing-exercise", "study-hub-tool", "journal"];
      types.forEach((type) => {
        const result = getResourcesQuerySchema.safeParse({ contentType: type });
        expect(result.success).toBe(true);
      });
    });

    it("rejects invalid content types", () => {
      const result = getResourcesQuerySchema.safeParse({ contentType: "peer-support" });
      expect(result.success).toBe(false);
    });

    it("accepts string limits and coerces to number", () => {
      const result = getResourcesQuerySchema.safeParse({ limit: "5" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(5);
      }
    });

    it("accepts valid category and q parameters", () => {
      const result = getResourcesQuerySchema.safeParse({
        category: "academic-stress",
        q: "anxiety",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("Service Layer Logic", () => {
    it("getResources calls fetchResources correctly", async () => {
      const res = await getResources({ limit: 5 });
      expect(res).toBeDefined();
      expect(res.length).toBe(1);
      expect(dataLayer.fetchResources).toHaveBeenCalledWith({ limit: 5 });
    });

    it("getResource calls fetchResourceBySlug and fetchRelatedResources", async () => {
      const res = await getResource("test-slug");
      expect(res).toBeDefined();
      expect(res?.id).toBe("test-slug-id");
      expect(res?.related_resources).toBeDefined();
      expect(dataLayer.fetchResourceBySlug).toHaveBeenCalledWith("test-slug");
      expect(dataLayer.fetchRelatedResources).toHaveBeenCalledWith("cat-1", "test-slug-id", 3);
    });
  });
});
