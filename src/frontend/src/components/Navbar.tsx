import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingCart, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

type NavLink =
  | { label: string; to: "/"; params?: undefined; ocid: string }
  | { label: string; to: "/about"; params?: undefined; ocid: string }
  | { label: string; to: "/contact"; params?: undefined; ocid: string }
  | { label: string; to: "/electronics"; params?: undefined; ocid: string }
  | { label: string; to: "/laser-engraving"; params?: undefined; ocid: string }
  | { label: string; to: "/3d-printing"; params?: undefined; ocid: string }
  | { label: string; to: "/customisation"; params?: undefined; ocid: string };

const navLinks: NavLink[] = [
  { label: "Home", to: "/", ocid: "nav.home_link" },
  {
    label: "Consumer Electronics",
    to: "/electronics",
    ocid: "nav.consumer_electronics_link",
  },
  {
    label: "Laser Engraving",
    to: "/laser-engraving",
    ocid: "nav.laser_engraving_link",
  },
  {
    label: "3D Printing",
    to: "/3d-printing",
    ocid: "nav.3d_printing_link",
  },
  {
    label: "Customisation",
    to: "/customisation",
    ocid: "nav.customisation_link",
  },
  { label: "About", to: "/about", ocid: "nav.about_link" },
  { label: "Contact", to: "/contact", ocid: "nav.contact_link" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-md"
      style={{ background: "oklch(0.18 0.06 255)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.78 0.18 65)" }}
            >
              <Zap
                className="w-5 h-5"
                style={{ color: "oklch(0.15 0.05 255)" }}
              />
            </div>
            <div className="leading-tight">
              <div className="font-display font-black text-white text-sm tracking-tight">
                TARA ELECTRONICS
              </div>
              <div
                className="text-xs font-medium tracking-widest"
                style={{ color: "oklch(0.78 0.18 65)" }}
              >
                CORPORATION
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const currentPath = location.pathname;
              const isActive =
                link.to === "/" ? currentPath === "/" : currentPath === link.to;

              return (
                <Link
                  key={link.ocid}
                  to={
                    link.to as
                      | "/"
                      | "/about"
                      | "/contact"
                      | "/electronics"
                      | "/laser-engraving"
                      | "/3d-printing"
                      | "/customisation"
                  }
                  data-ocid={link.ocid}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  style={
                    isActive
                      ? {
                          background: "oklch(0.78 0.18 65 / 0.2)",
                          color: "oklch(0.88 0.14 75)",
                        }
                      : {}
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link to="/cart" data-ocid="nav.cart_button">
              <Button
                variant="outline"
                size="icon"
                className="relative border-white/20 bg-white/10 hover:bg-white/20 text-white hover:text-white"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs font-bold"
                    style={{
                      background: "oklch(0.78 0.18 65)",
                      color: "oklch(0.12 0.04 255)",
                    }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
            style={{ background: "oklch(0.15 0.05 255)" }}
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.ocid}
                  to={
                    link.to as
                      | "/"
                      | "/about"
                      | "/contact"
                      | "/electronics"
                      | "/laser-engraving"
                      | "/3d-printing"
                      | "/customisation"
                  }
                  data-ocid={link.ocid}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
