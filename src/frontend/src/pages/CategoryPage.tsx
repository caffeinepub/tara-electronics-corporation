import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowRight, Package } from "lucide-react";
import { motion } from "motion/react";
import type { ProductCategory } from "../backend.d";
import { useProductsByCategory } from "../hooks/useQueries";

const categoryMeta: Record<
  string,
  { title: string; description: string; color: string }
> = {
  consumerElectronics: {
    title: "Consumer Electronics",
    description: "TVs, Smartphones, Laptops, Home Appliances & Accessories",
    color: "oklch(0.55 0.15 255)",
  },
  laserEngraving: {
    title: "Laser Engraving",
    description: "Custom Laser Engraving on Metal, Wood, Glass & Acrylic",
    color: "oklch(0.55 0.18 35)",
  },
  threeDPrinting: {
    title: "3D Printing",
    description: "Custom 3D Printing Services with Multiple Material Options",
    color: "oklch(0.5 0.18 180)",
  },
  customisation: {
    title: "Customisation",
    description: "Mobile Skins, Laptop Skins & UV Printing on Various Surfaces",
    color: "oklch(0.55 0.2 310)",
  },
};

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export function CategoryPage() {
  const { categoryId } = useParams({ from: "/category/$categoryId" });
  const category = categoryId as ProductCategory;
  const meta = categoryMeta[categoryId] ?? {
    title: categoryId,
    description: "Browse our products",
    color: "oklch(0.5 0.1 255)",
  };

  const {
    data: products,
    isLoading,
    isError,
  } = useProductsByCategory(category);

  return (
    <main className="min-h-screen bg-background">
      {/* Category Header */}
      <section
        className="py-10 border-b border-border"
        style={{ background: "oklch(0.18 0.06 255)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge
              className="mb-3 text-xs font-semibold"
              style={{
                background: "oklch(0.78 0.18 65 / 0.2)",
                color: "oklch(0.88 0.14 75)",
              }}
            >
              TARA ELECTRONICS
            </Badge>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-2">
              {meta.title}
            </h1>
            <p className="text-white/60 text-base">{meta.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading && (
            <div
              data-ocid="category.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((sk) => (
                <div
                  key={sk}
                  className="rounded-xl overflow-hidden border border-border bg-card"
                >
                  <Skeleton className="h-52 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-9 w-full mt-3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div data-ocid="category.error_state" className="text-center py-16">
              <p className="text-muted-foreground">
                Failed to load products. Please try again.
              </p>
            </div>
          )}

          {!isLoading && !isError && products && products.length === 0 && (
            <div data-ocid="category.empty_state" className="text-center py-20">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="font-display font-bold text-xl mb-2">
                No Products Yet
              </h3>
              <p className="text-muted-foreground">
                Products will be available soon. Please check back later.
              </p>
            </div>
          )}

          {!isLoading && products && products.length > 0 && (
            <motion.div
              data-ocid="category.product_list"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id.toString()}
                  data-ocid={`category.product.item.${index + 1}`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4 },
                    },
                  }}
                  className="group bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden h-52">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          (
                            e.target as HTMLImageElement
                          ).parentElement!.classList.add("bg-placeholder");
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: `${meta.color}22` }}
                      >
                        <Package
                          className="w-12 h-12 opacity-30"
                          style={{ color: meta.color }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3
                      className="font-display font-bold text-base leading-tight mb-1 line-clamp-2"
                      style={{ color: "oklch(0.15 0.05 255)" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-snug">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-display font-black text-lg"
                        style={{ color: "oklch(0.22 0.065 255)" }}
                      >
                        {formatPrice(product.priceInInr)}
                      </span>
                    </div>
                    <Link
                      to="/product/$productId"
                      params={{ productId: product.id.toString() }}
                      className="mt-3 block"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full font-semibold border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
                        style={{ color: "oklch(0.22 0.065 255)" }}
                      >
                        View Details
                        <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
