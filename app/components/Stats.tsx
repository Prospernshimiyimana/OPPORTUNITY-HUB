"use client";

import { useEffect, useState } from "react";
import { HiBriefcase, HiBuildingOffice, HiUserGroup, HiGlobeAlt } from "react-icons/hi2";

interface StatItem {
  title: string;
  value: number;
  suffix?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const statsData: StatItem[] = [
  { 
    title: "Active Jobs", 
    value: 500, 
    suffix: "+", 
    description: "New opportunities daily",
    icon: HiBriefcase,
    gradient: "from-blue-500 to-indigo-600"
  },
  { 
    title: "Companies", 
    value: 100, 
    suffix: "+", 
    description: "Top employers",
    icon: HiBuildingOffice,
    gradient: "from-green-500 to-emerald-600"
  },
  { 
    title: "Professionals", 
    value: 10000, 
    suffix: "+", 
    description: "Career seekers",
    icon: HiUserGroup,
    gradient: "from-purple-500 to-pink-600"
  },
  { 
    title: "Countries", 
    value: 50, 
    suffix: "+", 
    description: "Global reach",
    icon: HiGlobeAlt,
    gradient: "from-orange-500 to-red-600"
  },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function Stats() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="stats-section" className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join a growing community of professionals and companies finding their perfect match
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-6`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Counter */}
                  <div className="mb-2">
                    <h3 className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </h3>
                  </div>

                  {/* Title and Description */}
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{stat.title}</h4>
                  <p className="text-sm text-gray-600">{stat.description}</p>

                  {/* Hover effect indicator */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                       style={{ backgroundImage: `linear-gradient(to right, ${stat.gradient.split(' ')[0].replace('from-', '')}, ${stat.gradient.split(' ')[1].replace('to-', '')})` }}>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Ready to join the community?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/join" 
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started Today
            </a>
            <a 
              href="/submit" 
              className="inline-flex items-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200"
            >
              Post a Job
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}