"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Shield, Lock, ArrowLeft } from "lucide-react";
import { Button } from "../common/Button";

export default function UnauthorizedClient() {
   const router = useRouter();
   const containerRef = useRef<HTMLDivElement>(null);
   const shieldRef = useRef<HTMLDivElement>(null);
   const lockRef = useRef<HTMLDivElement>(null);
   const textRef = useRef<HTMLDivElement>(null);
   const buttonRef = useRef<HTMLButtonElement>(null);
   const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
   const particlePositions = useRef<{ left: string }[]>([]);

   useEffect(() => {
      particlePositions.current = [...Array(20)].map(() => ({
         left: `${Math.random() * 100}%`,
      }));
   }, []);

   useEffect(() => {
      const ctx = gsap.context(() => {
         // Initial setup
         gsap.set(
            [
               shieldRef.current,
               lockRef.current,
               textRef.current,
               buttonRef.current,
            ],
            {
               opacity: 0,
               y: 50,
            }
         );

         // Timeline for entrance animations
         const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

         tl.to(shieldRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
         })
            .to(
               lockRef.current,
               {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "back.out(1.7)",
               },
               "-=0.5"
            )
            .to(
               textRef.current,
               {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
               },
               "-=0.4"
            )
            .to(
               buttonRef.current,
               {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
               },
               "-=0.4"
            );

         // Shield pulse animation
         gsap.to(shieldRef.current, {
            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
         });

         // Lock rotation animation
         gsap.to(lockRef.current, {
            rotation: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
         });

         // Particle animations
         particlesRef.current.forEach((particle, index) => {
            if (particle) {
               gsap.to(particle, {
                  y: -100 - Math.random() * 200,
                  x: (Math.random() - 0.5) * 200,
                  opacity: 0,
                  duration: 3 + Math.random() * 2,
                  repeat: -1,
                  delay: index * 0.2,
                  ease: "power1.out",
               });
            }
         });

         // Button hover animation setup
         const button = buttonRef.current;
         if (button) {
            button.addEventListener("mouseenter", () => {
               gsap.to(button, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out",
               });
            });

            button.addEventListener("mouseleave", () => {
               gsap.to(button, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
               });
            });
         }
      }, containerRef);

      return () => ctx.revert();
   }, []);

   const handleLogin = () => {
      gsap.to(containerRef.current, {
         opacity: 0,
         scale: 0.95,
         duration: 0.4,
         onComplete: () => router.push("/login"),
      });
   };

   return (
      <div
         ref={containerRef}
         className="min-h-screen to-slate-900 flex items-center justify-center p-4 overflow-hidden relative"
      >
         {/* Animated particles */}
         {particlePositions.current.length > 0 &&
            particlePositions.current.map((pos, i) => (
               <div
                  key={i}
                  ref={(el) => {
                     particlesRef.current[i] = el;
                  }}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                     left: pos.left,
                     bottom: "0%",
                     opacity: 0.6,
                  }}
               />
            ))}

         {/* Gradient orbs */}
         <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
         <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
         />

         {/* Main content */}
         <div className="relative z-10 max-w-2xl w-full">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
               {/* Icons container */}
               <div className="relative mb-8 flex justify-center items-center">
                  <div ref={shieldRef} className="relative">
                     <Shield
                        className="w-32 h-32 text-purple-400 drop-shadow-2xl"
                        strokeWidth={1.5}
                     />
                  </div>
                  <div ref={lockRef} className="absolute">
                     <Lock
                        className="w-16 h-16 text-red-400 drop-shadow-2xl"
                        strokeWidth={2}
                     />
                  </div>
               </div>

               {/* Text content */}
               <div ref={textRef} className="space-y-4 mb-8">
                  <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                     Access Denied
                  </h1>
                  <div className="h-1 w-24 bg-linear-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
                  <p className="text-xl text-purple-200 mt-6">
                     You don't have permission to access this page
                  </p>
                  <p className="text-sm text-purple-300/80 max-w-md mx-auto">
                     This area is restricted. Please log in with an authorized
                     account or contact your administrator if you believe this
                     is an error.
                  </p>
               </div>

               {/* Button */}
               <Button
                  ref={buttonRef}
                  onClick={handleLogin}
                  className="group relative inline-flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
               >
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" />
                  <span>Back to Login</span>
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </Button>

               {/* Error code */}
               <div className="mt-8 text-purple-400/50 font-mono text-sm">
                  ERROR CODE: 403
               </div>
            </div>
         </div>
      </div>
   );
}
