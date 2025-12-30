"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Simulated cart context - replace with your actual context
// left for demonstration purposes
const useCart = () => {
  const [cart] = useState([1, 2, 3]); // Demo cart with 3 items
  return { cart };
};

const iconVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95
  }
};

const badgeVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  }
};

export default function TechStoreHeader() {
  const { cart } = useCart();
  const cartCount = cart.length;


  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+201070001014", "_blank", "noopener,noreferrer");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-slate-900 border-b-2 border-slate-700 shadow-lg shadow-slate-900/50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {/* Tech-themed logo icon */}
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-sm opacity-50"
                  />
                  <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </motion.div>
                </div>
                
                {/* Store name */}
                <div className="hidden sm:block">
                  <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    WN Store
                  </h1>
                  <p className="text-xs text-slate-400 -mt-1">Tech & Electronics</p>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Icons Section */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Cart Icon with Badge */}
            <Link href="../cart">
              <motion.button
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative p-2.5 md:p-3 bg-slate-800 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-50 group"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-slate-200 group-hover:text-white transition-colors" />
                
                {/* Cart Count Badge */}
                {cartCount > 0 && (
                  <motion.span
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full shadow-lg border-2 border-slate-900"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>
            

            {/* WhatsApp Icon */}
            <motion.button
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleWhatsAppClick}
              className="p-2.5 md:p-3 bg-slate-800 rounded-lg hover:bg-green-600 transition-all duration-50 group relative overflow-hidden"
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
                className="absolute inset-0 bg-green-500 rounded-lg"
              />
              
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-slate-200 group-hover:text-white transition-colors relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}