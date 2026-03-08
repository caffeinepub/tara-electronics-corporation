import {
  Award,
  Clock,
  Cpu,
  Layers,
  MapPin,
  Palette,
  Printer,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Cpu,
    title: "Consumer Electronics",
    description:
      "From the latest smartphones and smart TVs to laptops and home appliances — we stock genuine products from top brands at competitive prices.",
    color: "oklch(0.55 0.15 255)",
  },
  {
    icon: Layers,
    title: "Laser Engraving",
    description:
      "Custom laser engraving on metal, wood, glass, and acrylic. Perfect for trophies, corporate gifts, nameplates, and personalized keepsakes.",
    color: "oklch(0.55 0.18 35)",
  },
  {
    icon: Printer,
    title: "3D Printing",
    description:
      "Bring your ideas to life with our professional 3D printing services. Multiple material options available — PLA, ABS, PETG, and more.",
    color: "oklch(0.5 0.18 180)",
  },
  {
    icon: Palette,
    title: "Customisation",
    description:
      "Mobile skins, laptop skins, UV printing on various surfaces. Express your personality or brand with our high-quality customisation services.",
    color: "oklch(0.55 0.2 310)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16" style={{ background: "oklch(0.18 0.06 255)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{
                background: "oklch(0.78 0.18 65 / 0.2)",
                color: "oklch(0.88 0.14 75)",
              }}
            >
              <Award className="w-3.5 h-3.5" /> Established 1979
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              About TARA ELECTRONICS
              <br />
              <span style={{ color: "oklch(0.88 0.14 75)" }}>CORPORATION</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Serving Naihati and West Bengal with integrity, expertise, and
              innovation for over four decades.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="font-display text-2xl sm:text-3xl font-black mb-5"
                style={{ color: "oklch(0.15 0.05 255)" }}
              >
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">
                    TARA ELECTRONICS CORPORATION
                  </strong>{" "}
                  was founded in 1979 with a simple mission: to provide quality
                  electronics and services to the people of Naihati and the
                  surrounding region of West Bengal.
                </p>
                <p>
                  Over the past{" "}
                  <strong className="text-foreground">46 years</strong>, we have
                  grown from a small electronics shop into a comprehensive
                  technology hub. Thousands of families and businesses in
                  Naihati have trusted us for their electronics needs across
                  generations.
                </p>
                <p>
                  Today, we go beyond traditional electronics retail. We offer
                  cutting-edge services like{" "}
                  <strong className="text-foreground">laser engraving</strong>,{" "}
                  <strong className="text-foreground">3D printing</strong>, and{" "}
                  <strong className="text-foreground">
                    custom device skins
                  </strong>{" "}
                  — bringing professional-grade customisation capabilities to
                  our community.
                </p>
                <p>
                  Our commitment remains the same: honest pricing, genuine
                  products, expert advice, and friendly service — every single
                  day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              {/* Address Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
                <h3
                  className="font-display font-bold text-base mb-4 flex items-center gap-2"
                  style={{ color: "oklch(0.15 0.05 255)" }}
                >
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "oklch(0.78 0.18 65)" }}
                  />
                  Our Address
                </h3>
                <address className="not-italic text-muted-foreground leading-relaxed">
                  73/1, R.B.C Road
                  <br />
                  Naihati, West Bengal – 743165
                  <br />
                  India
                </address>
              </div>

              {/* Hours Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
                <h3
                  className="font-display font-bold text-base mb-4 flex items-center gap-2"
                  style={{ color: "oklch(0.15 0.05 255)" }}
                >
                  <Clock
                    className="w-4 h-4"
                    style={{ color: "oklch(0.78 0.18 65)" }}
                  />
                  Working Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monday – Saturday
                    </span>
                    <span className="font-semibold">10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-semibold text-muted-foreground">
                      Closed
                    </span>
                  </div>
                </div>
              </div>

              {/* 46 Years Badge */}
              <div
                className="rounded-2xl p-6 text-white"
                style={{ background: "oklch(0.22 0.065 255)" }}
              >
                <div
                  className="text-5xl font-black font-display mb-1"
                  style={{ color: "oklch(0.88 0.14 75)" }}
                >
                  46
                </div>
                <div className="text-lg font-bold mb-1">
                  Years of Excellence
                </div>
                <div className="text-white/60 text-sm">
                  Trusted by thousands of customers in Naihati and across West
                  Bengal since 1979.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      <section className="py-14" style={{ background: "oklch(0.97 0.01 255)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display text-2xl sm:text-3xl font-black mb-3"
              style={{ color: "oklch(0.15 0.05 255)" }}
            >
              Our Four Service Pillars
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We offer a comprehensive range of technology products and custom
              services to meet all your needs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map(({ icon: Icon, title, description, color }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3
                  className="font-display font-bold text-base mb-2"
                  style={{ color: "oklch(0.15 0.05 255)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
