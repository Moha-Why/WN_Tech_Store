"use client";

import { motion } from "framer-motion";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Cpu
} from "lucide-react";
import Link from "next/link";


const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.9
  }
};

const linkVariants = {
  hover: {
    x: 5,
    color: "var(--primary)",
    transition: {
      duration: 0.2
    }
  }
};

export default function Footer() {
  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10px", amount: 0.02 }}
      className="bg-slate-900 text-slate-200 border-t border-slate-800"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Branding Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-lg"
              >
                <Cpu className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold  text-white"><span className="text-red-600">N&Y</span> Store</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your premier destination for cutting-edge technology and innovative electronics. Quality products, unbeatable service.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 pt-2">
              <motion.a
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 rounded-lg hover:bg-red-600 transition-colors duration-300"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={20} />
              </motion.a>
              
              <motion.a
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                href="https://www.instagram.com/N&Y_store_eg_2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 rounded-lg hover:bg-red-600 transition-colors duration-300"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={20} />
              </motion.a>
              
              <motion.a
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 rounded-lg hover:bg-red-600 transition-colors duration-300"
                aria-label="Visit our Twitter page"
              >
                <Twitter size={20} />
              </motion.a>
              
              <motion.a
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 rounded-lg hover:bg-red-600 transition-colors duration-300"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Shop", "Products"].map((link) => (
                <motion.li 
                variants={linkVariants}
                whileHover="hover"
                key={link}>
                  <Link
                    href={"/"}
                    className="text-slate-400 hover:text-red-400 transition-colors duration-200 text-sm flex items-center"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <motion.a
                whileHover={{ x: 5 }}
                href="mailto:info@N&Ystore.com"
                className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors duration-200 text-sm group"
              >
                <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors duration-300">
                  <Mail size={16} />
                </div>
                <span>info@N&Ystore.com</span>
              </motion.a>
              
              <motion.a
                whileHover={{ x: 5 }}
                href="tel:+20123456789"
                className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors duration-200 text-sm group"
              >
                <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors duration-300">
                  <Phone size={16} />
                </div>
                <span>+20 123 456 789</span>
              </motion.a>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors duration-200 text-sm group"
              >
                <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors duration-300">
                  <MapPin size={16} />
                </div>
                <span>Alexandria, Egypt</span>
              </motion.div>
            </div>
          </motion.div>


        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        variants={itemVariants}
        className="border-t border-slate-800 bg-slate-950"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              © {new Date().getFullYear()} N&Y Store. All rights reserved.
            </p>
            <p>
              Designed & Developed by{" "}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://tamyaz.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                aria-label="Visit Tamyaz website"
              >
                Mohamed
              </motion.a>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
