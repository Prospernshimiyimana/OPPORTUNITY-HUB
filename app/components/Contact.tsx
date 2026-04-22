"use client";

import { useState } from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    let valid = true;
    const tempErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess("");
    try {
      await new Promise((res) => setTimeout(res, 1500)); // Simulate API call
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSuccess("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 flex flex-col gap-6"
        >
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name && "border-red-500"
              }`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email && "border-red-500"
              }`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              placeholder="Your Message"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.message && "border-red-500"
              }`}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={5}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p
              className={`text-center mt-2 ${
                success.includes("successfully") ? "text-green-500" : "text-red-500"
              }`}
            >
              {success}
            </p>
          )}
        </form>

        {/* Social Links with Icons */}
        <div className="flex justify-center gap-8 mt-8">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 transition-colors text-2xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors text-2xl"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors text-2xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </section>
  );
}