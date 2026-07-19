import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { registerSchema, type RegisterForm } from "@/lib/schemas";
import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { useAppDispatch } from "@/app/hooks";
import { login } from "@/features/auth/authSlice";
import { toast } from "@/components/ui/sonner";
import { useSeo } from "@/hooks/useSeo";

const perks = ["Free 2-day shipping", "Early access to drops", "Exclusive member pricing", "1-click reorders"];

export default function Register() {
  useSeo({ title: "Create account — NovaShop" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    await new Promise((r) => setTimeout(r, 800));
    dispatch(
      login({
        id: "user_1",
        name: data.name,
        email: data.email,
        role: "customer",
        createdAt: new Date().toISOString(),
      }),
    );
    toast.success("Account created!", { description: "Welcome to NovaShop." });
    navigate("/");
  };

  return (
    <div className="container-page grid min-h-[80vh] items-center py-12 lg:grid-cols-2 lg:gap-16">
      <div className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-fuchsia-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo className="[&_span:last-child]:text-white" />
        <div>
          <p className="font-display text-3xl font-bold leading-tight">Join NovaShop+ today</p>
          <ul className="mt-6 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-white/90">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-white/70">Already trusted by 10,000+ shoppers.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md"
      >
        <div className="lg:hidden">
          <Logo />
        </div>
        <h1 className="mt-8 font-display text-3xl font-bold tracking-tight lg:mt-0">Create your account</h1>
        <p className="mt-2 text-muted-foreground">Start shopping in seconds.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <FormField label="Full name" placeholder="Jane Doe" {...register("name")} error={errors.name?.message} />
          <FormField label="Email" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
          <FormField label="Password" type="password" placeholder="••••••••" {...register("password")} error={errors.password?.message} />
          <FormField label="Confirm password" type="password" placeholder="••••••••" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
          <Button type="submit" size="lg" variant="premium" className="w-full" loading={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
