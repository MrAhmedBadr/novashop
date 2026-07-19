import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DollarSign, ShoppingCart, Users, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";
import { StatCard } from "@/features/admin/StatCard";
import { ChartTooltip } from "@/features/admin/ChartTooltip";
import { useChartColors } from "@/features/admin/useChartColors";
import { OrderStatusBadge } from "@/features/orders/orderStatus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  dashboardStats,
  monthlySales,
  categorySales,
  trafficData,
  lowStockProducts,
} from "@/data/admin";
import { useAppSelector } from "@/app/hooks";
import { formatCompact, formatCurrency, cn } from "@/lib/utils";
import { useSeo } from "@/hooks/useSeo";

function ChartCard({
  title,
  subtitle,
  children,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border bg-card p-5 shadow-sm", className)}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="font-display font-semibold">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  useSeo({ title: "Admin Dashboard — NovaShop" });
  const orders = useAppSelector((s) => s.orders.orders);
  const c = useChartColors();

  const totalCatShare = categorySales.reduce((s, x) => s + x.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back — here's how NovaShop is performing.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatCurrency(dashboardStats.revenue)} change={dashboardStats.revenueChange} icon={DollarSign} index={0} />
        <StatCard label="Orders" value={formatCompact(dashboardStats.orders)} change={dashboardStats.ordersChange} icon={ShoppingCart} index={1} />
        <StatCard label="Customers" value={formatCompact(dashboardStats.customers)} change={dashboardStats.customersChange} icon={Users} index={2} />
        <StatCard label="Avg. order value" value={formatCurrency(dashboardStats.aov)} change={dashboardStats.aovChange} icon={TrendingUp} index={3} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue overview" subtitle="Monthly revenue & orders, YTD" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={288}>
            <AreaChart data={monthlySales} margin={{ left: -8, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.primary} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={c.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={c.grid} strokeOpacity={0.6} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: c.axis }} dy={6} />
              <YAxis tickFormatter={(v) => `$${v / 1000}k`} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: c.axis }} width={48} />
              <Tooltip
                cursor={{ stroke: c.primary, strokeOpacity: 0.3, strokeWidth: 1 }}
                content={<ChartTooltip formatValue={(v, n) => (n === "Revenue" ? formatCurrency(v) : formatCompact(v))} />}
              />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke={c.primary} strokeWidth={2.5} fill="url(#revFill)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="orders" name="Orders" stroke={c.brandTo} strokeWidth={2} dot={false} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sales by category" subtitle="Share of revenue">
          <div className="relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categorySales} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={2} stroke="none">
                  {categorySales.map((_, i) => (
                    <Cell key={i} fill={c.categorical[i % c.categorical.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip formatValue={(v) => `${v}%`} />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{totalCatShare}%</span>
              <span className="text-2xs text-muted-foreground">tracked</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {categorySales.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.categorical[i % c.categorical.length] }} />
                <span className="text-muted-foreground">{cat.name}</span>
                <span className="ml-auto font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Weekly traffic" subtitle="Unique visitors">
          <ResponsiveContainer width="100%" height={224}>
            <BarChart data={trafficData} margin={{ left: -16, right: 8 }}>
              <defs>
                <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.brandVia} />
                  <stop offset="100%" stopColor={c.primary} stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={c.grid} strokeOpacity={0.6} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: c.axis }} dy={4} />
              <YAxis tickFormatter={(v) => formatCompact(v)} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: c.axis }} width={40} />
              <Tooltip cursor={{ fill: c.primary, fillOpacity: 0.08 }} content={<ChartTooltip formatValue={(v) => formatCompact(v)} />} />
              <Bar dataKey="visits" name="Visits" fill="url(#barFill)" radius={[8, 8, 0, 0]} maxBarSize={38} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Low stock alerts"
          subtitle="Restock soon"
          action={
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/products">Manage</Link>
            </Button>
          }
        >
          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover ring-hairline" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                </div>
                <Badge variant={p.stock === 0 ? "destructive" : "warning"}>
                  <AlertTriangle className="h-3 w-3" /> {p.stock}
                </Badge>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Recent orders"
          subtitle={`${orders.length} placed this session`}
          action={
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/orders">
                All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          }
        >
          {orders.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No orders yet — place one in the store!</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs font-medium">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.items.length} items</p>
                  </div>
                  <OrderStatusBadge status={o.status} />
                  <span className="text-sm font-semibold">{formatCurrency(o.total)}</span>
                </div>
              ))}
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
