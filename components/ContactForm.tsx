"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import ShinyText from "./reactbits/ShinyText";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "$5k - $10k",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const budgets = ["<$5k", "$5k - $10k", "$10k - $25k", "$25k+"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetSelect = (budget: string) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        budget: "$5k - $10k",
        message: "",
      });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      {/* Glow highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #6D5EF8 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left panel: Info */}
          <div className="lg:col-span-2 flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-4">
              <span className="self-start text-xs font-semibold uppercase tracking-widest text-[#6D5EF8] px-3 py-1 rounded-full bg-[#6D5EF8]/10 border border-[#6D5EF8]/20">
                Contact Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                Let&apos;s build something <span className="text-[#6D5EF8]">extraordinary</span>.
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400 mt-2">
                Have an idea, project, or want to partner with us? Fill out the form or drop us an email directly.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/5 pt-6 mt-6 lg:mt-0">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Direct Contact</span>
              <a
                href="mailto:chef@designpav.in"
                className="text-lg font-bold text-white hover:text-[#6D5EF8] transition-colors"
              >
                chef@designpav.in
              </a>
              <span className="text-xs text-zinc-600">Response time: &lt; 24 Hours</span>
            </div>
          </div>

          {/* Right panel: Form Card */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-md p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-12 gap-5"
                  >
                    <CheckCircle2 size={56} className="text-[#c1ef18] filter drop-shadow-[0_0_12px_rgba(193,239,24,0.3)]" />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight">Inquiry Received!</h3>
                      <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                        Thank you for reaching out. We have received your project details and will contact you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Error Alerts */}
                    {status === "error" && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs">
                        <AlertCircle size={16} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Name input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name-input" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Full Name <span className="text-[#6D5EF8]">*</span>
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#6D5EF8] focus:bg-zinc-900/50 transition-all duration-200"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email-input" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Email Address <span className="text-[#6D5EF8]">*</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#6D5EF8] focus:bg-zinc-900/50 transition-all duration-200"
                      />
                    </div>

                    {/* Budget selector */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Estimated Budget
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {budgets.map((budget) => {
                          const isSelected = formData.budget === budget;
                          return (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => handleBudgetSelect(budget)}
                              className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                                isSelected
                                  ? "border-[#6D5EF8] bg-[#6D5EF8]/10 text-white"
                                  : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              {budget}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message-input" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Project Details <span className="text-[#6D5EF8]">*</span>
                      </label>
                      <textarea
                        id="message-input"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, goals, and visual ideas..."
                        className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#6D5EF8] focus:bg-zinc-900/50 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white tracking-wide transition-all duration-200 bg-gradient-to-r from-[#6D5EF8] to-[#8A7CFF] disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(109,94,248,0.4)]"
                      >
                        {status === "submitting" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Inquiry...
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
