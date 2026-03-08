import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Minus,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory } from "../backend.d";
import { useCart } from "../context/CartContext";
import { useProductById } from "../hooks/useQueries";

const categoryLabels: Record<string, string> = {
  [ProductCategory.consumerElectronics]: "Consumer Electronics",
  [ProductCategory.laserEngraving]: "Laser Engraving",
  [ProductCategory.threeDPrinting]: "3D Printing",
  [ProductCategory.customisation]: "Customisation",
};

const categoryRoutes: Record<string, string> = {
  [ProductCategory.consumerElectronics]: "/category/consumerElectronics",
  [ProductCategory.laserEngraving]: "/category/laserEngraving",
  [ProductCategory.threeDPrinting]: "/category/threeDPrinting",
  [ProductCategory.customisation]: "/category/customisation",
};

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export function ProductDetailPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const id = BigInt(productId);
  const { data: product, isLoading, isError } = useProductById(id);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-10">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
          <h2 className="font-display font-bold text-xl mb-2">
            Product Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            This product could not be found.
          </p>
          <Link to="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  const categoryRoute = categoryRoutes[product.category] ?? "/";

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to={categoryRoute}
            className="hover:text-foreground transition-colors"
          >
            {categoryLabels[product.category] ?? product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">
            {product.name}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Product Image */}
          <div className="rounded-2xl overflow-hidden bg-muted border border-border aspect-square lg:aspect-auto lg:h-[480px]">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "oklch(0.94 0.01 255)" }}
              >
                <Package className="w-24 h-24 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Badge
              className="w-fit mb-4 text-xs font-semibold"
              style={{
                background: "oklch(0.22 0.065 255 / 0.1)",
                color: "oklch(0.22 0.065 255)",
              }}
            >
              {categoryLabels[product.category] ?? product.category}
            </Badge>

            <h1
              className="font-display text-2xl sm:text-3xl font-black mb-4 leading-tight"
              style={{ color: "oklch(0.15 0.05 255)" }}
            >
              {product.name}
            </h1>

            <div
              className="text-3xl font-black mb-6"
              style={{ color: "oklch(0.22 0.065 255)" }}
            >
              {formatPrice(product.priceInInr)}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-foreground">
                Quantity:
              </span>
              <div className="flex items-center gap-2 border border-border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </Button>
                <span
                  data-ocid="product.quantity_input"
                  className="w-10 text-center font-semibold text-sm"
                >
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              data-ocid="product.add_to_cart_button"
              onClick={handleAddToCart}
              className="w-full font-bold text-base transition-all duration-200"
              style={
                added
                  ? { background: "oklch(0.6 0.18 140)", color: "white" }
                  : {
                      background: "oklch(0.78 0.18 65)",
                      color: "oklch(0.12 0.04 255)",
                    }
              }
            >
              {added ? (
                <>
                  <Check className="mr-2 w-5 h-5" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
                </>
              )}
            </Button>

            <Link to={categoryRoute} className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to {categoryLabels[product.category] ?? "Category"}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
