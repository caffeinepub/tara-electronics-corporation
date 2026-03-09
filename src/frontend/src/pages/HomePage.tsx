import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Shield, Star, Wrench } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    id: "consumerElectronics",
    title: "Consumer Electronics",
    description: "TVs, Smartphones, Laptops, Home Appliances & Accessories",
    image: "/assets/generated/category-consumer-electronics.dim_600x400.jpg",
  },
  {
    id: "laserEngraving",
    title: "Laser Engraving",
    description: "Custom Laser Engraving on Metal, Wood, Glass & Acrylic",
    image: "/assets/generated/category-laser-engraving.dim_600x400.jpg",
  },
  {
    id: "threeDPrinting",
    title: "3D Printing",
    description: "Custom 3D Printing Services with Multiple Material Options",
    image: "/assets/generated/category-3d-printing.dim_600x400.jpg",
  },
  {
    id: "customisation",
    title: "Customisation",
    description: "Mobile Skins, Laptop Skins & UV Printing on Various Surfaces",
    image: "/assets/generated/category-customisation.dim_600x400.jpg",
  },
];

const trustBadges = [
  { icon: Award, label: "46 Years in Business", sub: "Est. 1979" },
  { icon: Star, label: "Expert Service", sub: "Trained Technicians" },
  { icon: Shield, label: "Quality Products", sub: "Genuine & Certified" },
  { icon: Wrench, label: "Custom Solutions", sub: "Tailored to You" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        data-ocid="home.hero_section"
        className="relative min-h-[520px] flex items-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1200x500.jpg"
            alt="TARA Electronics"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.12 0.05 255 / 0.92) 0%, oklch(0.15 0.05 255 / 0.75) 60%, oklch(0.15 0.05 255 / 0.3) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{
                background: "oklch(0.78 0.18 65 / 0.2)",
                color: "oklch(0.88 0.14 75)",
              }}
            >
              <span>⚡</span> Trusted Since 1979
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              TARA ELECTRONICS
              <br />
              <span style={{ color: "oklch(0.88 0.14 75)" }}>CORPORATION</span>
            </h1>
            <p className="text-xl font-medium text-white/80 mb-3">
              46 Years of Trust & Innovation
            </p>
            <p className="text-base text-white/60 mb-8 leading-relaxed">
              Your one-stop destination for Consumer Electronics, Laser
              Engraving, 3D Printing, and Custom Skins in Naihati, West Bengal.
            </p>
            <Link
              to="/category/$categoryId"
              params={{ categoryId: "consumerElectronics" }}
            >
              <Button
                size="lg"
                data-ocid="home.explore_button"
                className="font-bold text-base shadow-gold transition-all duration-200 hover:scale-105"
                style={{
                  background: "oklch(0.78 0.18 65)",
                  color: "oklch(0.12 0.04 255)",
                }}
              >
                Explore Our Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8" style={{ background: "oklch(0.22 0.065 255)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 py-3 px-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.78 0.18 65 / 0.15)" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.88 0.14 75)" }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm leading-tight">
                    {label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.78 0.18 65)" }}
                  >
                    {sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        data-ocid="home.categories_section"
        className="py-16 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-black mb-3"
              style={{ color: "oklch(0.15 0.05 255)" }}
            >
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore our wide range of products and custom services. 46 years
              of expertise across four key domains.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={itemVariants}>
                <Link
                  to={
                    cat.id === "consumerElectronics"
                      ? "/electronics"
                      : cat.id === "laserEngraving"
                        ? "/laser-engraving"
                        : cat.id === "threeDPrinting"
                          ? "/3d-printing"
                          : "/customisation"
                  }
                  params={undefined}
                  className="group block"
                >
                  <div className="rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card border border-border">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-display font-bold text-base mb-1"
                        style={{ color: "oklch(0.15 0.05 255)" }}
                      >
                        {cat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-snug mb-3">
                        {cat.description}
                      </p>
                      <div
                        className="flex items-center gap-1 text-sm font-semibold"
                        style={{ color: "oklch(0.22 0.065 255)" }}
                      >
                        Shop Now{" "}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14" style={{ background: "oklch(0.97 0.01 255)" }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display text-2xl sm:text-3xl font-black mb-3"
              style={{ color: "oklch(0.15 0.05 255)" }}
            >
              Visit Us at Naihati
            </h2>
            <p className="text-muted-foreground mb-2">
              73/1, R.B.C Road, Naihati, West Bengal – 743165
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Mon–Sat: 10:00 AM – 8:00 PM
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="font-bold border-2 transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: "oklch(0.22 0.065 255)",
                  color: "oklch(0.22 0.065 255)",
                }}
              >
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
