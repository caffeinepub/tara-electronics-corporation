import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useLocation } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, ShoppingCart, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";

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
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { actor } = useActor();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const [profileName, setProfileName] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !actor) {
      setProfileName(null);
      return;
    }
    actor
      .getCallerUserProfile()
      .then((profile) => {
        if (profile?.name) setProfileName(profile.name);
      })
      .catch(() => {});
  }, [isLoggedIn, actor]);

  const initials = profileName
    ? profileName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "TC";

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-md"
      style={{ background: "oklch(0.18 0.06 255)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/uploads/TECHUB-CIRCLE-LOGO-1.png"
              alt="TEC Hub Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
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

          {/* Auth + Cart + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Auth Button (Desktop) */}
            {!isLoggedIn ? (
              <Button
                data-ocid="nav.login_button"
                size="sm"
                className="hidden sm:flex items-center gap-1.5 font-semibold text-sm rounded-lg h-9 px-4 transition-all hover:scale-[1.03]"
                style={{
                  background: "oklch(0.78 0.18 65)",
                  color: "oklch(0.12 0.04 255)",
                }}
                onClick={login}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-3.5 h-3.5" />
                )}
                {isLoggingIn ? "Signing in..." : "Login"}
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    data-ocid="nav.account_button"
                    variant="ghost"
                    className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg hover:bg-white/10"
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarFallback
                        className="text-xs font-bold"
                        style={{
                          background: "oklch(0.78 0.18 65 / 0.2)",
                          color: "oklch(0.88 0.14 75)",
                        }}
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white/90 max-w-[80px] truncate">
                      {profileName || "Account"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border-white/10"
                  style={{ background: "oklch(0.18 0.06 255)" }}
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/account"
                      data-ocid="nav.account_link"
                      className="flex items-center gap-2 text-white/80 hover:text-white cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    data-ocid="nav.signout_button"
                    className="flex items-center gap-2 cursor-pointer"
                    style={{ color: "oklch(0.65 0.18 20)" }}
                    onClick={clear}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Cart */}
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

            {/* Mobile Menu Toggle */}
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
              <div
                className="h-px my-1"
                style={{ background: "oklch(0.25 0.04 255)" }}
              />
              {!isLoggedIn ? (
                <button
                  type="button"
                  data-ocid="nav.mobile_login_button"
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold text-left flex items-center gap-2 transition-colors"
                  style={{ color: "oklch(0.88 0.14 75)" }}
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  Login / Register
                </button>
              ) : (
                <>
                  <Link
                    to="/account"
                    data-ocid="nav.mobile_account_link"
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    My Account
                  </Link>
                  <button
                    type="button"
                    data-ocid="nav.mobile_signout_button"
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-left flex items-center gap-2 transition-colors hover:bg-white/10"
                    style={{ color: "oklch(0.65 0.18 20)" }}
                    onClick={() => {
                      clear();
                      setMobileOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
