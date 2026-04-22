"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  HiEnvelope, 
  HiMapPin, 
  HiPhone,
  HiGlobeAlt,
  HiBuildingOffice,
  HiAcademicCap,
  HiBriefcase,
  HiShieldCheck,
  HiArrowRight,
  HiSparkles,
  HiChevronUp,
  HiChevronDown
} from "react-icons/hi2";

export default function Footer() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
        setIsNewsletterOpen(false);
      }, 3000);
    }
  };

  const quickLinks = [
    { name: "Submit Opportunity", href: "/submit", icon: HiBriefcase },
    { name: "Join Community", href: "/join", icon: HiAcademicCap },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "#", icon: "🔗" },
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "GitHub", href: "#", icon: "🐙" },
    { name: "Instagram", href: "#", icon: "📷" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <HiSparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                OpportunityHub
              </h3>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Connecting talented professionals with global opportunities in tech, finance, and careers. Your next big opportunity starts here.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <button
                onClick={() => setIsNewsletterOpen(!isNewsletterOpen)}
                className="w-full flex items-center justify-between text-left mb-4 hover:text-blue-400 transition-colors"
              >
                <span className="text-sm font-medium">Stay Updated</span>
                {isNewsletterOpen ? (
                  <HiChevronUp className="h-4 w-4" />
                ) : (
                  <HiChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {isNewsletterOpen && (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribed ? "Subscribed! ✓" : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                    >
                      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <HiEnvelope className="h-4 w-4 text-blue-400" />
                <a 
                  href="mailto:info@opportunityhub.com" 
                  className="hover:text-white transition-colors duration-200"
                >
                  info@opportunityhub.com
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <HiPhone className="h-4 w-4 text-green-400" />
                <span>+25 079 1351 341</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <HiMapPin className="h-4 w-4 text-purple-400" />
                <span>Kigali, Rwanda</span>
              </div>
              
              
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Connect With Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 border border-white/20"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
            
            <p className="text-gray-400 text-sm mt-4">
              Join our community of 10+ professionals
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-right">
              <p>© 2026 OpportunityHub. All rights reserved.</p>
             
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 group"
          aria-label="Back to top"
        >
          <HiChevronUp className="h-5 w-5 text-white group-hover:translate-y-[-2px] transition-transform" />
        </button>
      </div>
    </footer>
  );
}
