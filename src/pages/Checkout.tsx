import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, Truck, Zap, ShoppingBag } from "lucide-react";
import { checkoutSchema, type CheckoutForm } from "@/lib/schemas";
import { FormField } from "@/components/shared/FormField";
import { OrderSummary } from "@/features/cart/OrderSummary";
import { CouponInput } from "@/features/cart/CouponInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/EmptyState";
import { useCart } from "@/hooks/useCart";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCartSummary, selectCoupon } from "@/features/cart/cartSelectors";
import { placeOrder } from "@/features/orders/ordersSlice";
import { clearCart } from "@/features/cart/cartSlice";
import { addAddress } from "@/features/auth/authSlice";
import type { Order } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";
import { toast } from "@/components/ui/sonner";

const genId = (p: string) => `${p}_${Math.random().toString(36).slice(2, 9)}`;

export default function Checkout() {
  useSeo({ title: "Checkout — NovaShop" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useCart();
  const summary = useAppSelector(selectCartSummary);
  const coupon = useAppSelector(selectCoupon);
  const user = useAppSelector((s) => s.auth.user);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      country: "United States",
      shippingMethod: "standard",
    },
  });

  const shippingMethod = watch("shippingMethod");

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to check out"
          description="Add items to your cart before checking out."
          action={
            <Button asChild>
              <Link to="/products">Browse products</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const onSubmit = async (data: CheckoutForm) => {
    setSubmitting(true);
    // Simulated Stripe test payment.
    await new Promise((r) => setTimeout(r, 1400));

    const address = {
      id: genId("addr"),
      label: "Shipping",
      fullName: data.fullName,
      line1: data.line1,
      line2: data.line2,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
      phone: data.phone,
      isDefault: true,
    };

    if (data.saveAddress && user) dispatch(addAddress(address));

    const expressFee = data.shippingMethod === "express" ? 14.9 : 0;
    const order: Order = {
      id: genId("NOVA").toUpperCase(),
      items,
      subtotal: summary.subtotal,
      discount: summary.discount,
      shipping: summary.shipping + expressFee,
      tax: summary.tax,
      total: summary.total + expressFee,
      status: "processing",
      couponCode: coupon?.code,
      address,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() + (data.shippingMethod === "express" ? 2 : 5) * 86_400_000,
      ).toISOString(),
    };

    dispatch(placeOrder(order));
    dispatch(clearCart());
    setSubmitting(false);
    toast.success("Payment successful!", { description: `Order ${order.id} confirmed.` });
    navigate("/checkout/success", { state: { orderId: order.id } });
  };

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Checkout</h1>
      <p className="mt-1 text-muted-foreground">Complete your order securely.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* Contact */}
          <section className="rounded-2xl border p-6">
            <h2 className="mb-4 font-display text-lg font-semibold">Contact</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Full name" {...register("fullName")} error={errors.fullName?.message} />
              <FormField label="Email" type="email" {...register("email")} error={errors.email?.message} />
              <FormField
                label="Phone"
                {...register("phone")}
                error={errors.phone?.message}
                containerClassName="sm:col-span-2"
              />
            </div>
          </section>

          {/* Shipping address */}
          <section className="rounded-2xl border p-6">
            <h2 className="mb-4 font-display text-lg font-semibold">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Street address"
                {...register("line1")}
                error={errors.line1?.message}
                containerClassName="sm:col-span-2"
              />
              <FormField
                label="Apartment, suite (optional)"
                {...register("line2")}
                containerClassName="sm:col-span-2"
              />
              <FormField label="City" {...register("city")} error={errors.city?.message} />
              <FormField label="State / Region" {...register("state")} error={errors.state?.message} />
              <FormField label="Postal code" {...register("postalCode")} error={errors.postalCode?.message} />
              <FormField label="Country" {...register("country")} error={errors.country?.message} />
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("saveAddress")} className="h-4 w-4 rounded border-input" />
              Save this address for next time
            </label>
          </section>

          {/* Shipping method */}
          <section className="rounded-2xl border p-6">
            <h2 className="mb-4 font-display text-lg font-semibold">Delivery method</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "standard", icon: Truck, title: "Standard", sub: "5 business days", price: summary.shipping === 0 ? "Free" : formatCurrency(summary.shipping) },
                { value: "express", icon: Zap, title: "Express", sub: "1–2 business days", price: formatCurrency(14.9) },
              ].map((m) => (
                <label
                  key={m.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all",
                    shippingMethod === m.value ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50",
                  )}
                >
                  <input
                    type="radio"
                    value={m.value}
                    {...register("shippingMethod")}
                    className="sr-only"
                  />
                  <m.icon className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.sub}</p>
                  </div>
                  <span className="text-sm font-semibold">{m.price}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Payment</h2>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Secured by Stripe (test mode)
              </span>
            </div>
            <div className="grid gap-4">
              <FormField label="Name on card" {...register("cardName")} error={errors.cardName?.message} />
              <div className="space-y-1.5">
                <Label htmlFor="cardNumber">Card number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    {...register("cardNumber")}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
                      setValue("cardNumber", v);
                    }}
                    className={cn(
                      "flex h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      errors.cardNumber && "border-destructive",
                    )}
                  />
                </div>
                {errors.cardNumber && <p className="text-xs text-destructive">{errors.cardNumber.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Expiry (MM / YY)" placeholder="12 / 28" {...register("expiry")} error={errors.expiry?.message} />
                <FormField label="CVC" placeholder="123" {...register("cvc")} error={errors.cvc?.message} />
              </div>
              <p className="text-xs text-muted-foreground">
                Use test card <strong>4242 4242 4242 4242</strong>, any future date and CVC.
              </p>
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <CouponInput />
          <OrderSummary>
            <Button type="submit" size="lg" variant="premium" className="w-full" loading={submitting}>
              {submitting ? "Processing payment…" : `Pay ${formatCurrency(summary.total + (shippingMethod === "express" ? 14.9 : 0))}`}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> Encrypted & secure checkout
            </p>
          </OrderSummary>
        </div>
      </form>
    </div>
  );
}
