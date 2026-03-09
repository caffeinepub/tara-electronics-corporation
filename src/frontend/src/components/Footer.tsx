import { Link } from "@tanstack/react-router";
import { Clock, Heart, Mail, MapPin, Phone, Zap } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      style={{ background: "oklch(0.13 0.045 255)" }}
      className="text-white/80"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.78 0.18 65)" }}
              >
                <Zap
                  className="w-5 h-5"
                  style={{ color: "oklch(0.15 0.05 255)" }}
                />
              </div>
              <div>
                <div className="font-display font-black text-white text-base tracking-tight">
                  TARA ELECTRONICS
                </div>
                <div
                  className="text-xs tracking-widest font-medium"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                >
                  CORPORATION
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Trusted for 46 years. Your one-stop destination for consumer
              electronics, laser engraving, 3D printing, and customisation
              services.
            </p>
            <div
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "oklch(0.78 0.18 65 / 0.15)",
                color: "oklch(0.88 0.14 75)",
              }}
            >
              <span>⭐</span> Trusted for 46 Years
            </div>
          </div>

          {/* Address & Contact */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                />
                <address className="not-italic text-sm text-white/70 leading-relaxed">
                  73/1, R.B.C Road
                  <br />
                  Naihati, West Bengal
                  <br />
                  743165, India
                </address>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                />
                <a
                  href="https://wa.me/919804211992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  +91 98042 11992 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                />
                <a
                  href="mailto:techub.info@gmail.com"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  techub.info@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                />
                <div className="text-sm text-white/70">
                  <div>Mon – Wed, Fri – Sun: 10 AM – 8 PM</div>
                  <div className="text-white/40">Thursday: Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {(
                [
                  {
                    label: "Consumer Electronics",
                    categoryId: "consumerElectronics",
                  },
                  { label: "Laser Engraving", categoryId: "laserEngraving" },
                  { label: "3D Printing", categoryId: "threeDPrinting" },
                  { label: "Customisation", categoryId: "customisation" },
                ] as const
              ).map((link) => (
                <li key={link.categoryId}>
                  <Link
                    to="/category/$categoryId"
                    params={{ categoryId: link.categoryId }}
                    className="text-sm text-white/60 hover:text-white transition-colors hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/about"
                  className="text-sm text-white/60 hover:text-white transition-colors hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white/60 hover:text-white transition-colors hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {year} TARA ELECTRONICS CORPORATION. All rights reserved.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
