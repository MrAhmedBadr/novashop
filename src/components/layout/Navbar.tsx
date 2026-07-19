import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, LogOut, Package, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MegaMenu } from "./MegaMenu";
import { SearchDialog } from "./SearchDialog";
import { primaryLinks } from "./navConfig";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCartCount } from "@/features/cart/cartSelectors";
import { useWishlist } from "@/hooks/useWishlist";
import { setCartDrawer } from "@/features/cart/cartSlice";
import { logout } from "@/features/auth/authSlice";

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartCount = useAppSelector(selectCartCount);
  const user = useAppSelector((s) => s.auth.user);
  const { count: wishCount } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Announcement */}
      <div className="relative overflow-hidden bg-foreground text-background">
        <div className="container-page flex h-9 items-center justify-center gap-2 text-center text-xs font-medium">
          <span className="hidden h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-brand sm:block" />
          <span className="line-clamp-1">
            Free shipping on orders over $100 — use code{" "}
            <span className="font-semibold text-background underline decoration-dotted underline-offset-2">NOVA10</span>{" "}
            for 10% off
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          scrolled ? "glass border-border shadow-sm" : "border-transparent bg-background",
        )}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-4">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="border-b px-6 py-5 text-left">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 p-4">
                  {primaryLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                          isActive && "bg-accent text-primary",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <div className="my-2 h-px bg-border" />
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                    Wishlist
                  </Link>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                    Orders
                  </Link>
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                    Admin Dashboard
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            <Logo />
          </div>

          {/* Center: primary nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map((link) => (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => setHovered(link.mega ?? null)}
                onMouseLeave={() => setHovered(null)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "group/nav relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:text-foreground",
                      isActive ? "text-foreground" : "text-foreground/65",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={cn(
                          "absolute inset-x-3.5 -bottom-px h-px origin-left bg-gradient-brand transition-transform duration-300 ease-spring",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                        )}
                      />
                    </>
                  )}
                </NavLink>
                <AnimatePresence>
                  {link.mega && hovered === link.mega && <MegaMenu onNavigate={() => setHovered(null)} />}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-0.5">
            {/* Desktop search pill */}
            <button
              onClick={() => setSearchOpen(true)}
              className="mr-1 hidden items-center gap-2 rounded-full border bg-muted/40 py-1.5 pl-3 pr-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted xl:flex"
              aria-label="Search products"
            >
              <Search className="h-4 w-4" />
              <span className="pr-6">Search…</span>
              <kbd className="rounded-md border bg-background px-1.5 py-0.5 text-2xs font-medium text-muted-foreground shadow-sm">
                ⌘K
              </kbd>
            </button>
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen(true)} className="xl:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex" asChild aria-label="Wishlist">
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                <CountBadge count={wishCount} />
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account">
                  {user ? (
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <DropdownMenuLabel className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/orders")}>
                      <Package /> Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <LayoutDashboard /> Admin
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => dispatch(logout())}>
                      <LogOut /> Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate("/login")}>
                      <User /> Sign in
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/register")}>Create account</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <LayoutDashboard /> Admin
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Cart"
              onClick={() => dispatch(setCartDrawer(true))}
            >
              <ShoppingBag className="h-5 w-5" />
              <CountBadge count={cartCount} />
            </Button>
          </div>
        </nav>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
