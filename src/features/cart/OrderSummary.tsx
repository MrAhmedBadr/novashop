import { useAppSelector } from "@/app/hooks";
import { selectCartSummary } from "@/features/cart/cartSelectors";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export function OrderSummary({ children }: { children?: React.ReactNode }) {
  const summary = useAppSelector(selectCartSummary);

  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="font-display text-lg font-semibold">Order summary</h2>
      <div className="mt-4 space-y-2.5 text-sm">
        <Row label="Subtotal" value={formatCurrency(summary.subtotal)} />
        {summary.discount > 0 && (
          <Row label="Discount" value={`-${formatCurrency(summary.discount)}`} accent="success" />
        )}
        <Row label="Shipping" value={summary.shipping === 0 ? "Free" : formatCurrency(summary.shipping)} />
        <Row label="Tax (est.)" value={formatCurrency(summary.tax)} />
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <span className="font-semibold">Total</span>
        <span className="font-display text-xl font-bold">{formatCurrency(summary.total)}</span>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: "success" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent === "success" ? "font-medium text-success" : "font-medium"}>{value}</span>
    </div>
  );
}
