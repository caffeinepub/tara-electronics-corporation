import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Loader2, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitEnquiry } from "../hooks/useQueries";

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
                        Naihati, West Bengal – 743165
                        <br />
                        India
                      </address>
                    </div>
                  </div>

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
                      <p className="text-sm text-muted-foreground">
                        +91 XXXXX XXXXX
                      </p>
                    </div>
                  </div>

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
                    <div>
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: "oklch(0.15 0.05 255)" }}
                      >
                        Working Hours
                      </div>
                      <div className="text-sm text-muted-foreground space-y-0.5">
                        <div>Monday – Saturday: 10:00 AM – 8:00 PM</div>
                        <div>Sunday: Closed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div
                className="rounded-2xl overflow-hidden border border-border h-52 flex items-center justify-center"
                style={{ background: "oklch(0.94 0.01 255)" }}
              >
                <div className="text-center">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    Naihati, West Bengal
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">
                    73/1, R.B.C Road
                  </p>
                </div>
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
                    className="font-display text-xl font-black mb-5"
                    style={{ color: "oklch(0.15 0.05 255)" }}
                  >
                    Send an Enquiry
                  </h2>
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
