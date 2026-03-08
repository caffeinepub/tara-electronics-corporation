import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  AirVent,
  Camera,
  Check,
  ChevronRight,
  Cpu,
  Headphones,
  Home,
  Laptop,
  ShoppingCart,
  Smartphone,
  Speaker,
  Star,
  Tv,
  Waves,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory } from "../backend.d";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";

// ─── Product Data ─────────────────────────────────────────────────────────────

type FilterCategory =
  | "All"
  | "TVs"
  | "Smartphones"
  | "Laptops"
  | "Audio"
  | "Appliances"
  | "Cameras";

interface LocalProduct extends Product {
  filterCategory: FilterCategory;
  rating: number;
  reviewCount: number;
  iconName: string;
  gradientFrom: string;
  gradientTo: string;
  badge: string;
}

const PRODUCTS: LocalProduct[] = [
  {
    id: 100n,
    name: 'Samsung 55" 4K QLED Smart TV',
    description:
      "55-inch 4K UHD QLED display with built-in streaming apps, Tizen OS, and HDR10+ support.",
    priceInInr: 72990n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "TVs",
    rating: 4.5,
    reviewCount: 1284,
    iconName: "Tv",
    gradientFrom: "oklch(0.25 0.08 255)",
    gradientTo: "oklch(0.18 0.12 240)",
    badge: "TV",
  },
  {
    id: 101n,
    name: "Apple iPhone 15 Pro",
    description:
      "A17 Pro chip, 48MP camera system with 3x telephoto, titanium design, and USB-C connectivity.",
    priceInInr: 134900n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "Smartphones",
    rating: 4.8,
    reviewCount: 3421,
    iconName: "Smartphone",
    gradientFrom: "oklch(0.30 0.04 200)",
    gradientTo: "oklch(0.20 0.06 215)",
    badge: "Smartphone",
  },
  {
    id: 102n,
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading ANC, 30-hour battery life, Hi-Res Audio with LDAC, and multipoint connection.",
    priceInInr: 29990n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "Audio",
    rating: 4.7,
    reviewCount: 2187,
    iconName: "Headphones",
    gradientFrom: "oklch(0.22 0.05 30)",
    gradientTo: "oklch(0.15 0.04 20)",
    badge: "Audio",
  },
  {
    id: 103n,
    name: "LG 1.5 Ton 5-Star Inverter AC",
    description:
      "Dual Inverter compressor, Wi-Fi enabled smart control, auto-cleaning, and energy-efficient cooling.",
    priceInInr: 42500n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "Appliances",
    rating: 4.3,
    reviewCount: 876,
    iconName: "AirVent",
    gradientFrom: "oklch(0.28 0.1 200)",
    gradientTo: "oklch(0.18 0.08 190)",
    badge: "Appliance",
  },
  {
    id: 104n,
    name: "MacBook Air M2",
    description:
      'Apple M2 chip, 13.6" Liquid Retina display, 18-hour battery, 8-core GPU, fanless silent design.',
    priceInInr: 114900n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "Laptops",
    rating: 4.9,
    reviewCount: 4562,
    iconName: "Laptop",
    gradientFrom: "oklch(0.35 0.04 240)",
    gradientTo: "oklch(0.22 0.06 250)",
    badge: "Laptop",
  },
  {
    id: 105n,
    name: "Bosch 8kg Front Load Washer",
    description:
      "EcoSilence motor, i-DOS auto dosing technology, SpeedPerfect for faster cycles, 1400 RPM.",
    priceInInr: 54999n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "Appliances",
    rating: 4.4,
    reviewCount: 654,
    iconName: "Waves",
    gradientFrom: "oklch(0.25 0.09 215)",
    gradientTo: "oklch(0.18 0.07 210)",
    badge: "Appliance",
  },
  {
    id: 106n,
    name: 'Sony Bravia 43" Full HD Smart TV',
    description:
      "X-Reality Pro processor, Motionflow XR, Google TV platform with Chromecast built-in.",
    priceInInr: 38999n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "TVs",
    rating: 4.2,
    reviewCount: 1093,
    iconName: "Tv",
    gradientFrom: "oklch(0.20 0.07 260)",
    gradientTo: "oklch(0.14 0.09 250)",
    badge: "TV",
  },
  {
    id: 107n,
    name: "JBL Flip 6 Portable Speaker",
    description:
      "IP67 waterproof and dustproof, 12-hour battery, PartyBoost for multi-speaker pairing, bold sound.",
    priceInInr: 9999n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "Audio",
    rating: 4.6,
    reviewCount: 3892,
    iconName: "Speaker",
    gradientFrom: "oklch(0.40 0.15 25)",
    gradientTo: "oklch(0.28 0.12 20)",
    badge: "Audio",
  },
  {
    id: 108n,
    name: "Philips 750W Mixer Grinder",
    description:
      "750W motor, 3 stainless steel jars, Turbo function for faster blending, easy-to-clean design.",
    priceInInr: 3499n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "Appliances",
    rating: 4.1,
    reviewCount: 2341,
    iconName: "Cpu",
    gradientFrom: "oklch(0.30 0.12 60)",
    gradientTo: "oklch(0.22 0.10 55)",
    badge: "Appliance",
  },
  {
    id: 109n,
    name: "Canon EOS 1500D DSLR Camera",
    description:
      "24.1MP APS-C CMOS sensor, DIGIC 4+ processor, Full HD video, Wi-Fi + NFC connectivity.",
    priceInInr: 34990n,
    imageUrl: "",
    category: ProductCategory.consumerElectronics,
    filterCategory: "Cameras",
    rating: 4.5,
    reviewCount: 1876,
    iconName: "Camera",
    gradientFrom: "oklch(0.22 0.04 30)",
    gradientTo: "oklch(0.15 0.03 25)",
    badge: "Camera",
  },
];

const FILTER_CATEGORIES: FilterCategory[] = [
  "All",
  "TVs",
  "Smartphones",
  "Laptops",
  "Audio",
  "Appliances",
  "Cameras",
];

// ─── Icon Map ──────────────────────────────────────────────────────────────────
const IconMap: Record<string, React.ElementType> = {
  Tv,
  Smartphone,
  Headphones,
  AirVent,
  Laptop,
  Waves,
  Speaker,
  Cpu,
  Camera,
};

// ─── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {(["s1", "s2", "s3", "s4", "s5"] as const).map((key, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < Math.ceil(rating);
          return (
            <Star
              key={key}
              className="w-3.5 h-3.5"
              style={{
                fill: filled || half ? "oklch(0.78 0.18 65)" : "transparent",
                color:
                  filled || half
                    ? "oklch(0.78 0.18 65)"
                    : "oklch(0.75 0.02 85)",
              }}
            />
          );
        })}
      </div>
      <span
        className="text-xs font-medium"
        style={{ color: "oklch(0.5 0.02 255)" }}
      >
        {rating} ({count.toLocaleString()})
      </span>
    </div>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
}: {
  product: LocalProduct;
  index: number;
}) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedState, setAddedState] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const IconComp = IconMap[product.iconName] ?? Cpu;

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
    setAddedState(true);
    setTimeout(() => setAddedState(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate({ to: "/cart" });
  };

  return (
    <motion.div
      data-ocid={`electronics.product.item.${index + 1}`}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden flex flex-col"
      style={{
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 48px -8px rgba(30, 50, 120, 0.22)",
      }}
    >
      {/* Image / Icon Area */}
      <div
        className="relative overflow-hidden h-52 flex-shrink-0 cursor-pointer"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)`,
            transform: imageHovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        >
          <IconComp
            className="w-20 h-20 drop-shadow-lg"
            style={{ color: "rgba(255,255,255,0.25)" }}
          />
        </div>

        {/* Quick View Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
            opacity: imageHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-white border border-white/40"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            Quick View
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            data-ocid={`electronics.product.badge.${index + 1}`}
            className="text-xs font-bold px-2.5 py-0.5 rounded-full border-0"
            style={{
              background: "oklch(0.78 0.18 65 / 0.18)",
              color: "oklch(0.78 0.18 65)",
              backdropFilter: "blur(8px)",
            }}
          >
            {product.badge}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3
            className="font-display font-bold text-base leading-tight line-clamp-2 mb-1"
            style={{ color: "oklch(0.15 0.05 255)" }}
          >
            {product.name}
          </h3>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {product.description}
          </p>
        </div>

        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span
            className="font-display text-2xl font-black"
            style={{ color: "oklch(0.22 0.065 255)" }}
          >
            ₹{Number(product.priceInInr).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto pt-1">
          {/* ADD TO CART */}
          <motion.button
            data-ocid={`electronics.add_to_cart_button.${index + 1}`}
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border-2 transition-colors duration-200"
            style={{
              borderColor: addedState
                ? "oklch(0.55 0.15 145)"
                : "oklch(0.22 0.065 255)",
              color: addedState
                ? "oklch(0.55 0.15 145)"
                : "oklch(0.22 0.065 255)",
              background: addedState
                ? "oklch(0.55 0.15 145 / 0.08)"
                : "transparent",
            }}
            whileHover={{
              scale: 1.02,
              backgroundColor: "oklch(0.22 0.065 255 / 0.06)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {addedState ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Added!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  ADD TO CART
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* BUY NOW */}
          <motion.button
            data-ocid={`electronics.buy_now_button.${index + 1}`}
            onClick={handleBuyNow}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold"
            style={{
              background: "oklch(0.78 0.18 65)",
              color: "oklch(0.12 0.04 255)",
            }}
            whileHover={{
              scale: 1.02,
              filter: "brightness(1.1)",
              boxShadow: "0 6px 24px -4px oklch(0.78 0.18 65 / 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Zap className="w-4 h-4" />
            BUY NOW
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.0, 0.0, 0.2, 1.0] as const },
  },
};

export function ConsumerElectronicsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filteredProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterCategory === activeFilter);

  return (
    <main>
      {/* ── Hero Banner ── */}
      <section
        data-ocid="electronics.hero.section"
        className="relative overflow-hidden py-14 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.13 0.06 255) 0%, oklch(0.18 0.08 240) 60%, oklch(0.20 0.1 220) 100%)",
        }}
      >
        {/* Background noise / texture overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Decorative glow circles */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.78 0.18 65 / 0.07)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.5 0.15 255 / 0.1)",
            filter: "blur(50px)",
          }}
        />

        <div className="relative container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs font-medium mb-6"
            style={{ color: "oklch(0.75 0.04 255)" }}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
            <span style={{ color: "oklch(0.88 0.14 75)" }}>
              Consumer Electronics
            </span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "oklch(0.78 0.18 65 / 0.15)",
                color: "oklch(0.88 0.14 75)",
              }}
            >
              <Zap className="w-3 h-3" />
              Premium Consumer Electronics
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-3">
              Consumer
              <br />
              <span style={{ color: "oklch(0.88 0.14 75)" }}>Electronics</span>
            </h1>
            <p className="text-lg text-white/60 max-w-lg leading-relaxed">
              Quality You Can Trust — curated lineup of TVs, smartphones,
              laptops, audio gear, home appliances & cameras from leading
              brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Pills + Product Grid ── */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="electronics.filter.tab"
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border"
                style={
                  activeFilter === cat
                    ? {
                        background: "oklch(0.22 0.065 255)",
                        color: "white",
                        borderColor: "oklch(0.22 0.065 255)",
                        boxShadow:
                          "0 4px 12px -4px oklch(0.22 0.065 255 / 0.4)",
                      }
                    : {
                        background: "transparent",
                        color: "oklch(0.5 0.03 255)",
                        borderColor: "oklch(0.85 0.015 85)",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                data-ocid="electronics.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "oklch(0.94 0.008 85)" }}
                >
                  <ShoppingCart
                    className="w-8 h-8"
                    style={{ color: "oklch(0.6 0.04 255)" }}
                  />
                </div>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "oklch(0.3 0.04 255)" }}
                >
                  No products found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try selecting a different category
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => {
                  // find original 0-based index in PRODUCTS for stable data-ocid numbering
                  const originalIdx = PRODUCTS.findIndex(
                    (p) => p.id === product.id,
                  );
                  return (
                    <motion.div
                      key={product.id.toString()}
                      variants={cardVariants}
                    >
                      <ProductCard product={product} index={originalIdx} />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
