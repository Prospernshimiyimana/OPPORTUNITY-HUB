"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { HiBriefcase, HiDocumentText, HiUserPlus, HiArrowRight, HiRocketLaunch, HiShieldCheck, HiGlobeAmericas, HiSparkles } from "react-icons/hi2";

export default function Features() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('features-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Discover Opportunities",
      description:
        "Browse curated job openings, internships, and career opportunities from top companies worldwide.",
      link: "/jobs",
      icon: HiBriefcase,
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
      features: ["Remote & On-site", "All Industries", "Career Levels"]
    },
    {
      title: "Share & Connect",
      description:
        "Submit opportunities and join a thriving community of professionals sharing valuable insights.",
      link: "/submit",
      icon: HiDocumentText,
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ubmVjdHxlbnwwfHwwfHx8MA%3D%3D",
      features: ["Easy Submission", "Community Driven", "Quality Verified"]
    },
    {
      title: "Grow Your Network",
      description:
        "Connect with like-minded professionals, mentors, and industry leaders to accelerate your career.",
      link: "/join",
      icon: HiUserPlus,
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
      features: ["Professional Network", "Mentorship", "Career Growth"]
    },
  ];

  const secondaryFeatures = [
    {
      icon: HiRocketLaunch,
      title: "Fast & Efficient",
      description: "Quick application process with real-time updates"
    },
    {
      icon: HiShieldCheck,
      title: "Verified Opportunities",
      description: "All listings are reviewed for authenticity"
    },
    {
      icon: HiGlobeAmericas,
      title: "Global Reach",
      description: "Opportunities from companies worldwide"
    },
    {
      icon: HiSparkles,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your profile"
    }
  ];

  return (
    <section id="features-section" className="relative py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100 to-cyan-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <HiSparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides comprehensive tools and features designed to help you find the perfect opportunity and advance your career.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Image */}
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-20`}></div>
                </div>

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">{feature.description}</p>

                {/* Feature list */}
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={feature.link}
                  className={`inline-flex items-center gap-2 font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent hover:gap-3 transition-all duration-200`}
                >
                  Get Started
                  <HiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Secondary Features */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose OpportunityHub?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best experience for both job seekers and employers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {secondaryFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`text-center transition-all duration-500 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="inline-flex p-3 bg-white rounded-xl shadow-md mb-4 mx-auto">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">Ready to transform your career?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore All Features
              <HiArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200"
            >
              Join Free Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
