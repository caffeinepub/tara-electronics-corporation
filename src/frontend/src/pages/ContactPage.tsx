import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitEnquiry } from "../hooks/useQueries";

const workingHours = [
  { day: "Monday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Tuesday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Wednesday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Thursday", status: "Closed", hours: null },
  { day: "Friday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Saturday", status: "Open", hours: "10 AM to 8 PM" },
  { day: "Sunday", status: "Open", hours: "10 AM to 8 PM" },
];

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: submitEnquiry, isPending } = useSubmitEnquiry();

  const update = (field: keyof typeof form, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      // Open email client so Tara Electronics receives the enquiry directly
      const name = form.name.trim();
      const phone = form.phone.trim();
      const customerEmail = form.email.trim();
      const message = form.message.trim();
      const subject = encodeURIComponent(
        `New Enquiry from ${name} - Tara Electronics Corporation`,
      );
      const body = encodeURIComponent(
        `You have received a new enquiry from your website.\n\nName   : ${name}\nPhone  : ${phone}\nEmail  : ${customerEmail}\n\nMessage:\n${message}`,
      );
      window.open(
        `mailto:techub.info@gmail.com?subject=${subject}&body=${body}`,
        "_blank",
      );
      setSubmitted(true);
      toast.success("Enquiry submitted! We'll get back to you soon.");
    } catch {
      toast.error("Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12" style={{ background: "oklch(0.18 0.06 255)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white mb-2">
              Contact Us
            </h1>
            <p className="text-white/60">
              We'd love to hear from you. Send us your enquiry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h2
                  className="font-display text-xl font-black mb-4"
                  style={{ color: "oklch(0.15 0.05 255)" }}
                >
                  Visit Our Store
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.22 0.065 255 / 0.1)" }}
                    >
                      <MapPin
                        className="w-5 h-5"
                        style={{ color: "oklch(0.22 0.065 255)" }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: "oklch(0.15 0.05 255)" }}
                      >
                        Address
                      </div>
                      <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                        73/1, R.B.C Road
                        <br />
                        Naihati, West Bengal - 743165
                        <br />
                        India
                      </address>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.55 0.18 145 / 0.12)" }}
                    >
                      <MessageCircle
                        className="w-5 h-5"
                        style={{ color: "oklch(0.5 0.18 145)" }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: "oklch(0.15 0.05 255)" }}
                      >
                        WhatsApp
                      </div>
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
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.22 0.065 255 / 0.1)" }}
                    >
                      <Phone
                        className="w-5 h-5"
                        style={{ color: "oklch(0.22 0.065 255)" }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: "oklch(0.15 0.05 255)" }}
                      >
                        Phone
                      </div>
                      <a
                        href="tel:+919804211992"
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        +91 98042 11992
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.6 0.18 260 / 0.1)" }}
                    >
                      <Mail
                        className="w-5 h-5"
                        style={{ color: "oklch(0.55 0.18 260)" }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: "oklch(0.15 0.05 255)" }}
                      >
                        Email
                      </div>
                      <a
                        href="mailto:techub.info@gmail.com"
                        className="text-sm hover:underline"
                        style={{ color: "oklch(0.55 0.18 260)" }}
                      >
                        techub.info@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Working Hours Calendar */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.22 0.065 255 / 0.1)" }}
                    >
                      <Clock
                        className="w-5 h-5"
                        style={{ color: "oklch(0.22 0.065 255)" }}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className="font-semibold text-sm mb-2"
                        style={{ color: "oklch(0.15 0.05 255)" }}
                      >
                        Working Hours
                      </div>
                      <div className="rounded-xl border border-border overflow-hidden">
                        {workingHours.map(({ day, status, hours }, idx) => {
                          const isToday =
                            new Date().toLocaleDateString("en-US", {
                              weekday: "long",
                            }) === day;
                          const isClosed = status === "Closed";
                          return (
                            <div
                              key={day}
                              className={`grid grid-cols-3 text-xs px-3 py-2 ${
                                idx !== workingHours.length - 1
                                  ? "border-b border-border"
                                  : ""
                              } ${isToday ? "font-bold" : ""}`}
                              style={{
                                background: isToday
                                  ? "oklch(0.22 0.065 255 / 0.07)"
                                  : isClosed
                                    ? "oklch(0.97 0.005 255)"
                                    : "transparent",
                              }}
                            >
                              <span
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-52">
                <iframe
                  title="Tara Electronics Corporation Location"
                  src="https://maps.google.com/maps?q=Tara+Electronics+Corporation+73+RBC+Road+Naihati+West+Bengal+743165&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {submitted ? (
                <div
                  data-ocid="contact.success_state"
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "oklch(0.6 0.18 140 / 0.15)" }}
                  >
                    <CheckCircle
                      className="w-8 h-8"
                      style={{ color: "oklch(0.6 0.18 140)" }}
                    />
                  </div>
                  <h3
                    className="font-display font-bold text-xl mb-2"
                    style={{ color: "oklch(0.15 0.05 255)" }}
                  >
                    Enquiry Submitted!
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. We'll get back to you as soon as
                    possible.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", phone: "", email: "", message: "" });
                    }}
                  >
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
                  <h2
                    className="font-display text-xl font-black mb-1"
                    style={{ color: "oklch(0.15 0.05 255)" }}
                  >
                    Send an Enquiry
                  </h2>
                  <p className="text-xs text-muted-foreground mb-5">
                    Or reach us directly on{" "}
                    <a
                      href="https://wa.me/919804211992"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                      style={{ color: "oklch(0.5 0.18 145)" }}
                    >
                      WhatsApp +91 98042 11992
                    </a>{" "}
                    or{" "}
                    <a
                      href="mailto:techub.info@gmail.com"
                      className="font-semibold hover:underline"
                      style={{ color: "oklch(0.55 0.18 260)" }}
                    >
                      techub.info@gmail.com
                    </a>
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    noValidate
                  >
                    <div>
                      <Label
                        htmlFor="contact-name"
                        className="text-sm font-semibold mb-1.5 block"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.name_input"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="contact-phone"
                        className="text-sm font-semibold mb-1.5 block"
                      >
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-phone"
                        data-ocid="contact.phone_input"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="contact-email"
                        className="text-sm font-semibold mb-1.5 block"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        data-ocid="contact.email_input"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="contact-message"
                        className="text-sm font-semibold mb-1.5 block"
                      >
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="contact-message"
                        data-ocid="contact.message_textarea"
                        placeholder="Describe your requirement or question..."
                        rows={4}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      size="lg"
                      className="w-full font-bold"
                      disabled={isPending}
                      style={{
                        background: "oklch(0.78 0.18 65)",
                        color: "oklch(0.12 0.04 255)",
                      }}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Enquiry"
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
