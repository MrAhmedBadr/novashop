import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { RootLayout } from "@/components/layout/RootLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PageLoader } from "@/components/shared/PageLoader";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { PageTransition } from "@/components/shared/PageTransition";
import ErrorPage from "@/pages/ErrorPage";

// Code-split every route for lean initial load.
const Home = lazy(() => import("@/pages/Home"));
const Catalog = lazy(() => import("@/pages/Catalog"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Categories = lazy(() => import("@/pages/Categories"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrderSuccess = lazy(() => import("@/pages/OrderSuccess"));
const Orders = lazy(() => import("@/pages/Orders"));
const Profile = lazy(() => import("@/pages/Profile"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/Products"));
const AdminCategories = lazy(() => import("@/pages/admin/Categories"));
const AdminOrders = lazy(() => import("@/pages/admin/Orders"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));

function SuspenseOutlet() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

const routes = [
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <SuspenseOutlet />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/products", element: <Catalog /> },
          { path: "/products/:slug", element: <ProductDetails /> },
          { path: "/categories", element: <Categories /> },
          { path: "/category/:slug", element: <Catalog /> },
          { path: "/search", element: <Catalog /> },
          { path: "/wishlist", element: <Wishlist /> },
          { path: "/cart", element: <Cart /> },
          { path: "/checkout", element: <Checkout /> },
          { path: "/checkout/success", element: <OrderSuccess /> },
          { path: "/orders", element: <Orders /> },
          { path: "/profile", element: <Profile /> },
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        element: <SuspenseOutlet />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "products", element: <AdminProducts /> },
          { path: "categories", element: <AdminCategories /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "users", element: <AdminUsers /> },
        ],
      },
    ],
  },
];

// Vite's BASE_URL is "/" in dev and "/novashop/" on GitHub Pages. Without this
// the deployed app never matches "/" and every visit falls through to NotFound.
export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
});
