"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

// Mock context for demo - replace with your actual context
const useMyContext = () => {
  const [cart] = useState([1, 2, 3]);
  return { cart };
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-red-900/95 text-red-50 border-t backdrop-blur-md shadow-lg shadow-red-800/50 "
            : "bg-red-950/30 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            >
              <Link href="/" aria-label="N&Y Store Home">
                <div className="flex items-center flex-wrap">
                  
                  {/* Logo image */}
                  <div className="relative w-12 h-11 md:w-14 md:h-14">
                    <img
                      src="/N&Y_PhotoGrid.png"
                      alt="N&Y Store Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Store name */}
                  <div className="hidden -mt-4 sm:block w-full">
                    <p className="text-xs text-slate-400 -mt-1">Tech & Electronics</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Icons Section */}
            <div className="flex items-center gap-3 sm:gap-5">
              
              {/* Cart Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href="/cart"
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all duration-200 ${
                    scrolled 
                      ? "bg-red-800 hover:bg-red-700" 
                      : "bg-red-900/70 hover:bg-red-800/80"
                  }`}
                  aria-label={`Shopping cart with ${cartCount} items`}
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20
                      }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full shadow-lg border-2 border-slate-900"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* WhatsApp Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="https://wa.me/+201211661802"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all duration-200 relative overflow-hidden ${
                    scrolled 
                      ? "bg-red-800 hover:bg-red-700" 
                      : "bg-red-900/70 hover:bg-red-800/80"
                  }`}
                  aria-label="Contact us on WhatsApp"
                >
                  {/* Animated background pulse */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-red-500/30 rounded-lg"
                  />
                  
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>


      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ backgroundImage: "url('/bg.jpg')" }}
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            Premium Tech Store
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl"
          >
            Discover the latest most powerful laptops
          </motion.p>
        </motion.div>
      </motion.section>
    </>
  );
}