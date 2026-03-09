import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Flame, Home, Layers, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Product Data ─────────────────────────────────────────────────────────────

type MaterialFilter =
  | "All"
  | "Wood"
  | "Metal"
  | "Glass"
  | "Acrylic"
  | "Leather";

interface LaserProduct {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  image: string;
  material: MaterialFilter;
  badge: string;
  highlight: string;
}

const PRODUCTS: LaserProduct[] = [
  {
    id: 1,
    name: "Wooden Nameplate",
    description:
      "Custom laser engraved wood nameplate with ornate decorative border. Perfect for home, office, or gift.",
    startingPrice: 349,
    image: "/assets/generated/laser-wood-nameplate.dim_400x400.jpg",
    material: "Wood",
    badge: "Wood",
    highlight: "Bestseller",
  },
  {
    id: 2,
    name: "Metal Keychain",
    description:
      "Stainless steel keychain with precise name, logo, or message engraving. Durable and personalised.",
    startingPrice: 199,
    image: "/assets/generated/laser-metal-keychain.dim_400x400.jpg",
    material: "Metal",
    badge: "Metal",
    highlight: "Popular Gift",
  },
  {
    id: 3,
    name: "Glass Trophy / Award",
    description:
      "Crystal-clear glass award with company branding, logo, and personalized text. Ideal for corporate events.",
    startingPrice: 799,
    image: "/assets/generated/laser-glass-trophy.dim_400x400.jpg",
    material: "Glass",
    badge: "Glass",
    highlight: "Corporate",
  },
  {
    id: 4,
    name: "Acrylic Photo Frame",
    description:
      "Transparent acrylic photo frame with custom engraved message, names, or dates. Modern and elegant.",
    startingPrice: 449,
    image: "/assets/generated/laser-acrylic-frame.dim_400x400.jpg",
    material: "Acrylic",
    badge: "Acrylic",
    highlight: "Custom",
  },
  {
    id: 5,
    name: "Leather Wallet",
    description:
      "Premium genuine leather wallet with monogram, initials, or artwork engraving. A timeless keepsake.",
    startingPrice: 599,
    image: "/assets/generated/laser-leather-wallet.dim_400x400.jpg",
    material: "Leather",
    badge: "Leather",
    highlight: "Premium",
  },
  {
    id: 6,
    name: "Steel Bottle / Tumbler",
    description:
      "Matte stainless steel bottle with intricate mandala or custom design engraving. Stylish and eco-friendly.",
    startingPrice: 499,
    image: "/assets/generated/laser-steel-bottle.dim_400x400.jpg",
    material: "Metal",
    badge: "Metal",
    highlight: "Eco Gift",
  },
];

const FILTER_CATEGORIES: MaterialFilter[] = [
  "All",
  "Wood",
  "Metal",
  "Glass",
  "Acrylic",
  "Leather",
];

// ─── Product Card ──────────────────────────────────────────────────────────────
function LaserProductCard({
  product,
  index,
}: {
  product: LaserProduct;
  index: number;
}) {
  const navigate = useNavigate();
  const [imageHovered, setImageHovered] = useState(false);

  const handleOrderNow = () => {
    navigate({ to: "/contact" });
  };

  return (
    <motion.div
      data-ocid={`laser.product.item.${index + 1}`}
      className="group relative bg-card rounded-2xl border overflow-hidden flex flex-col"
      style={{
        borderColor: "oklch(0.88 0.04 50)",
        transition: "box-shadow 0.3s ease",
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 48px -8px oklch(0.55 0.18 45 / 0.30)",
      }}
    >
      {/* Product Image */}
      <div
        className="relative overflow-hidden h-56 flex-shrink-0 cursor-pointer"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{
            transform: imageHovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.45s ease",
          }}
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
            opacity: imageHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Engraving shimmer effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, oklch(0.78 0.18 65 / 0.12) 50%, transparent 60%)",
            transform: imageHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.7s ease",
          }}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className="text-xs font-bold px-2.5 py-0.5 rounded-full border-0"
            style={{
              background: "oklch(0.18 0.08 30 / 0.85)",
              color: "oklch(0.88 0.16 65)",
              backdropFilter: "blur(8px)",
            }}
          >
            {product.badge}
          </Badge>
        </div>

        {/* Highlight tag */}
        <div className="absolute top-3 right-3">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.78 0.18 65 / 0.92)",
              color: "oklch(0.13 0.06 35)",
            }}
          >
            {product.highlight}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3
            className="font-display font-bold text-base leading-tight line-clamp-2 mb-1"
            style={{ color: "oklch(0.18 0.06 35)" }}
          >
            {product.name}
          </h3>
          <p
            className="text-sm leading-snug line-clamp-2"
            style={{ color: "oklch(0.45 0.04 40)" }}
          >
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-xs font-medium"
            style={{ color: "oklch(0.55 0.08 45)" }}
          >
            Starting from
          </span>
          <span
            className="font-display text-2xl font-black"
            style={{ color: "oklch(0.22 0.08 35)" }}
          >
            ₹{product.startingPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* ORDER NOW button */}
        <div className="mt-auto pt-1">
          <motion.button
            data-ocid={`laser.order_now_button.${index + 1}`}
            onClick={handleOrderNow}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.20 55) 0%, oklch(0.65 0.22 45) 100%)",
              color: "oklch(0.10 0.04 35)",
              boxShadow: "0 4px 16px -4px oklch(0.65 0.22 45 / 0.4)",
            }}
            whileHover={{
              scale: 1.02,
              filter: "brightness(1.08)",
              boxShadow: "0 8px 28px -4px oklch(0.65 0.22 45 / 0.55)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <ShoppingBag className="w-4 h-4" />
            ORDER NOW
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Animation Variants ─────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.0, 0.0, 0.2, 1.0] as const },
  },
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function LaserEngravingPage() {
  const [activeFilter, setActiveFilter] = useState<MaterialFilter>("All");

  const filteredProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.material === activeFilter);

  return (
    <main>
      {/* ── Hero Banner ── */}
      <section
        data-ocid="laser.hero.section"
        className="relative overflow-hidden py-14 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.13 0.06 35) 0%, oklch(0.16 0.07 30) 50%, oklch(0.18 0.08 25) 100%)",
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Decorative glow — warm amber fire tones */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.72 0.20 55 / 0.10)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.55 0.18 35 / 0.12)",
            filter: "blur(55px)",
          }}
        />

        {/* Laser beam decorative lines */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-8 left-0 right-0 h-px opacity-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.88 0.16 65), transparent)",
            }}
          />
          <div
            className="absolute bottom-10 left-0 right-0 h-px opacity-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.88 0.16 65), transparent)",
            }}
          />
        </div>

        <div className="relative container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs font-medium mb-6"
            style={{ color: "oklch(0.65 0.08 45)" }}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
            <span style={{ color: "oklch(0.88 0.16 65)" }}>
              Laser Engraving
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
                background: "oklch(0.72 0.20 55 / 0.18)",
                color: "oklch(0.88 0.16 65)",
              }}
            >
              <Flame className="w-3 h-3" />
              Custom Laser Engraving Services
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-3">
              Laser
              <br />
              <span style={{ color: "oklch(0.88 0.16 65)" }}>Engraving</span>
            </h1>

            <p
              className="text-lg max-w-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.70 0.05 40)" }}
            >
              Precision laser engraving on Metal, Wood, Glass & Acrylic. Custom
              nameplates, trophies, gifts, and personalised keepsakes — crafted
              with care since 1979.
            </p>

            {/* Material icons row */}
            <div className="flex flex-wrap items-center gap-3">
              {(
                [
                  { label: "Wood", icon: "🪵" },
                  { label: "Metal", icon: "⚙️" },
                  { label: "Glass", icon: "🔮" },
                  { label: "Acrylic", icon: "💎" },
                  { label: "Leather", icon: "👜" },
                ] as const
              ).map(({ label, icon }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "oklch(0.78 0.15 55 / 0.12)",
                    color: "oklch(0.78 0.12 55)",
                    border: "1px solid oklch(0.78 0.15 55 / 0.20)",
                  }}
                >
                  <span>{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter + Product Grid ── */}
      <section className="py-12" style={{ background: "oklch(0.97 0.01 50)" }}>
        <div className="container mx-auto px-4">
          {/* Filter Pills */}
          <div className="flex flex-col gap-5 mb-10">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Layers
                  className="w-4 h-4"
                  style={{ color: "oklch(0.55 0.12 45)" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.35 0.06 40)" }}
                >
                  Filter by Material:
                </span>
              </div>

              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  data-ocid="laser.filter.tab"
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border"
                  style={
                    activeFilter === cat
                      ? {
                          background:
                            "linear-gradient(135deg, oklch(0.65 0.22 45) 0%, oklch(0.58 0.20 40) 100%)",
                          color: "oklch(0.10 0.04 35)",
                          borderColor: "oklch(0.65 0.22 45)",
                          boxShadow:
                            "0 4px 12px -4px oklch(0.65 0.22 45 / 0.45)",
                        }
                      : {
                          background: "transparent",
                          color: "oklch(0.50 0.06 45)",
                          borderColor: "oklch(0.82 0.06 50)",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Result count */}
            <p className="text-sm" style={{ color: "oklch(0.55 0.04 45)" }}>
              Showing{" "}
              <strong style={{ color: "oklch(0.22 0.08 35)" }}>
                {filteredProducts.length}
              </strong>{" "}
              of {PRODUCTS.length} items
            </p>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                data-ocid="laser.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "oklch(0.90 0.05 55)" }}
                >
                  <Flame
                    className="w-8 h-8"
                    style={{ color: "oklch(0.60 0.16 45)" }}
                  />
                </div>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "oklch(0.30 0.06 40)" }}
                >
                  No items found for this material
                </p>
                <p className="text-sm" style={{ color: "oklch(0.55 0.04 45)" }}>
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
                  const originalIdx = PRODUCTS.findIndex(
                    (p) => p.id === product.id,
                  );
                  return (
                    <motion.div key={product.id} variants={cardVariants}>
                      <LaserProductCard product={product} index={originalIdx} />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.14 0.07 30) 0%, oklch(0.18 0.08 45) 100%)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8">
              <div>
                <h3 className="font-display text-xl font-black text-white mb-1">
                  Need a Custom Design?
                </h3>
                <p style={{ color: "oklch(0.68 0.08 50)" }} className="text-sm">
                  Contact us with your artwork or idea. We'll bring it to life
                  on any surface.
                </p>
              </div>
              <motion.button
                data-ocid="laser.contact_primary_button"
                onClick={() => {
                  window.location.href = "/contact";
                }}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.20 55) 0%, oklch(0.65 0.22 45) 100%)",
                  color: "oklch(0.10 0.04 35)",
                  boxShadow: "0 4px 20px -4px oklch(0.65 0.22 45 / 0.5)",
                }}
                whileHover={{
                  scale: 1.04,
                  filter: "brightness(1.08)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <ShoppingBag className="w-4 h-4" />
                Send an Enquiry
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
