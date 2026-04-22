"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { 
  HiArrowRight, 
  HiSparkles, 
  HiGlobeAlt, 
  HiUsers, 
  HiCheckCircle, 
  HiStar,
  HiPlay,
  HiShieldCheck,
  HiRocketLaunch,
  HiAcademicCap
} from "react-icons/hi2";

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Features for auto-rotating highlights
  const features = [
    { icon: HiRocketLaunch, text: "Fast Applications", color: "text-blue-600" },
    { icon: HiShieldCheck, text: "Verified Companies", color: "text-green-600" },
    { icon: HiAcademicCap, text: "Career Growth", color: "text-purple-600" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate features
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, features.length]);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        
        {/* LEFT SIDE - Enhanced Content */}
        <div className={`space-y-8 transition-all duration-700 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full shadow-lg">
            <HiSparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ professionals</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="text-gray-900">Discover</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Next Opportunity
            </span>
          </h1>

          {/* Enhanced Description */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Connect with global opportunities in tech, careers, and finance. 
            Join thousands of professionals advancing their careers through our curated platform.
          </p>

          {/* Interactive Feature Showcase */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">Platform Highlights</span>
              <div className="flex gap-1">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === activeFeature ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg bg-white/80 ${features[activeFeature].color}`}>
                {(() => {
                  const IconComponent = features[activeFeature].icon;
                  return <IconComponent className="h-6 w-6" />;
                })()}
              </div>
              <span className="text-lg font-medium text-gray-900">{features[activeFeature].text}</span>
            </div>
          </div>

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg">
              <HiGlobeAlt className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">50+ Countries</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg">
              <HiUsers className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">10,000+ Users</span>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/jobs" className="group">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                Explore Opportunities
                <HiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link href="/submit" className="group">
              <button className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200 hover:bg-white">
                Post Opportunity
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Join professionals from leading companies</p>
            <div className="flex flex-wrap gap-6 opacity-60">
              {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map((company) => (
                <span key={company} className="text-sm font-semibold text-gray-600">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Enhanced Visual */}
        <div className={`relative transition-all duration-700 delay-200 ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          
          {/* Main image grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Primary Image */}
            <div className="col-span-2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl transform rotate-1"></div>
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop"
                alt="team collaborating"
                width={800}
                height={400}
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
              
              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg p-3 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Opportunities</span>
                </div>
              </div>
            </div>

            {/* Secondary Images */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl transform -rotate-2"></div>
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                alt="professional working"
                width={400}
                height={300}
                className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
              />
              
              {/* Stats overlay */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-xs font-semibold">Verified Companies</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl transform rotate-2"></div>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
                alt="professional portrait"
                width={400}
                height={300}
                className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
              />
              
              {/* Rating overlay */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center gap-1">
                  <HiStar className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold">4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom floating card */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 animate-float-delay">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-xs text-gray-600">Active Jobs Daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
