"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
   ArrowRight,
   Zap,
   Target,
   TrendingUp,
   Shield,
   Users,
   BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
   const logoRef = useRef<HTMLDivElement>(null);
   const heroRef = useRef<HTMLDivElement>(null);
   const featuresRef = useRef<HTMLDivElement>(null);
   const statsRef = useRef<HTMLDivElement>(null);
   const ctaRef = useRef<HTMLDivElement>(null);
   const router = useRouter();

   useEffect(() => {
      const ctx = gsap.context(() => {
         const letters =
            logoRef.current?.querySelectorAll(".logo-letter") ?? [];

         gsap.fromTo(
            letters,
            {
               y: -100,
               opacity: 0,
               rotation: -15,
               scale: 0,
            },
            {
               y: 0,
               opacity: 1,
               rotation: 0,
               scale: 1,
               duration: 1.2,
               stagger: 0.15,
               ease: "elastic.out(1, 0.5)",
            }
         );

         // Continuous logo pulse
         gsap.to(".logo-glow", {
            scale: 1.1,
            opacity: 0.8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
         });

         // Hero Content Animation
         gsap.fromTo(
            ".hero-title",
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
         );

         gsap.fromTo(
            ".hero-subtitle",
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
         );

         gsap.fromTo(
            ".hero-description",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power3.out" }
         );

         gsap.fromTo(
            ".hero-cta",
            { scale: 0, opacity: 0 },
            {
               scale: 1,
               opacity: 1,
               duration: 0.8,
               delay: 1.4,
               ease: "back.out(1.7)",
            }
         );

         // Floating animation for hero elements
         gsap.to(".float-element", {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3,
         });

         // Features Animation
         gsap.fromTo(
            ".feature-card",
            {
               y: 100,
               opacity: 0,
               scale: 0.8,
            },
            {
               y: 0,
               opacity: 1,
               scale: 1,
               duration: 0.8,
               stagger: 0.2,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: featuresRef.current,
                  start: "top 80%",
               },
            }
         );

         // Stats Animation
         gsap.fromTo(
            ".stat-item",
            { scale: 0, opacity: 0 },
            {
               scale: 1,
               opacity: 1,
               duration: 0.6,
               stagger: 0.15,
               ease: "back.out(1.7)",
               scrollTrigger: {
                  trigger: statsRef.current,
                  start: "top 75%",
               },
            }
         );

         // CTA Section Animation
         gsap.fromTo(
            ctaRef.current,
            { y: 50, opacity: 0 },
            {
               y: 0,
               opacity: 1,
               duration: 1,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: ctaRef.current,
                  start: "top 80%",
               },
            }
         );
      });

      return () => ctx.revert();
   }, []);

   const handleLoginClick = () => {
      router.push("/login");
   };

   return (
      <div className="min-h-screen bg-linear-to-br from-[#0A224A] via-[#0A224A]/90 to-[#0A224A] text-white overflow-hidden">
         {/* Animated Background */}
         <div className="fixed inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div
               className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse"
               style={{ animationDelay: "1s" }}
            ></div>
         </div>

         {/* Hero Section */}
         <div
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
         >
            {/* Logo */}
            <div ref={logoRef} className="relative mb-12">
               <div className="logo-glow absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-400 rounded-full filter blur-2xl"></div>
               <div className="relative flex items-center gap-2 text-8xl font-bold">
                  <span className="logo-letter inline-block bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                     J
                  </span>
                  <span className="logo-letter inline-block bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                     A
                  </span>
                  <span className="logo-letter inline-block bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                     G
                  </span>
               </div>
            </div>

            {/* Hero Content */}
            <div className="text-center max-w-4xl z-10">
               <h1 className="hero-title text-6xl md:text-7xl font-bold mb-4 bg-linear-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                  Your Advertising Bridge
               </h1>
               <p className="hero-subtitle text-2xl md:text-3xl mb-6 text-[#E1EAF7]">
                  Connecting Brands with Publishers Seamlessly
               </p>
               <p className="hero-description text-lg md:text-xl text-[#E1EAF7]/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                  JAG is the intelligent mediator platform that streamlines
                  advertising workflows. We collect campaign details from
                  clients and seamlessly deliver them to the right publishers,
                  making ad placement effortless and efficient.
               </p>
               <button
                  onClick={handleLoginClick}
                  className="hero-cta group relative px-10 py-5 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
               >
                  <span className="relative z-10 flex items-center gap-3">
                     Login Now
                     <ArrowRight
                        className="group-hover:translate-x-2 transition-transform duration-300"
                        size={24}
                     />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               </button>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-1/4 left-10 float-element opacity-20">
               <Zap size={80} className="text-blue-400" />
            </div>
            <div
               className="absolute top-1/3 right-10 float-element opacity-20"
               style={{ animationDelay: "0.5s" }}
            >
               <Target size={80} className="text-indigo-400" />
            </div>
            <div
               className="absolute bottom-1/4 left-1/4 float-element opacity-20"
               style={{ animationDelay: "1s" }}
            >
               <TrendingUp size={80} className="text-purple-400" />
            </div>
         </div>

         {/* Features Section */}
         <div ref={featuresRef} className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto">
               <h2 className="text-5xl font-bold text-center mb-16 bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Why Choose JAG?
               </h2>
               <div className="grid md:grid-cols-3 gap-8">
                  <div className="feature-card p-8 rounded-2xl bg-linear-to-br from-[#0B224B]/25 to-[#1A50B1]/25 backdrop-blur-sm border border-[#E1EAF7]/10 hover:border-[#E1EAF7]/30 transition-all duration-300 hover:scale-105">
                     <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                        <Shield size={32} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-[#E1EAF7]">
                        Secure & Reliable
                     </h3>
                     <p className="text-[#E1EAF7]/70 leading-relaxed">
                        Enterprise-grade security ensures your advertising data
                        remains protected throughout the entire campaign
                        lifecycle.
                     </p>
                  </div>

                  <div className="feature-card p-8 rounded-2xl bg-linear-to-r from-[#0B224B]/25 to-[#1A50B1]/25 backdrop-blur-sm border border-[#E1EAF7]/10 hover:border-[#E1EAF7]/30 transition-all duration-300 hover:scale-105">
                     <div className="w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                        <Users size={32} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-[#E1EAF7]">
                        Seamless Collaboration
                     </h3>
                     <p className="text-[#E1EAF7]/70 leading-relaxed">
                        Bridge the gap between clients and publishers with our
                        intuitive platform designed for effortless
                        communication.
                     </p>
                  </div>

                  <div className="feature-card p-8 rounded-2xl bg-linear-to-r from-[#0B224B]/25 to-[#1A50B1]/25 backdrop-blur-sm border border-[#E1EAF7]/10 hover:border-[#E1EAF7]/30 transition-all duration-300 hover:scale-105">
                     <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                        <BarChart3 size={32} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-[#E1EAF7]">
                        Real-Time Analytics
                     </h3>
                     <p className="text-[#E1EAF7]/70 leading-relaxed">
                        Track campaign performance and gain actionable insights
                        with comprehensive analytics and reporting tools.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Stats Section */}
         <div
            ref={statsRef}
            className="relative py-24 px-6 bg-linear-to-r from-[#0B224B]/30 to-[#1A50B1]/30"
         >
            <div className="max-w-6xl mx-auto">
               <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div className="stat-item">
                     <div className="text-5xl font-bold mb-2 bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        500+
                     </div>
                     <div className="text-[#E1EAF7]/70">Active Clients</div>
                  </div>
                  <div className="stat-item">
                     <div className="text-5xl font-bold mb-2 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        1000+
                     </div>
                     <div className="text-[#E1EAF7]/70">Publishers</div>
                  </div>
                  <div className="stat-item">
                     <div className="text-5xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        10K+
                     </div>
                     <div className="text-[#E1EAF7]/70">Campaigns Managed</div>
                  </div>
                  <div className="stat-item">
                     <div className="text-5xl font-bold mb-2 bg-linear-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                        99.9%
                     </div>
                     <div className="text-[#E1EAF7]/70">Uptime</div>
                  </div>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div ref={ctaRef} className="relative py-32 px-6">
            <div className="max-w-4xl mx-auto text-center">
               <h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                  Ready to Transform Your Advertising Workflow?
               </h2>
               <p className="text-xl text-[#E1EAF7]/80 mb-10">
                  Join hundreds of brands and publishers who trust JAG to
                  streamline their advertising operations.
               </p>
               <button
                  onClick={handleLoginClick}
                  className="group px-12 py-6 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
               >
                  <span className="flex items-center gap-3">
                     Get Started Now
                     <ArrowRight
                        className="group-hover:translate-x-2 transition-transform duration-300"
                        size={24}
                     />
                  </span>
               </button>
            </div>
         </div>

         {/* Footer */}
         <footer className="relative py-8 px-6 border-t border-[#E1EAF7]/10">
            <div className="max-w-7xl mx-auto text-center text-[#E1EAF7]/60">
               <p>
                  &copy; 2024 JAG. All rights reserved. | Bridging Brands &
                  Publishers
               </p>
            </div>
         </footer>
      </div>
   );
};

export default Landing;
