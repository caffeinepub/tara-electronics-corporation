import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  CheckCircle2,
  Loader2,
  LogIn,
  LogOut,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AccountPage() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor } = useActor();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal =
    principal.length > 20
      ? `${principal.slice(0, 10)}...${principal.slice(-6)}`
      : principal;

  useEffect(() => {
    if (!isLoggedIn || !actor) return;
    setIsLoadingProfile(true);
    actor
      .getCallerUserProfile()
      .then((profile) => {
        if (profile) {
          setName(profile.name);
          setPhone(profile.phone);
          setAddress(profile.address);
        }
      })
      .catch(() => {
        toast.error("Failed to load profile");
      })
      .finally(() => setIsLoadingProfile(false));
  }, [isLoggedIn, actor]);

  async function handleSaveProfile() {
    if (!actor) return;
    setIsSaving(true);
    setProfileSaved(false);
    try {
      await actor.saveCallerUserProfile({ name, phone, address });
      setProfileSaved(true);
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isInitializing) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "oklch(0.78 0.18 65)" }}
        />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-[80vh] flex items-center justify-center px-4"
        style={{ background: "oklch(0.12 0.04 255)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card
            className="border-0 shadow-2xl"
            style={{
              background: "oklch(0.16 0.05 255)",
              boxShadow: "0 25px 80px oklch(0.78 0.18 65 / 0.12)",
            }}
          >
            <CardHeader className="text-center pb-4 pt-10 px-8">
              <div className="flex justify-center mb-6">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-4"
                  style={{ borderColor: "oklch(0.78 0.18 65 / 0.4)" }}
                >
                  <img
                    src="/assets/uploads/TECHUB-CIRCLE-LOGO-1.png"
                    alt="TEC Hub Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <CardTitle
                className="text-2xl font-display font-bold"
                style={{ color: "oklch(0.95 0.03 75)" }}
              >
                Welcome to TEC Hub Account
              </CardTitle>
              <CardDescription
                className="text-sm mt-3 leading-relaxed"
                style={{ color: "oklch(0.65 0.04 255)" }}
              >
                Sign in securely with Internet Identity — no passwords, no data
                leaks. Your identity is cryptographically secure and fully
                decentralised.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-10">
              <div
                className="rounded-xl p-4 mb-6 flex items-start gap-3"
                style={{
                  background: "oklch(0.78 0.18 65 / 0.08)",
                  border: "1px solid oklch(0.78 0.18 65 / 0.2)",
                }}
              >
                <ShieldCheck
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.18 65)" }}
                />
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.72 0.05 75)" }}
                >
                  <strong style={{ color: "oklch(0.88 0.14 75)" }}>
                    One-click security.
                  </strong>{" "}
                  Internet Identity uses your device's biometrics or a security
                  key. No email, no password — just you.
                </div>
              </div>

              <Button
                data-ocid="account.login_button"
                className="w-full h-12 text-base font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "oklch(0.78 0.18 65)",
                  color: "oklch(0.12 0.04 255)",
                }}
                onClick={login}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Connecting...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" /> Sign In / Register
                  </>
                )}
              </Button>

              <p
                className="text-center text-xs mt-4"
                style={{ color: "oklch(0.5 0.03 255)" }}
              >
                New users are registered automatically on first sign-in.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Logged in state
  const displayName = name || "valued customer";
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "TC";

  return (
    <div
      className="min-h-[80vh] py-12 px-4"
      style={{ background: "oklch(0.12 0.04 255)" }}
    >
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Avatar
              className="w-16 h-16 border-2"
              style={{ borderColor: "oklch(0.78 0.18 65 / 0.5)" }}
            >
              <AvatarFallback
                style={{
                  background: "oklch(0.78 0.18 65 / 0.15)",
                  color: "oklch(0.88 0.14 75)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1
                className="text-2xl font-display font-bold"
                style={{ color: "oklch(0.95 0.03 75)" }}
              >
                Welcome back, {displayName}!
              </h1>
              <p
                className="text-sm mt-0.5"
                style={{ color: "oklch(0.65 0.04 255)" }}
              >
                Manage your profile and account settings
              </p>
            </div>
          </div>

          {/* Profile Card */}
          <Card
            className="border-0 shadow-xl mb-6"
            style={{ background: "oklch(0.16 0.05 255)" }}
          >
            <CardHeader className="pb-2">
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: "oklch(0.88 0.14 75)" }}
              >
                <User className="w-5 h-5" />
                My Profile
              </CardTitle>
              <CardDescription style={{ color: "oklch(0.55 0.04 255)" }}>
                Your details are saved securely on the Internet Computer
                blockchain.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-2">
              {isLoadingProfile ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2
                    className="w-6 h-6 animate-spin"
                    style={{ color: "oklch(0.78 0.18 65)" }}
                  />
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <Label style={{ color: "oklch(0.75 0.05 75)" }}>
                      Full Name
                    </Label>
                    <Input
                      data-ocid="account.name_input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="border-white/10 focus:border-amber-400/50"
                      style={{
                        background: "oklch(0.2 0.05 255)",
                        color: "oklch(0.92 0.03 75)",
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label style={{ color: "oklch(0.75 0.05 75)" }}>
                      Phone Number
                    </Label>
                    <Input
                      data-ocid="account.phone_input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="border-white/10 focus:border-amber-400/50"
                      style={{
                        background: "oklch(0.2 0.05 255)",
                        color: "oklch(0.92 0.03 75)",
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label style={{ color: "oklch(0.75 0.05 75)" }}>
                      Delivery Address
                    </Label>
                    <Input
                      data-ocid="account.address_input"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Your delivery address"
                      className="border-white/10 focus:border-amber-400/50"
                      style={{
                        background: "oklch(0.2 0.05 255)",
                        color: "oklch(0.92 0.03 75)",
                      }}
                    />
                  </div>

                  <Button
                    data-ocid="account.save_button"
                    className="w-full h-11 font-semibold rounded-lg mt-2 transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      background: profileSaved
                        ? "oklch(0.58 0.16 145)"
                        : "oklch(0.78 0.18 65)",
                      color: "oklch(0.12 0.04 255)",
                    }}
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Saving...
                      </>
                    ) : profileSaved ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Profile Saved!
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Info Card */}
          <Card
            className="border-0 shadow-xl"
            style={{ background: "oklch(0.16 0.05 255)" }}
          >
            <CardHeader className="pb-2">
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: "oklch(0.88 0.14 75)" }}
              >
                <ShieldCheck className="w-5 h-5" />
                Account Identity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ background: "oklch(0.2 0.05 255)" }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.04 255)" }}
                  >
                    Internet Identity Principal
                  </span>
                  <code
                    className="text-xs font-mono px-2 py-1 rounded"
                    style={{
                      background: "oklch(0.78 0.18 65 / 0.1)",
                      color: "oklch(0.78 0.18 65)",
                    }}
                  >
                    {shortPrincipal}
                  </code>
                </div>

                <Separator style={{ background: "oklch(0.25 0.04 255)" }} />

                <Button
                  data-ocid="account.signout_button"
                  variant="outline"
                  className="w-full h-11 font-semibold rounded-lg border-red-500/30 hover:bg-red-500/10 hover:border-red-400/50 transition-all"
                  style={{ color: "oklch(0.65 0.18 20)" }}
                  onClick={clear}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
