import type { User } from "@/types";
import { products } from "./catalog";

export interface AdminUser extends User {
  orders: number;
  spent: number;
  status: "active" | "invited" | "blocked";
}

const people: Array<{ name: string; role: User["role"]; status: AdminUser["status"] }> = [
  { name: "Islam Osama", role: "admin", status: "active" },
  { name: "Priya Nair", role: "admin", status: "active" },
  { name: "Alex Morgan", role: "customer", status: "active" },
  { name: "Diego Santos", role: "customer", status: "active" },
  { name: "Mei Chen", role: "customer", status: "active" },
  { name: "Jonas Weber", role: "customer", status: "active" },
  { name: "Sara Ali", role: "customer", status: "invited" },
  { name: "Tom Becker", role: "customer", status: "active" },
  { name: "Yuki Tanaka", role: "customer", status: "active" },
  { name: "Emma Wilson", role: "customer", status: "active" },
  { name: "Liam Murphy", role: "customer", status: "blocked" },
  { name: "Nina Patel", role: "customer", status: "active" },
  { name: "Omar Haddad", role: "customer", status: "invited" },
  { name: "Chloe Dubois", role: "customer", status: "active" },
];

function seeded(n: number) {
  const x = Math.sin(n * 411) * 10000;
  return x - Math.floor(x);
}

export const adminUsers: AdminUser[] = people.map((person, i) => {
  // Blocked/invited accounts have little or no order history.
  const orders = person.status === "active" ? Math.floor(seeded(i + 1) * 34) : Math.floor(seeded(i + 1) * 3);
  const avgOrder = 120 + Math.floor(seeded(i + 2) * 160);
  const spent = orders === 0 ? 0 : orders * avgOrder + Math.floor(seeded(i + 3) * 90);
  return {
    id: `u${i + 1}`,
    name: person.name,
    email: `${person.name.toLowerCase().replace(/\s/g, ".")}@example.com`,
    role: person.role,
    createdAt: new Date(2025, i % 12, (i % 27) + 1).toISOString(),
    orders,
    spent,
    status: person.status,
  };
});

// Year-to-date monthly performance (2026). dashboardStats below sum these.
export const monthlySales = [
  { month: "Jan", revenue: 412000, orders: 3020 },
  { month: "Feb", revenue: 438500, orders: 3180 },
  { month: "Mar", revenue: 471200, orders: 3402 },
  { month: "Apr", revenue: 455900, orders: 3288 },
  { month: "May", revenue: 512800, orders: 3690 },
  { month: "Jun", revenue: 548300, orders: 3905 },
  { month: "Jul", revenue: 589200, orders: 4160 },
];

export const categorySales = [
  { name: "Audio", value: 26 },
  { name: "Computing", value: 22 },
  { name: "Mobile", value: 16 },
  { name: "Wearables", value: 14 },
  { name: "Photography", value: 10 },
  { name: "Gaming", value: 8 },
  { name: "Home", value: 4 },
];

export const trafficData = [
  { day: "Mon", visits: 12400 },
  { day: "Tue", visits: 15820 },
  { day: "Wed", visits: 13940 },
  { day: "Thu", visits: 17280 },
  { day: "Fri", visits: 21160 },
  { day: "Sat", visits: 24530 },
  { day: "Sun", visits: 19870 },
];

export const lowStockProducts = products
  .filter((p) => p.stock <= 8)
  .sort((a, b) => a.stock - b.stock)
  .slice(0, 6);

// Totals derived from monthlySales for internal consistency.
const ytdRevenue = monthlySales.reduce((sum, m) => sum + m.revenue, 0); // 3,427,900
const ytdOrders = monthlySales.reduce((sum, m) => sum + m.orders, 0); // 24,645

export const dashboardStats = {
  revenue: ytdRevenue,
  revenueChange: 12.4,
  orders: ytdOrders,
  ordersChange: 8.1,
  customers: 8420,
  customersChange: 5.3,
  aov: Math.round(ytdRevenue / ytdOrders),
  aovChange: 3.9,
};
