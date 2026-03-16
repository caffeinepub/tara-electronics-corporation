import {
  Award,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const milestones = [
  {
    year: "1979",
    title: "A Dream in Naihati",
    body: "In a modest shop on R.B.C. Road, TARA ELECTRONICS CORPORATION opened its doors. With limited stock but unlimited ambition, it was a bet on the future of a community hungry for technology.",
    image: "/assets/generated/about-founding-era.dim_600x400.jpg",
    imageAlt: "Vintage electronics shop, 1970s",
  },
  {
    year: "The 1990s",
    title: "A Family's Most Trusted Name",
    body: "As television sets and cassette players swept across Bengal, Tara Electronics became the go-to destination for thousands of families. From school teachers to businessmen, everyone knew this address.",
    image: "/assets/generated/about-community.dim_600x400.jpg",
    imageAlt: "Community trust and family",
  },
  {
    year: "2015+",
    title: "The Laser Precision Era",
    body: "Long before it became fashionable, Tara Electronics invested in laser engraving technology — turning plain wood, metal, and glass into stunning personalized gifts, trophies, and nameplates for the entire region.",
    image: "/assets/generated/about-laser-highlight.dim_600x400.jpg",
    imageAlt: "Laser engraving in action",
  },
  {
    year: "Today",
    title: "The Future, Right Here",
    body: "Now equipped with 3D printers, UV printing rigs, and a full customisation studio, Tara Electronics is no longer just a shop — it is a creative and technology powerhouse, still rooted in the same spirit of 1979.",
    image: "/assets/generated/about-3dprint-highlight.dim_600x400.jpg",
    imageAlt: "3D printing technology",
  },
];

const stats = [
  { value: "46", label: "Years in Business" },
  { value: "4", label: "Service Verticals" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "1", label: "Unwavering Address" },
];

const workingHours = [
  { day: "Monday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Tuesday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Wednesday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Thursday", status: "Closed", hours: null },
  { day: "Friday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Saturday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Sunday", status: "Open", hours: "10 AM to 8 PM" },
];

function StarRating({ rating, total }: { rating: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = s <= Math.floor(rating);
        const partial = !filled && s === Math.ceil(rating);
        return (
          <span key={s} className="relative w-3.5 h-3.5">
            <Star className="w-3.5 h-3.5 text-gray-200 fill-gray-200 absolute" />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${(rating % 1) * 100}%` : "100%" }}
              >
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              </span>
            )}
          </span>
        );
      })}
      <span
        className="text-xs font-bold"
        style={{ color: "oklch(0.55 0.15 60)" }}
      >
        {rating}
      </span>
      <span className="text-xs text-muted-foreground">({total}+ reviews)</span>
    </div>
  );
}

export function AboutPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: "oklch(0.13 0.06 255)" }}
      >
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.14 75), transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{
                background: "oklch(0.78 0.18 65 / 0.15)",
                color: "oklch(0.88 0.14 75)",
                border: "1px solid oklch(0.78 0.18 65 / 0.3)",
              }}
            >
              <Award className="w-3.5 h-3.5" /> Est. 1979 &mdash; 46 Years &amp;
              Still Going Strong
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
              Not Just a Shop.
              <br />
              <span style={{ color: "oklch(0.88 0.14 75)" }}>
                A Living Legend of Naihati.
              </span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
              For 46 years, one name has stood firm at 73/1 R.B.C. Road —
              through recessions, revolutions, and the rise of the internet.
              This is the story of TARA ELECTRONICS CORPORATION.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section
        className="py-10 border-b border-border"
        style={{ background: "oklch(0.18 0.055 255)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className="font-display text-3xl sm:text-4xl font-black mb-1"
                  style={{ color: "oklch(0.88 0.14 75)" }}
                >
                  {value}
                </div>
                <div className="text-white/50 text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Story Timeline ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-black mb-3"
              style={{ color: "oklch(0.15 0.05 255)" }}
            >
              Four Decades. One Story.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Every great business has a turning point. Tara Electronics had
              four.
            </p>
          </motion.div>

          <div className="space-y-20">
            {milestones.map(({ year, title, body, image, imageAlt }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{ direction: "ltr" }}
                >
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black"
                    style={{
                      background: "oklch(0.88 0.14 75)",
                      color: "oklch(0.13 0.06 255)",
                    }}
                  >
                    {year}
                  </div>
                </div>

                <div style={{ direction: "ltr" }}>
                  <div
                    className="flex items-center gap-2 mb-3"
                    style={{ color: "oklch(0.6 0.18 35)" }}
                  >
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-widest">
                      {year}
                    </span>
                  </div>
                  <h3
                    className="font-display text-2xl sm:text-3xl font-black mb-4 leading-snug"
                    style={{ color: "oklch(0.15 0.05 255)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      <section className="py-16" style={{ background: "oklch(0.15 0.06 255)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Quote
              className="w-10 h-10 mx-auto mb-5 opacity-40"
              style={{ color: "oklch(0.88 0.14 75)" }}
            />
            <p className="font-display text-xl sm:text-2xl font-bold italic leading-relaxed text-white mb-6">
              &ldquo;Honest pricing, genuine products, expert advice — every
              single day. That is the promise we made in 1979, and it is the
              promise we keep today.&rdquo;
            </p>
            <p
              style={{ color: "oklch(0.78 0.14 75)" }}
              className="text-sm font-semibold"
            >
              — The Tara Electronics Family
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2
              className="font-display text-2xl sm:text-3xl font-black mb-2"
              style={{ color: "oklch(0.15 0.05 255)" }}
            >
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-sm">
              Don&apos;t take our word for it — read real reviews from our
              community.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-xl mx-auto">
            {/* Google Reviews */}
            <motion.a
              href="https://www.google.com/search?q=Tara+Electronics+Corporation+Naihati+reviews"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="about.google_review.button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4 w-full sm:w-auto flex-1 bg-card border border-border rounded-2xl px-6 py-5 shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  fill="none"
                  aria-label="Google"
                >
                  <title>Google</title>
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div
                  className="font-display font-black text-sm"
                  style={{ color: "oklch(0.15 0.05 255)" }}
                >
                  Google Reviews
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  See all reviews
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            {/* Justdial Reviews */}
            <motion.a
              href="https://www.justdial.com/Naihati/Tara-Electronics-Corporation-Opposite-Naihati-Railway-Station-Naihati-Urban/9999P3215-3215-151106173817-T5M6_BZDET"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="about.justdial_review.button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4 w-full sm:w-auto flex-1 bg-card border border-border rounded-2xl px-6 py-5 shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                style={{ background: "oklch(0.55 0.2 35)" }}
              >
                JD
              </div>
              <div className="text-left">
                <div
                  className="font-display font-black text-sm"
                  style={{ color: "oklch(0.15 0.05 255)" }}
                >
                  Justdial Reviews
                </div>
                <StarRating rating={4.3} total={60} />
                <div className="text-xs text-muted-foreground mt-0.5">
                  46 Years in Business
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── Address, Hours & Contact ── */}
      <section className="py-14" style={{ background: "oklch(0.97 0.01 255)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border border-border p-6 shadow-card"
            >
              <h3
                className="font-display font-bold text-base mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.15 0.05 255)" }}
              >
                <MapPin
                  className="w-4 h-4"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                />
                Find Us
              </h3>
              <address className="not-italic text-muted-foreground leading-relaxed text-sm">
                73/1, R.B.C. Road
                <br />
                Naihati, West Bengal &ndash; 743165
                <br />
                India
              </address>
              <a
                href="https://www.google.com/maps/search/Tara+Electronics+Corporation+73+RBC+Road+Naihati+West+Bengal+743165"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="about.directions.button"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "oklch(0.55 0.18 255)" }}
              >
                Get Directions <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-card"
            >
              <h3
                className="font-display font-bold text-base mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.15 0.05 255)" }}
              >
                <Phone
                  className="w-4 h-4"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                />
                Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "oklch(0.5 0.18 145)" }}
                  />
                  <a
                    href="https://wa.me/919804211992"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline"
                    style={{ color: "oklch(0.5 0.18 145)" }}
                  >
                    +91 98042 11992
                  </a>
                </div>
                <div className="text-xs text-muted-foreground pl-6">
                  WhatsApp / Call
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Mail
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "oklch(0.55 0.18 260)" }}
                  />
                  <a
                    href="mailto:techub.info@gmail.com"
                    className="text-sm hover:underline break-all"
                    style={{ color: "oklch(0.55 0.18 260)" }}
                  >
                    techub.info@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Working Hours Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 shadow-card"
            >
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
              <div className="rounded-xl border border-border overflow-hidden">
                {workingHours.map(({ day, status, hours }, idx) => {
                  const isToday = today === day;
                  const isClosed = status === "Closed";
                  return (
                    <div
                      key={day}
                      className={`grid grid-cols-3 text-xs px-3 py-2 ${
                        idx !== workingHours.length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                      style={{
                        background: isToday
                          ? "oklch(0.22 0.065 255 / 0.07)"
                          : isClosed
                            ? "oklch(0.97 0.005 255)"
                            : "transparent",
                      }}
                    >
                      <span
                        className={isToday ? "font-bold" : ""}
                        style={{
                          color: isToday
                            ? "oklch(0.22 0.065 255)"
                            : "oklch(0.3 0.04 255)",
                        }}
                      >
                        {day}
                        {isToday && " ★"}
                      </span>
                      <span
                        className="text-center font-semibold"
                        style={{
                          color: isClosed
                            ? "oklch(0.5 0.18 25)"
                            : "oklch(0.45 0.15 145)",
                        }}
                      >
                        {status}
                      </span>
                      <span
                        className="text-right"
                        style={{ color: "oklch(0.45 0.03 255)" }}
                      >
                        {hours ?? "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
