import { useState } from "react";
import { Link } from "react-router-dom";
import { User, MapPin, Plus, Trash2, Star, LogOut } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, type AddressForm } from "@/lib/schemas";
import { FormField } from "@/components/shared/FormField";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  addAddress,
  logout,
  removeAddress,
  setDefaultAddress,
  updateProfile,
} from "@/features/auth/authSlice";
import type { Address } from "@/types";
import { toast } from "@/components/ui/sonner";
import { useSeo } from "@/hooks/useSeo";

export default function Profile() {
  useSeo({ title: "Profile — NovaShop" });
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const addresses = useAppSelector((s) => s.auth.addresses);
  const [name, setName] = useState(user?.name ?? "");

  if (!user) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={User}
          title="You’re not signed in"
          description="Sign in to view your profile, addresses, and orders."
          action={
            <Button asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">
            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="ghost" className="ml-auto" onClick={() => dispatch(logout())}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-1.5 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="addresses">
            <MapPin className="mr-1.5 h-4 w-4" /> Addresses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="max-w-lg pt-6">
          <div className="space-y-4 rounded-2xl border p-6">
            <FormField label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <FormField label="Email" value={user.email} disabled />
            <Button
              onClick={() => {
                dispatch(updateProfile({ name }));
                toast.success("Profile updated");
              }}
            >
              Save changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Saved addresses</h2>
            <AddressSheet
              onSave={(a) => {
                dispatch(addAddress({ ...a, id: `addr_${Math.random().toString(36).slice(2, 9)}`, label: "Home", isDefault: addresses.length === 0 }));
                toast.success("Address added");
              }}
            />
          </div>

          {addresses.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title="No addresses saved"
              description="Add a shipping address for faster checkout."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {addresses.map((addr) => (
                <div key={addr.id} className="relative rounded-2xl border p-5">
                  {addr.isDefault && (
                    <Badge variant="success" className="absolute right-4 top-4 gap-1">
                      <Star className="h-3 w-3" /> Default
                    </Badge>
                  )}
                  <p className="font-medium">{addr.fullName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {addr.line1}
                    {addr.line2 ? `, ${addr.line2}` : ""}
                    <br />
                    {addr.city}, {addr.state} {addr.postalCode}
                    <br />
                    {addr.country} · {addr.phone}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {!addr.isDefault && (
                      <Button variant="outline" size="sm" onClick={() => dispatch(setDefaultAddress(addr.id))}>
                        Set default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => dispatch(removeAddress(addr.id))}
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AddressSheet({ onSave }: { onSave: (a: Omit<Address, "id" | "label" | "isDefault">) => void }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressForm>({ resolver: zodResolver(addressSchema) });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> Add address
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="px-0 text-left">
          <SheetTitle>Add a new address</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) => {
            onSave(data);
            reset();
            setOpen(false);
          })}
          className="mt-4 space-y-4"
        >
          <FormField label="Full name" {...register("fullName")} error={errors.fullName?.message} />
          <FormField label="Email" type="email" {...register("email")} error={errors.email?.message} />
          <FormField label="Phone" {...register("phone")} error={errors.phone?.message} />
          <FormField label="Street address" {...register("line1")} error={errors.line1?.message} />
          <FormField label="Apartment, suite (optional)" {...register("line2")} />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="City" {...register("city")} error={errors.city?.message} />
            <FormField label="State" {...register("state")} error={errors.state?.message} />
            <FormField label="Postal code" {...register("postalCode")} error={errors.postalCode?.message} />
            <FormField label="Country" {...register("country")} error={errors.country?.message} />
          </div>
          <Button type="submit" className="w-full">
            Save address
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
