import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/services/product.service";
import type { Product } from "@/types";
import { productKeys, useProductBySlug } from "./queries";

export { useProductBySlug };

/** Related products for a given product (same category). */
export function useRelated(product?: Product, limit = 4) {
  return useQuery({
    queryKey: productKeys.related(product?.id ?? ""),
    queryFn: () => productService.related(product!, limit),
    enabled: !!product,
  });
}
