import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import {
  Box,
  ChevronRight,
  Home,
  Layers,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Product Data ─────────────────────────────────────────────────────────────

type MaterialFilter = "All" | "PLA" | "ABS" | "Resin" | "PETG" | "Flexible";

interface PrintProduct {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  image: string;
  material: MaterialFilter;
  badge: string;
  highlight: string;
}

const PRODUCTS: PrintProduct[] = [
  {
    id: 1,
    name: "Miniature Figurine",
    description:
      "Highly detailed 3D printed miniature figurine in white PLA. Perfect for display, gaming, or as a unique personalized gift.",
    startingPrice: 299,
    image: "/assets/generated/3d-figurine.dim_400x400.jpg",
    material: "PLA",
    badge: "PLA",
    highlight: "Popular",
  },
  {
    id: 2,
    name: "Mechanical Gear / Prototype Part",
    description:
      "Precision 3D printed mechanical parts, gear assemblies, and functional prototypes in durable grey PLA or ABS.",
    startingPrice: 399,
    image: "/assets/generated/3d-gear-part.dim_400x400.jpg",
    material: "ABS",
    badge: "ABS",
    highlight: "Industrial",
  },
  {
    id: 3,
    name: "Decorative Flower Vase",
    description:
      "Elegant 3D printed vase with intricate geometric patterns. Available in multiple colors and sizes to match any decor.",
    startingPrice: 349,
    image: "/assets/generated/3d-vase.dim_400x400.jpg",
    material: "PLA",
    badge: "PLA",
    highlight: "Home Decor",
  },
  {
    id: 4,
    name: "Custom Phone Stand",
    description:
      "Sleek and sturdy 3D printed phone / tablet stand in matte black ABS. Adjustable angles, stable base, desktop ready.",
    startingPrice: 249,
    image: "/assets/generated/3d-phone-stand.dim_400x400.jpg",
    material: "ABS",
    badge: "ABS",
    highlight: "Everyday",
  },
  {
    id: 5,
    name: "Architectural Scale Model",
    description:
      "Detailed miniature scale models of buildings, interiors, or structures in white PLA. Ideal for architects and designers.",
    startingPrice: 1499,
    image: "/assets/generated/3d-architecture-model.dim_400x400.jpg",
    material: "PLA",
    badge: "PLA",
    highlight: "Professional",
  },
  {
    id: 6,
    name: "Custom Name Keychain",
    description:
      "Personalized 3D printed keychain with your name, logo, or custom shape. Available in a variety of colors and materials.",
    startingPrice: 149,
    image: "/assets/generated/3d-keychain.dim_400x400.jpg",
    material: "PLA",
    badge: "PLA",
    highlight: "Best Gift",
  },
  {
    id: 7,
    name: "Resin Fairy Figurine",
    description:
      "Enchanting translucent resin fairy figurine with amber and purple hues, glitter inclusions, and fine fantasy detail. A stunning display piece or gift.",
    startingPrice: 499,
    image: "/assets/generated/3d-resin-fairy-figurine.dim_400x400.jpg",
    material: "Resin",
    badge: "Resin",
    highlight: "Fantasy",
  },
  {
    id: 8,
    name: "Resin Skull Figurine",
    description:
      "Dramatic deep-blue translucent resin skull figurine with teal accents and glow effect. Highly detailed collectible miniature.",
    startingPrice: 449,
    image: "/assets/generated/3d-resin-skull.dim_400x400.jpg",
    material: "Resin",
    badge: "Resin",
    highlight: "Collectible",
  },
  {
    id: 9,
    name: "PETG Mechanical Bracket",
    description:
      "Strong and precision-printed PETG mechanical mounting bracket. Ideal for industrial prototypes, enclosures, and load-bearing applications.",
    startingPrice: 349,
    image: "/assets/generated/3d-petg-bracket.dim_400x400.jpg",
    material: "PETG",
    badge: "PETG",
    highlight: "Industrial",
  },
  {
    id: 10,
    name: "PETG Storage Container",
    description:
      "Food-safe translucent PETG storage container with a smooth finish. Heat-resistant and durable — perfect for kitchen, lab, or desk use.",
    startingPrice: 299,
    image: "/assets/generated/3d-petg-container.dim_400x400.jpg",
    material: "PETG",
    badge: "PETG",
    highlight: "Food-Safe",
  },
  {
    id: 11,
    name: "Flexible TPU Phone Grip",
    description:
      "Soft, shock-absorbing TPU flexible phone case or grip. Printed to fit your exact model — protective, lightweight, and fully customizable.",
    startingPrice: 199,
    image: "/assets/generated/3d-flexible-phone-case.dim_400x400.jpg",
    material: "Flexible",
    badge: "Flexible",
    highlight: "Custom Fit",
  },
  {
    id: 12,
    name: "Flexible Cable Organizer",
    description:
      "Stretchy TPU cable organizer and wire holder in vibrant orange. Keeps your desk tidy — flexible enough to hold any cable bundle.",
    startingPrice: 129,
    image: "/assets/generated/3d-flexible-cable-organizer.dim_400x400.jpg",
    material: "Flexible",
    badge: "Flexible",
    highlight: "Everyday",
  },
];

const FILTER_CATEGORIES: MaterialFilter[] = [
  "All",
  "PLA",
  "ABS",
  "Resin",
  "PETG",
  "Flexible",
];

// ─── Product Card ──────────────────────────────────────────────────────────────
function PrintProductCard({
  product,
  index,
}: {
  product: PrintProduct;
  index: number;
}) {
  const navigate = useNavigate();
  const [imageHovered, setImageHovered] = useState(false);

  const handleOrderNow = () => {
    navigate({ to: "/cart" });
  };

  const handleCustomEnquiry = () => {
    navigate({ to: "/contact" });
  };

  return (
    <motion.div
      data-ocid={`print3d.product.item.${index + 1}`}
      className="group relative bg-card rounded-2xl border overflow-hidden flex flex-col"
      style={{
        borderColor: "oklch(0.85 0.05 230)",
        transition: "box-shadow 0.3s ease",
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 48px -8px oklch(0.50 0.18 230 / 0.28)",
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

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, oklch(0.65 0.18 230 / 0.12) 50%, transparent 60%)",
            transform: imageHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.7s ease",
          }}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className="text-xs font-bold px-2.5 py-0.5 rounded-full border-0"
            style={{
              background: "oklch(0.18 0.10 240 / 0.85)",
              color: "oklch(0.80 0.18 230)",
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
              background: "oklch(0.55 0.18 230 / 0.90)",
              color: "oklch(0.98 0.02 230)",
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
            style={{ color: "oklch(0.18 0.06 240)" }}
          >
            {product.name}
          </h3>
          <p
            className="text-sm leading-snug line-clamp-2"
            style={{ color: "oklch(0.40 0.05 240)" }}
          >
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-xs font-medium"
            style={{ color: "oklch(0.50 0.08 230)" }}
          >
            Starting from
          </span>
          <span
            className="font-display text-2xl font-black"
            style={{ color: "oklch(0.22 0.08 240)" }}
          >
            ₹{product.startingPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-1 flex flex-col gap-2">
          {/* ORDER NOW */}
          <motion.button
            data-ocid={`print3d.order_now_button.${index + 1}`}
            onClick={handleOrderNow}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.50 0.20 240) 0%, oklch(0.42 0.22 230) 100%)",
              color: "oklch(0.98 0.01 230)",
              boxShadow: "0 4px 16px -4px oklch(0.45 0.22 235 / 0.4)",
            }}
            whileHover={{
              scale: 1.02,
              filter: "brightness(1.10)",
              boxShadow: "0 8px 28px -4px oklch(0.45 0.22 235 / 0.55)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <ShoppingBag className="w-4 h-4" />
            ORDER NOW
          </motion.button>

          {/* CUSTOM ENQUIRY */}
          <motion.button
            data-ocid={`print3d.custom_enquiry_button.${index + 1}`}
            onClick={handleCustomEnquiry}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border-2"
            style={{
              background: "transparent",
              color: "oklch(0.42 0.18 230)",
              borderColor: "oklch(0.55 0.18 230 / 0.45)",
            }}
            whileHover={{
              scale: 1.02,
              backgroundColor: "oklch(0.55 0.18 230 / 0.08)",
              borderColor: "oklch(0.50 0.20 230)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageSquare className="w-4 h-4" />
            CUSTOM ENQUIRY
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
export function ThreeDPrintingPage() {
  const [activeFilter, setActiveFilter] = useState<MaterialFilter>("All");
  const navigate = useNavigate();

  const filteredProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.material === activeFilter);

  return (
    <main>
      {/* ── Hero Banner ── */}
      <section
        data-ocid="print3d.hero.section"
        className="relative overflow-hidden py-14 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.10 0.08 250) 0%, oklch(0.14 0.10 240) 50%, oklch(0.16 0.09 230) 100%)",
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

        {/* Decorative glow — cool blue tones */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.55 0.20 230 / 0.12)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.45 0.18 250 / 0.14)",
            filter: "blur(55px)",
          }}
        />

        {/* Decorative lines */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-8 left-0 right-0 h-px opacity-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.70 0.18 230), transparent)",
            }}
          />
          <div
            className="absolute bottom-10 left-0 right-0 h-px opacity-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.70 0.18 230), transparent)",
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
            style={{ color: "oklch(0.60 0.08 240)" }}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
            <span style={{ color: "oklch(0.75 0.18 230)" }}>3D Printing</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "oklch(0.50 0.20 230 / 0.18)",
                color: "oklch(0.75 0.18 230)",
              }}
            >
              <Box className="w-3 h-3" />
              Custom 3D Printing Services
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-3">
              3D
              <br />
              <span style={{ color: "oklch(0.75 0.18 230)" }}>Printing</span>
            </h1>

            <p
              className="text-lg max-w-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.65 0.05 240)" }}
            >
              Bring your ideas to life with precision 3D printing. From
              prototypes and models to custom decor and personalized gifts —
              crafted with care since 1979.
            </p>

            {/* Material icons row */}
            <div className="flex flex-wrap items-center gap-3">
              {(
                [
                  { label: "PLA", icon: "🟦" },
                  { label: "ABS", icon: "⚙️" },
                  { label: "Resin", icon: "💎" },
                  { label: "PETG", icon: "🔩" },
                  { label: "Flexible", icon: "🌀" },
                ] as const
              ).map(({ label, icon }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "oklch(0.55 0.15 230 / 0.12)",
                    color: "oklch(0.72 0.12 230)",
                    border: "1px solid oklch(0.55 0.15 230 / 0.22)",
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
      <section className="py-12" style={{ background: "oklch(0.97 0.01 240)" }}>
        <div className="container mx-auto px-4">
          {/* Filter Pills */}
          <div className="flex flex-col gap-5 mb-10">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Layers
                  className="w-4 h-4"
                  style={{ color: "oklch(0.45 0.14 230)" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.35 0.06 240)" }}
                >
                  Filter by Material:
                </span>
              </div>

              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  data-ocid="print3d.filter.tab"
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border"
                  style={
                    activeFilter === cat
                      ? {
                          background:
                            "linear-gradient(135deg, oklch(0.50 0.20 240) 0%, oklch(0.42 0.22 230) 100%)",
                          color: "oklch(0.98 0.01 230)",
                          borderColor: "oklch(0.50 0.20 240)",
                          boxShadow:
                            "0 4px 12px -4px oklch(0.45 0.22 235 / 0.45)",
                        }
                      : {
                          background: "transparent",
                          color: "oklch(0.45 0.08 240)",
                          borderColor: "oklch(0.82 0.06 230)",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Result count */}
            <p className="text-sm" style={{ color: "oklch(0.50 0.04 240)" }}>
              Showing{" "}
              <strong style={{ color: "oklch(0.22 0.08 240)" }}>
                {filteredProducts.length}
              </strong>{" "}
              of {PRODUCTS.length} products
            </p>
          </div>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                data-ocid="print3d.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "oklch(0.88 0.06 230)" }}
                >
                  <Box
                    className="w-8 h-8"
                    style={{ color: "oklch(0.45 0.18 230)" }}
                  />
                </div>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "oklch(0.30 0.06 240)" }}
                >
                  No items found for this material
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.50 0.04 240)" }}
                >
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
                      <PrintProductCard product={product} index={originalIdx} />
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
                "linear-gradient(135deg, oklch(0.10 0.08 250) 0%, oklch(0.16 0.10 235) 100%)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8">
              <div>
                <h3 className="font-display text-xl font-black text-white mb-1">
                  Have a Custom 3D Design?
                </h3>
                <p
                  style={{ color: "oklch(0.65 0.08 230)" }}
                  className="text-sm"
                >
                  Upload your STL file or describe your idea. We'll print it
                  with precision and deliver to your door.
                </p>
              </div>
              <motion.button
                data-ocid="print3d.contact_primary_button"
                onClick={() => navigate({ to: "/contact" })}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.20 230) 0%, oklch(0.45 0.22 240) 100%)",
                  color: "oklch(0.98 0.01 230)",
                  boxShadow: "0 4px 20px -4px oklch(0.45 0.22 235 / 0.5)",
                }}
                whileHover={{
                  scale: 1.04,
                  filter: "brightness(1.10)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageSquare className="w-4 h-4" />
                Send Custom Enquiry
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
