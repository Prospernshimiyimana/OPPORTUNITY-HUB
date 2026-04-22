"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight, HiStar, HiSparkles, HiChatBubbleLeftRight } from "react-icons/hi2";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Product Manager at TechCorp",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      message: "OpportunityHub completely transformed my job search. I found my dream role within 2 weeks and the quality of opportunities is unmatched. The platform's intuitive design made the entire process seamless.",
      rating: 5,
      company: "TechCorp",
      location: "San Francisco, CA"
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      message: "As a recent graduate, I was overwhelmed by job searching. OpportunityHub curated opportunities that perfectly matched my skills and helped me land my first developer role at an amazing startup.",
      rating: 5,
      company: "StartupXYZ",
      location: "Remote"
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      message: "The community aspect of OpportunityHub is incredible. I've connected with mentors and peers who have helped me grow professionally. It's more than just a job board - it's a career platform.",
      rating: 5,
      company: "DesignHub",
      location: "London, UK"
    },
    {
      name: "David Kim",
      role: "Data Scientist",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      message: "I've tried many job platforms, but OpportunityHub stands out with its quality listings and user-friendly interface. Found my current role through their platform and couldn't be happier!",
      rating: 5,
      company: "DataCo",
      location: "New York, NY"
    },
    {
      name: "Jessica Liu",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      message: "OpportunityHub helped our startup find amazing talent. The quality of candidates we received was exceptional, and we filled all our open positions faster than expected.",
      rating: 5,
      company: "GrowthCo",
      location: "Seattle, WA"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('testimonial-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <HiStar
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonial-section" className="relative py-24 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <HiSparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories from
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Our Community</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from professionals who found their dream opportunities through our platform
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className={`relative transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Testimonial Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-blue-100">
                <HiChatBubbleLeftRight className="h-16 w-16" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>

                {/* Message */}
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center mb-8 font-medium">
                  "{testimonials[currentIndex].message}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-blue-100"
                    />
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 mb-1">
                      {testimonials[currentIndex].role}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 justify-center md:justify-start">
                      <span>{testimonials[currentIndex].company}</span>
                      <span>·</span>
                      <span>{testimonials[currentIndex].location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <HiChevronLeft className="h-6 w-6 text-gray-700" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-blue-600"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Next testimonial"
              >
                <HiChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Additional Testimonials Grid */}
          <div className="mt-20 grid gap-6 md:grid-cols-2">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex gap-1 mb-2">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      "{testimonial.message}"
                    </p>
                    <div>
                      <h5 className="font-semibold text-gray-900">{testimonial.name}</h5>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">Ready to write your own success story?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Your Journey
            </a>
            <a
              href="/jobs"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200"
            >
              Browse Success Stories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}