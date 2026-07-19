import { useState } from "react";
import { Tag, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { applyCoupon, removeCoupon } from "@/features/cart/cartSlice";
import { selectCoupon, selectSubtotal } from "@/features/cart/cartSelectors";
import { marketingService } from "@/lib/services/product.service";
import { toast } from "@/components/ui/sonner";

export function CouponInput() {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(selectCoupon);
  const subtotal = useAppSelector(selectSubtotal);
  const [code, setCode] = useState("");

  const apply = () => {
    const result = marketingService.validateCoupon(code.trim(), subtotal);
    if (!result.ok) return toast.error(result.error);
    dispatch(applyCoupon(result.coupon));
    toast.success("Coupon applied", { description: result.coupon.description });
    setCode("");
  };

  if (coupon) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-success/30 bg-success/10 px-3 py-2.5">
        <div className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-success" />
          <span className="font-medium">{coupon.code}</span>
          <span className="text-muted-foreground">— {coupon.description}</span>
        </div>
        <button onClick={() => dispatch(removeCoupon())} aria-label="Remove coupon" className="text-muted-foreground hover:text-destructive">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          placeholder="Coupon code"
          className="pl-9"
        />
      </div>
      <Button variant="outline" onClick={apply} disabled={!code.trim()}>
        Apply
      </Button>
    </div>
  );
}
