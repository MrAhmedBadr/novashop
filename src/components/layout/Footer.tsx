import { Link } from "react-router-dom";
import { useState } from "react";
import { Github, Twitter, Instagram, Facebook, Send } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/catalog";
import { toast } from "@/components/ui/sonner";

const footerCols = [
  {
    heading: "Shop",
    links: categories.slice(0, 5).map((c) => ({ label: c.name, to: `/category/${c.slug}` })),
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Press", to: "/" },
      { label: "Sustainability", to: "/" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", to: "/" },
      { label: "Shipping", to: "/" },
      { label: "Returns", to: "/" },
      { label: "Track Order", to: "/orders" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email.");
    toast.success("Subscribed!", { description: "Welcome to NovaShop insiders." });
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t bg-muted/30">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Premium commerce, reimagined. Curated products, effortless checkout, and a shopping
              experience crafted with obsessive attention to detail.
            </p>
            <form onSubmit={subscribe} className="mt-6 flex max-w-sm gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <Button type="submit" size="icon" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-6 flex gap-2">
              {[Twitter, Instagram, Facebook, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerCols.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-4 text-sm font-semibold">{col.heading}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} NovaShop. Crafted with care.</p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-foreground">Privacy</Link>
            <Link to="/" className="hover:text-foreground">Terms</Link>
            <Link to="/" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
