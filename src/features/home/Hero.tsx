import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { products } from "@/data/catalog";
import { staggerContainer, staggerItem, ease } from "@/lib/motion";

const showcase = products.slice(0, 3);

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute -top-1/3 left-1/4 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-from/20 blur-3xl animate-aurora" />
        <div className="absolute -top-1/4 right-1/4 h-[38rem] w-[38rem] translate-x-1/2 rounded-full bg-brand-to/20 blur-3xl animate-aurora [animation-delay:-6s]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(hsl(var(--foreground)/0.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="container-page grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2">
        <motion.div variants={staggerContainer(0.09)} initial="hidden" animate="show">
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New season · Up to 40% off
              <span className="ml-1 flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3" fill="currentColor" />
                ))}
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="mt-6 text-5xl font-extrabold leading-[1.02] md:text-6xl lg:text-7xl"
          >
            Premium tech,
            <br />
            <span className="text-gradient-brand">beautifully curated.</span>
          </motion.h1>

          <motion.p variants={staggerItem} className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Discover a hand-picked collection of audio, wearables, and everyday essentials — designed
            to elevate the way you live and work.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Button asChild size="lg" variant="premium">
                <Link to="/products">
                  Shop the collection <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
            <Button asChild size="lg" variant="outline">
              <Link to="/categories">Explore categories</Link>
            </Button>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-12 grid max-w-md grid-cols-3 gap-4">
            {[
              { icon: Truck, label: "Free shipping", sub: "Over $100" },
              { icon: RotateCcw, label: "30-day returns", sub: "No questions" },
              { icon: ShieldCheck, label: "2-year warranty", sub: "NovaCare" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-start gap-1.5">
                <f.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">{f.label}</span>
                <span className="text-2xs text-muted-foreground">{f.sub}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Product collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: ease.spring }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <Link
              to={`/products/${showcase[0].slug}`}
              className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl bg-muted shadow-xl ring-hairline"
            >
              <img
                src={showcase[0].images[0]}
                alt={showcase[0].name}
                className="aspect-[3/4] h-full w-full object-cover transition-transform duration-[900ms] ease-spring group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <p className="text-2xs uppercase tracking-widest text-white/70">{showcase[0].brand}</p>
                <p className="text-sm font-medium text-white">{showcase[0].name}</p>
              </div>
            </Link>
            {showcase.slice(1).map((p, i) => (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-muted shadow-lg ring-hairline"
                style={{ animationDelay: `${i * 1.5}s` }}
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="aspect-square h-full w-full object-cover transition-transform duration-[900ms] ease-spring group-hover:scale-105"
                />
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: ease.spring }}
            className="absolute -bottom-5 -left-5 hidden rounded-2xl border bg-background/90 p-4 shadow-xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-7 w-7 rounded-full bg-gradient-brand ring-2 ring-background" />
                ))}
              </div>
              <div>
                <p className="text-lg font-bold leading-none">10k+</p>
                <p className="text-2xs text-muted-foreground">Happy customers</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
