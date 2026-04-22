"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  HiArrowRight, 
  HiSparkles, 
  HiUsers, 
  HiRocketLaunch,
  HiCheckCircle,
  HiAcademicCap,
  HiBriefcase,
  HiShieldCheck,
  HiGlobeAlt,
  HiChartBar,
  HiLightBulb,
  HiCursorArrowRays
} from "react-icons/hi2";

export default function CommunityTools() {
  const [activeTool, setActiveTool] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  const tools = [
    {
      id: 1,
      title: "Submit Opportunity",
      description: "Share job openings, internships, and career opportunities with our growing community",
      href: "/submit",
      icon: HiRocketLaunch,
      gradient: "from-blue-600 to-indigo-600",
      color: "blue",
      features: ["Easy submission", "Reach thousands", "Quality verified"],
      stats: { users: "50K+", opportunities: "10K+", growth: "+25%" }
    },
    {
      id: 2,
      title: "Join Community",
      description: "Connect with professionals, mentors, and industry leaders to accelerate your career growth",
      href: "/join",
      icon: HiUsers,
      gradient: "from-green-600 to-emerald-600",
      color: "green",
      features: ["Professional network", "Mentorship", "Career growth"],
      stats: { users: "100K+", opportunities: "5K+", growth: "+40%" }
    },
    {
      id: 3,
      title: "Browse Resources",
      description: "Access career guides, interview tips, and professional development content",
      href: "/resources",
      icon: HiLightBulb,
      gradient: "from-purple-600 to-pink-600",
      color: "purple",
      features: ["Career guides", "Interview tips", "Skill development"],
      stats: { users: "25K+", opportunities: "1K+", growth: "+15%" }
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('community-tools');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const getToolColor = (color: string) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      green: "bg-green-50 border-green-200 text-green-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="community-tools" className="bg-gradient-to-br from-white via-gray-50 to-blue-50 px-6 py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-600/5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-white/20">
            <HiSparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
            <span className="text-sm font-bold text-gray-800">Community Tools</span>
          </div>

          {/* Enhanced Heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            <span className="text-gray-900">Empower Your Career with</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Powerful Tools
            </span>
          </h2>

          {/* Improved Description */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
            Discover comprehensive resources designed to help you find opportunities, connect with professionals, 
            and accelerate your career growth. Join thousands who have already transformed their professional journey.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            const isHovered = hoveredTool === tool.id;
            
            return (
              <div
                key={tool.id}
                className={`group relative transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                onClick={() => setActiveTool(isActive ? null : tool.id)}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Glass Card */}
                <div className={`relative bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl transition-all duration-300 ${
                  isActive ? 'ring-4 ring-blue-500 ring-opacity-50 transform scale-105' : ''
                } ${isHovered && !isActive ? 'transform -translate-y-2' : ''}`}>
                  
                  {/* Tool Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${tool.gradient} mb-6 transition-all duration-300 ${
                    isActive ? 'animate-pulse' : ''
                  }`}>
                    <Icon className={`h-8 w-8 text-white transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                  </div>

                  {/* Tool Content */}
                  <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                    isActive ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {tool.title}
                  </h3>
                  
                  <p className={`text-gray-600 leading-relaxed mb-6 transition-colors duration-300 ${
                    isActive ? 'text-blue-700' : 'group-hover:text-blue-700'
                  }`}>
                    {tool.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                        <HiCheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Stats */}
                  <div className={`grid grid-cols-3 gap-3 p-4 rounded-2xl ${getToolColor(tool.color)} transition-colors duration-300`}>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{tool.stats.users}</div>
                      <div className="text-xs text-gray-600">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{tool.stats.opportunities}</div>
                      <div className="text-xs text-gray-600">Opportunities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{tool.stats.growth}</div>
                      <div className="text-xs text-gray-600">Growth</div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <Link
                      href={tool.href}
                      className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span>{isActive ? 'Explore Now' : 'Get Started'}</span>
                      <HiArrowRight className={`h-5 w-5 transition-transform duration-300 ${
                        isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
                      }`} />
                    </Link>

                    {/* Progress Indicator */}
                    {isActive && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <HiCursorArrowRays className="h-4 w-4 animate-spin" />
                        <span>Interactive Mode</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                {isHovered && !isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-2xl pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center transition-all duration-700 delay-300 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Join thousands of professionals who have already advanced their careers with our comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/submit"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Submit Your First Opportunity
                <HiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/join"
                className="group px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-1"
              >
                Join Professional Community
                <HiUsers className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
