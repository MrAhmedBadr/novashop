import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { loginSchema, type LoginForm } from "@/lib/schemas";
import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { useAppDispatch } from "@/app/hooks";
import { login } from "@/features/auth/authSlice";
import { toast } from "@/components/ui/sonner";
import { useSeo } from "@/hooks/useSeo";

export default function Login() {
  useSeo({ title: "Sign in — NovaShop" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    await new Promise((r) => setTimeout(r, 700));
    dispatch(
      login({
        id: "user_1",
        name: data.email.split("@")[0].replace(/\W/g, " "),
        email: data.email,
        role: "customer",
        createdAt: new Date().toISOString(),
      }),
    );
    toast.success("Welcome back!");
    navigate("/");
  };

  return (
    <div className="container-page grid min-h-[80vh] items-center py-12 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md"
      >
        <Logo />
        <h1 className="mt-8 font-display text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">Sign in to continue to NovaShop.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <FormField label="Email" type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
          <FormField label="Password" type="password" placeholder="••••••••" {...register("password")} error={errors.password?.message} />
          <div className="flex justify-end">
            <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
          </div>
          <Button type="submit" size="lg" variant="premium" className="w-full" loading={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>

      <div className="relative hidden overflow-hidden rounded-3xl lg:block">
        <img src="https://picsum.photos/seed/nova-auth/1000/1200" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        <div className="absolute bottom-0 p-10 text-white">
          <p className="font-display text-2xl font-semibold">Premium commerce, reimagined.</p>
          <p className="mt-2 text-white/80">Join thousands who shop smarter with NovaShop.</p>
        </div>
      </div>
    </div>
  );
}
