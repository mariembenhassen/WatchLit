import React, { useState } from "react";
import { contactPageStyles } from "../assets/dummyStyles";
import {
  User,
  Mail,
  Phone,
  Send,
  Trash2,
  CheckCircle,
  AlertCircle,
  MapPin,
  ShoppingCart,
  IndianRupee,
  Headphones,
} from "lucide-react";

// Reusable Input
function InputWithIcon({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  type = "text",
}) {
  return (
    <label className="block">
      <span className={contactPageStyles.inputLabel}>
        {label} {required && <span className={contactPageStyles.requiredStar}>*</span>}
      </span>
      <div className={contactPageStyles.inputContainer}>
        <div className={contactPageStyles.inputIconContainer}>{icon}</div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${contactPageStyles.inputBase} ${
            error ? contactPageStyles.inputError : contactPageStyles.inputNormal
          }`}
        />
      </div>
      {error && (
        <p className={contactPageStyles.errorMessage}>
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </label>
  );
}

// Reusable Select
function SelectWithIcon({
  icon,
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required,
}) {
  return (
    <label className="block">
      <span className={contactPageStyles.inputLabel}>
        {label} {required && <span className={contactPageStyles.requiredStar}>*</span>}
      </span>
      <div className={contactPageStyles.inputContainer}>
        <div className={contactPageStyles.inputIconContainer}>{icon}</div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${contactPageStyles.inputBase} ${
            error ? contactPageStyles.inputError : contactPageStyles.inputNormal
          }`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className={contactPageStyles.errorMessage}>
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </label>
  );
}

// Creative Card
function CreativeCard({ title, subtitle, icon, ctaText, ctaOnClick, accent = "amber" }) {
  const accentBg = accent === "indigo" ? contactPageStyles.accentIndigo : contactPageStyles.accentAmber;
  const buttonClass = accent === "indigo" ? contactPageStyles.buttonIndigo : contactPageStyles.buttonAmber;

  return (
    <div className={`${contactPageStyles.creativeCardBase} ${accentBg}`}>
      <div className="flex items-start gap-4">
        <div className={contactPageStyles.creativeCardIconContainer}>{icon}</div>
        <div className="flex-1">
          <div className={contactPageStyles.creativeCardTitle} style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </div>
          <p className={contactPageStyles.creativeCardSubtitle}>{subtitle}</p>
        </div>
      </div>
      {ctaText && ctaOnClick && (
        <div className="mt-4">
          <button onClick={ctaOnClick} className={`${contactPageStyles.creativeCardButtonBase} ${buttonClass}`}>
            {ctaText}
          </button>
        </div>
      )}
    </div>
  );
}

const ContactPage = () => {
  const WHATSAPP_NUMBER = "918299431275";

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    product: "General Inquiry",
    budget: "",
    contactMethod: "WhatsApp",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  const products = [
    "General Inquiry",
    "Norqain Independence",
    "Zenith Chronomaster",
    "Jacob & Co. Epic X",
    "Bvlgari Octo",
    "H. Moser Endeavour",
  ];

  const showToast = (text, kind = "info", duration = 2200) => {
    setToast({ text, kind });
    setTimeout(() => setToast(null), duration);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.product.trim()) e.product = "Please select interest";
    if (!form.budget.trim()) e.budget = "Budget is required";
    if (!form.contactMethod.trim()) e.contactMethod = "Select contact method";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast("Please complete all required fields", "error");
      return;
    }

    setSending(true);

    const message =
      `Hello! I am *${form.name}*.\n\n` +
      `*Interest:* ${form.product}\n` +
      `*Budget:* ${form.budget}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email}\n` +
      `*Preferred Contact:* ${form.contactMethod}\n\n` +
      `*Message:*\n${form.message}`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

    showToast("Redirecting to WhatsApp...", "success", 1200);

    setTimeout(() => {
      window.open(url, "_blank");
      clearForm();
      setSending(false);
      showToast("Message sent successfully!", "success", 3000);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const clearForm = () => {
    setForm(initialForm);
    setErrors({});
    showToast("Form cleared", "info", 1800);
  };

  return (
    <div className={contactPageStyles.pageContainer}>
      <div className={contactPageStyles.innerContainer}>
        {/* Header */}
        <div className={contactPageStyles.pageHeader}>
          <h1 className={contactPageStyles.pageTitle} style={{ fontFamily: "'Dancing Script', cursive" }}>
            Get in Touch
          </h1>
          <p className={contactPageStyles.pageSubtitle} style={{ fontFamily: "'Playfair Display', serif" }}>
            We'd love to hear from you. Send us a message via WhatsApp.
          </p>
        </div>

        <div className={contactPageStyles.mainGrid}>
          {/* Form - Left */}
          <div className={contactPageStyles.leftColumn}>
            <div className={contactPageStyles.formCard}>
              <form onSubmit={handleSubmit} className={contactPageStyles.form}>
                <div className={contactPageStyles.inputGrid}>
                  <InputWithIcon
                    icon={<User className="w-5 h-5 text-gray-600" />}
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    error={errors.name}
                    required
                  />

                  <InputWithIcon
                    icon={<Mail className="w-5 h-5 text-gray-600" />}
                    label="Email Address"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    error={errors.email}
                    required
                    type="email"
                  />
                </div>

                <div className={contactPageStyles.inputGrid}>
                  <InputWithIcon
                    icon={<Phone className="w-5 h-5 text-gray-600" />}
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+216 12 345 678"
                    error={errors.phone}
                    required
                    type="tel"
                  />

                  <SelectWithIcon
                    icon={<Headphones className="w-5 h-5 text-gray-600" />}
                    label="Preferred Contact"
                    name="contactMethod"
                    value={form.contactMethod}
                    onChange={handleChange}
                    options={["WhatsApp", "Phone Call", "Email"]}
                    error={errors.contactMethod}
                    required
                  />
                </div>

                <SelectWithIcon
                  icon={<ShoppingCart className="w-5 h-5 text-gray-600" />}
                  label="Product of Interest"
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  options={products}
                  error={errors.product}
                  required
                />

                <InputWithIcon
                  icon={<IndianRupee className="w-5 h-5 text-green-600" />}
                  label="Estimated Budget (TND or USD)"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="e.g. 5000 TND / $2,000"
                  error={errors.budget}
                  required
                />

                <div>
                  <label className={contactPageStyles.inputLabel}>
                    Your Message <span className={contactPageStyles.requiredStar}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us more about what you're looking for..."
                    className={`${contactPageStyles.textareaContainer} ${
                      errors.message ? contactPageStyles.inputError : ""
                    }`}
                  />
                  {errors.message && (
                    <p className={contactPageStyles.errorMessage}>
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className={contactPageStyles.buttonsContainer}>
                  <button
                    type="submit"
                    disabled={sending}
                    className={contactPageStyles.submitButton}
                  >
                    <Send className={contactPageStyles.submitIcon} />
                    <span className={contactPageStyles.submitText}>
                      {sending ? "Opening WhatsApp..." : "Send via WhatsApp"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={clearForm}
                    className={contactPageStyles.clearButton}
                  >
                    <Trash2 size={16} />
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className={contactPageStyles.rightColumn}>
            <div className={contactPageStyles.rightColumnGrid}>
              <CreativeCard
                title="Showroom Visit"
                subtitle="Private viewings by appointment only"
                icon={<MapPin className="w-6 h-6 text-black" />}
                ctaText="Book a Visit"
                ctaOnClick={() => {
                  const msg = `Hi, I'd like to book a private showroom visit at your earliest convenience.`;
                }}
                accent="amber"
              />

              {/* You can add more cards here if you want */}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`
            ${contactPageStyles.toastBase}
            ${toast.kind === "error" ? contactPageStyles.toastError : contactPageStyles.toastSuccess}
          `}
        >
          {toast.kind === "error" ? (
            <AlertCircle className={contactPageStyles.toastIcon} />
          ) : (
            <CheckCircle className={contactPageStyles.toastIcon} />
          )}
          {toast.text}
        </div>
      )}

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Playfair+Display:wght@400;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default ContactPage;