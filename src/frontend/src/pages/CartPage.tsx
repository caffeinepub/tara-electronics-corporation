import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/useQueries";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { mutateAsync: placeOrder, isPending } = usePlaceOrder();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.priceInInr) * item.quantity,
    0,
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    if (!address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    try {
      const items = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: BigInt(item.quantity),
      }));
      const customerInfo = {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      };
      const id = await placeOrder({ items, customerInfo });
      setOrderId(id);
      clearCart();
      toast.success("Order placed successfully!");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (orderId !== null) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            data-ocid="cart.success_state"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "oklch(0.6 0.18 140 / 0.15)" }}
            >
              <CheckCircle
                className="w-10 h-10"
                style={{ color: "oklch(0.6 0.18 140)" }}
              />
            </div>
            <h2
              className="font-display text-2xl font-black mb-2"
              style={{ color: "oklch(0.15 0.05 255)" }}
            >
              Order Placed!
            </h2>
            <p className="text-muted-foreground mb-4">
              Thank you for your order. We'll contact you shortly.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted mb-6">
              <span className="text-sm text-muted-foreground">Order ID:</span>
              <span className="font-mono font-bold text-sm">
                #{orderId.toString()}
              </span>
            </div>
            <br />
            <Link to="/">
              <Button
                style={{ background: "oklch(0.22 0.065 255)", color: "white" }}
                className="font-semibold"
              >
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div
          className="container mx-auto px-4 text-center"
          data-ocid="cart.empty_state"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag className="w-20 h-20 mx-auto mb-5 text-muted-foreground/30" />
            <h2
              className="font-display text-2xl font-black mb-2"
              style={{ color: "oklch(0.15 0.05 255)" }}
            >
              Your Cart is Empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Looks like you haven't added any products yet. Start exploring our
              catalog.
            </p>
            <Link to="/">
              <Button
                style={{
                  background: "oklch(0.78 0.18 65)",
                  color: "oklch(0.12 0.04 255)",
                }}
                className="font-bold"
              >
                Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <h1
          className="font-display text-2xl sm:text-3xl font-black mb-8"
          style={{ color: "oklch(0.15 0.05 255)" }}
        >
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.product.id.toString()}
                  data-ocid={`cart.item.${index + 1}`}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted border border-border">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-sm leading-tight line-clamp-2 mb-1"
                      style={{ color: "oklch(0.15 0.05 255)" }}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                      {item.product.description}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-7 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= 10}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="font-bold text-sm"
                          style={{ color: "oklch(0.22 0.065 255)" }}
                        >
                          {formatPrice(
                            Number(item.product.priceInInr) * item.quantity,
                          )}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.product.id)}
                          data-ocid={`cart.delete_button.${index + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary + Checkout */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h2
                className="font-display font-bold text-base mb-4"
                style={{ color: "oklch(0.15 0.05 255)" }}
              >
                Order Summary
              </h2>
              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id.toString()}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground truncate max-w-[60%]">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(
                        Number(item.product.priceInInr) * item.quantity,
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Subtotal</span>
                <span
                  className="font-black text-lg"
                  style={{ color: "oklch(0.22 0.065 255)" }}
                >
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h2
                className="font-display font-bold text-base mb-4"
                style={{ color: "oklch(0.15 0.05 255)" }}
              >
                Delivery Details
              </h2>
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="cart-name"
                    className="text-sm font-semibold mb-1.5 block"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cart-name"
                    data-ocid="cart.name_input"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((p) => ({ ...p, name: "" }));
                    }}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="cart-phone"
                    className="text-sm font-semibold mb-1.5 block"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cart-phone"
                    data-ocid="cart.phone_input"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors((p) => ({ ...p, phone: "" }));
                    }}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="cart-address"
                    className="text-sm font-semibold mb-1.5 block"
                  >
                    Delivery Address <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="cart-address"
                    data-ocid="cart.address_input"
                    placeholder="Full delivery address"
                    rows={3}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors((p) => ({ ...p, address: "" }));
                    }}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <Button
                  size="lg"
                  data-ocid="cart.place_order_button"
                  className="w-full font-bold"
                  onClick={handlePlaceOrder}
                  disabled={isPending}
                  style={{
                    background: "oklch(0.78 0.18 65)",
                    color: "oklch(0.12 0.04 255)",
                  }}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
