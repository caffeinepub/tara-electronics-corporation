import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Home,
  Layers,
  MessageSquare,
  Palette,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Product Data ─────────────────────────────────────────────────────────────

type CategoryFilter = "All" | "Mobile Skins" | "Laptop Skins" | "UV Printing";

interface CustomProduct {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  image: string;
  category: CategoryFilter;
  badge: string;
  highlight: string;
}

const PRODUCTS: CustomProduct[] = [
  {
    id: 1,
    name: "Galaxy Mobile Skin",
    description:
      "Precision-cut vinyl mobile skin with a vibrant abstract galaxy design. Bubble-free application, residue-free removal, fits all major smartphone models.",
    startingPrice: 199,
    image: "/assets/generated/custom-mobile-skin-galaxy.dim_400x400.jpg",
    category: "Mobile Skins",
    badge: "Mobile Skin",
    highlight: "Bestseller",
  },
  {
    id: 2,
    name: "Mandala Mobile Skin",
    description:
      "Elegant gold and teal mandala art printed on premium matte vinyl. Custom-fit for your exact phone model. Rich detail and long-lasting finish.",
    startingPrice: 199,
    image: "/assets/generated/custom-mobile-skin-mandala.dim_400x400.jpg",
    category: "Mobile Skins",
    badge: "Mobile Skin",
    highlight: "Premium Art",
  },
  {
    id: 3,
    name: "Marble Texture Mobile Skin",
    description:
      "Sleek matte black marble texture skin for your smartphone. Adds grip and scratch protection while keeping your phone slim and stylish.",
    startingPrice: 179,
    image: "/assets/generated/custom-mobile-skin-marble.dim_400x400.jpg",
    category: "Mobile Skins",
    badge: "Mobile Skin",
    highlight: "Minimalist",
  },
  {
    id: 4,
    name: "Carbon Fibre Laptop Skin",
    description:
      "Sophisticated matte carbon fiber texture laptop skin. Scratch-resistant, residue-free removal. Cut to fit your exact laptop model — top and bottom covers available.",
    startingPrice: 499,
    image: "/assets/generated/custom-laptop-skin-carbon.dim_400x400.jpg",
    category: "Laptop Skins",
    badge: "Laptop Skin",
    highlight: "Professional",
  },
  {
    id: 5,
    name: "Tropical Floral Laptop Skin",
    description:
      "Bright tropical floral print laptop skin in full color. High-resolution digital print on premium matte vinyl. Easy to apply and remove without residue.",
    startingPrice: 549,
    image: "/assets/generated/custom-laptop-skin-floral.dim_400x400.jpg",
    category: "Laptop Skins",
    badge: "Laptop Skin",
    highlight: "Vibrant",
  },
  {
    id: 6,
    name: "Space Nebula Laptop Skin",
    description:
      'Stunning deep-space nebula and star cluster print on matte vinyl. Available for all laptop sizes from 13" to 17". Custom designs also welcome.',
    startingPrice: 549,
    image: "/assets/generated/custom-laptop-skin-space.dim_400x400.jpg",
    category: "Laptop Skins",
    badge: "Laptop Skin",
    highlight: "Popular",
  },
  {
    id: 7,
    name: "UV Printed Custom Mug",
    description:
      "Full-color UV printed ceramic mug with your photo, artwork, or brand. Dishwasher-safe print, vibrant colors, 300ml capacity. Perfect corporate gift.",
    startingPrice: 299,
    image: "/assets/generated/custom-uv-printed-mug.dim_400x400.jpg",
    category: "UV Printing",
    badge: "UV Print",
    highlight: "Gift Idea",
  },
  {
    id: 8,
    name: "UV Printed T-Shirt",
    description:
      "Bright, photorealistic UV printing on premium cotton T-shirts. Waterproof, crack-resistant ink. Upload your design or artwork for a unique wearable.",
    startingPrice: 449,
    image: "/assets/generated/custom-uv-tshirt-print.dim_400x400.jpg",
    category: "UV Printing",
    badge: "UV Print",
    highlight: "Custom Design",
  },
  {
    id: 9,
    name: "UV Printed Photo Frame",
    description:
      "Custom UV printed wooden photo frame with decorative floral borders and personalized text. Vivid, long-lasting colors. Makes a beautiful keepsake or gift.",
    startingPrice: 399,
    image: "/assets/generated/custom-uv-photo-frame.dim_400x400.jpg",
    category: "UV Printing",
    badge: "UV Print",
    highlight: "Keepsake",
  },
];

const FILTER_CATEGORIES: CategoryFilter[] = [
  "All",
  "Mobile Skins",
  "Laptop Skins",
  "UV Printing",
];

// ─── Product Card ──────────────────────────────────────────────────────────────
function CustomProductCard({
  product,
  index,
}: {
  product: CustomProduct;
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
      data-ocid={`custom.product.item.${index + 1}`}
      className="group relative bg-card rounded-2xl border overflow-hidden flex flex-col"
      style={{
        borderColor: "oklch(0.88 0.04 320)",
        transition: "box-shadow 0.3s ease",
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 48px -8px oklch(0.55 0.18 310 / 0.30)",
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
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.48) 100%)",
            opacity: imageHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, oklch(0.75 0.18 310 / 0.12) 50%, transparent 60%)",
            transform: imageHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.7s ease",
          }}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className="text-xs font-bold px-2.5 py-0.5 rounded-full border-0"
            style={{
              background: "oklch(0.18 0.08 310 / 0.85)",
              color: "oklch(0.85 0.16 320)",
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
              background: "oklch(0.68 0.22 320 / 0.92)",
              color: "oklch(0.98 0.01 320)",
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
            style={{ color: "oklch(0.18 0.06 310)" }}
          >
            {product.name}
          </h3>
          <p
            className="text-sm leading-snug line-clamp-2"
            style={{ color: "oklch(0.42 0.04 310)" }}
          >
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-xs font-medium"
            style={{ color: "oklch(0.52 0.08 315)" }}
          >
            Starting from
          </span>
          <span
            className="font-display text-2xl font-black"
            style={{ color: "oklch(0.22 0.08 310)" }}
          >
            ₹{product.startingPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-1 flex flex-col gap-2">
          {/* ORDER NOW */}
          <motion.button
            data-ocid={`custom.order_now_button.${index + 1}`}
            onClick={handleOrderNow}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.58 0.24 320) 0%, oklch(0.50 0.22 305) 100%)",
              color: "oklch(0.98 0.01 320)",
              boxShadow: "0 4px 16px -4px oklch(0.55 0.22 315 / 0.40)",
            }}
            whileHover={{
              scale: 1.02,
              filter: "brightness(1.10)",
              boxShadow: "0 8px 28px -4px oklch(0.55 0.22 315 / 0.55)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <ShoppingBag className="w-4 h-4" />
            ORDER NOW
          </motion.button>

          {/* CUSTOM ENQUIRY */}
          <motion.button
            data-ocid={`custom.custom_enquiry_button.${index + 1}`}
            onClick={handleCustomEnquiry}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border-2"
            style={{
              background: "transparent",
              color: "oklch(0.48 0.18 315)",
              borderColor: "oklch(0.60 0.18 320 / 0.45)",
            }}
            whileHover={{
              scale: 1.02,
              backgroundColor: "oklch(0.60 0.18 320 / 0.08)",
              borderColor: "oklch(0.55 0.20 320)",
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
export function CustomisationPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const navigate = useNavigate();

  const filteredProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <main>
      {/* ── Hero Banner ── */}
      <section
        data-ocid="custom.hero.section"
        className="relative overflow-hidden py-14 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.08 320) 0%, oklch(0.16 0.10 310) 50%, oklch(0.18 0.09 300) 100%)",
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

        {/* Decorative glow — pink/violet tones */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.65 0.22 320 / 0.12)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "oklch(0.50 0.20 300 / 0.14)",
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
                "linear-gradient(90deg, transparent, oklch(0.78 0.18 320), transparent)",
            }}
          />
          <div
            className="absolute bottom-10 left-0 right-0 h-px opacity-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.78 0.18 320), transparent)",
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
            style={{ color: "oklch(0.60 0.08 315)" }}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
            <span style={{ color: "oklch(0.82 0.16 320)" }}>Customisation</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "oklch(0.62 0.22 320 / 0.18)",
                color: "oklch(0.82 0.16 320)",
              }}
            >
              <Palette className="w-3 h-3" />
              Mobile Skins · Laptop Skins · UV Printing
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-3">
              Custom
              <br />
              <span style={{ color: "oklch(0.82 0.16 320)" }}>
                Customisation
              </span>
            </h1>

            <p
              className="text-lg max-w-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.65 0.05 315)" }}
            >
              Express yourself with premium mobile skins, laptop skins, and
              UV-printed merchandise. Fully custom designs or choose from our
              collection — crafted with care since 1979.
            </p>

            {/* Service icons row */}
            <div className="flex flex-wrap items-center gap-3">
              {(
                [
                  { label: "Mobile Skins", icon: "📱" },
                  { label: "Laptop Skins", icon: "💻" },
                  { label: "UV Printing", icon: "🎨" },
                  { label: "Custom Designs", icon: "✏️" },
                ] as const
              ).map(({ label, icon }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "oklch(0.65 0.18 320 / 0.12)",
                    color: "oklch(0.78 0.14 315)",
                    border: "1px solid oklch(0.65 0.18 320 / 0.22)",
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
      <section className="py-12" style={{ background: "oklch(0.97 0.01 315)" }}>
        <div className="container mx-auto px-4">
          {/* Filter Pills */}
          <div className="flex flex-col gap-5 mb-10">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Layers
                  className="w-4 h-4"
                  style={{ color: "oklch(0.50 0.14 315)" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.35 0.06 310)" }}
                >
                  Filter by Category:
                </span>
              </div>

              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  data-ocid="custom.filter.tab"
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border"
                  style={
                    activeFilter === cat
                      ? {
                          background:
                            "linear-gradient(135deg, oklch(0.58 0.24 320) 0%, oklch(0.50 0.22 305) 100%)",
                          color: "oklch(0.98 0.01 320)",
                          borderColor: "oklch(0.58 0.24 320)",
                          boxShadow:
                            "0 4px 12px -4px oklch(0.55 0.22 315 / 0.45)",
                        }
                      : {
                          background: "transparent",
                          color: "oklch(0.45 0.08 315)",
                          borderColor: "oklch(0.82 0.06 315)",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Result count */}
            <p className="text-sm" style={{ color: "oklch(0.50 0.04 315)" }}>
              Showing{" "}
              <strong style={{ color: "oklch(0.22 0.08 310)" }}>
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
                data-ocid="custom.empty_state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "oklch(0.90 0.06 320)" }}
                >
                  <Palette
                    className="w-8 h-8"
                    style={{ color: "oklch(0.52 0.18 315)" }}
                  />
                </div>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "oklch(0.30 0.06 310)" }}
                >
                  No items found for this category
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.50 0.04 315)" }}
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
                      <CustomProductCard
                        product={product}
                        index={originalIdx}
                      />
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
                "linear-gradient(135deg, oklch(0.12 0.08 320) 0%, oklch(0.18 0.10 305) 100%)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8">
              <div>
                <h3 className="font-display text-xl font-black text-white mb-1">
                  Have a Custom Design in Mind?
                </h3>
                <p
                  style={{ color: "oklch(0.65 0.08 315)" }}
                  className="text-sm"
                >
                  Upload your artwork or describe your idea. We'll create a
                  bespoke skin or print just for you.
                </p>
              </div>
              <motion.button
                data-ocid="custom.contact_primary_button"
                onClick={() => navigate({ to: "/contact" })}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.22 320) 0%, oklch(0.52 0.22 305) 100%)",
                  color: "oklch(0.98 0.01 320)",
                  boxShadow: "0 4px 20px -4px oklch(0.55 0.22 315 / 0.5)",
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
