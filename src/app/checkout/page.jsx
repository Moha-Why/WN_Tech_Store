"use client";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/src/lib/supabaseClient";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const errorVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export default function CheckoutPage() {
  const { cart, clearCart, cartTotal } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const WHATSAPP_NUMBER = "201013121403";

  const message = `
  السلام عليكم.
  
  I want to order:
  ${cart.map(item => (
    `
    • Model: ${item.name}
    • CPU: ${item.cpu}
    • RAM: ${item.ram}
    • Storage: ${item.storage}
    • Price: ${item.price}
    `
  )).join("\n"
  )}
  delivery details:
  • Name: ${name}
  • Phone: ${phone}
  • Address: ${address}
  Please confirm availability.
    `;

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;



  const totalSavings = cart.reduce((savings, item) => {
    if (item.discountPrice && item.price > item.discountPrice) {
      return savings + ((item.price - item.discountPrice) * item.quantity);
    }
    return savings;
  }, 0);

  // const handleSubmit = async () => {
  //   setErrorMessage("");
  //   setIsSubmitting(true);

  //   if (cart.length === 0) {
  //     setErrorMessage("Your cart is empty. Please add at least one product.");
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   if (!name || !address || !phone) {
  //     setErrorMessage("Please fill in all fields.");
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   if (!phone.startsWith("01")) {
  //     setErrorMessage("Phone number must start with 01.");
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   if (phone.length < 11) {
  //     setErrorMessage("Phone number must be at least 11 digits.");
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   try {
  //     const orderItems = cart.map((item) => {
  //       return {
  //       product_id: item.id,
  //       product_quantity: item.quantity
  //     }});

  //     const { error: orderError } = await supabase
  //     .from("orders")
  //     .insert({
  //       name,
  //       phone,
  //       address,
  //       items: orderItems,
  //     });

  //   if (orderError) throw orderError;
  //   console.log(cart)

  //   // const stockUpdates = cart.map(async (item) => {
  //   //   const amount = item.stock - item.quantity 
  //   //   const { error: stockError } = await supabase
  //   //     .from("products")
  //   //     .update({ 
  //   //       stock: amount
  //   //     })
  //   //     .eq("id", Number(item.id));

  //   //   if (stockError) throw stockError;
  //   // });

  //     // await Promise.all(stockUpdates);

  //     clearCart();
  //     router.push("/success");
  //   } catch (error) {
  //     console.error("Error submitting order:", error);
  //     setErrorMessage("Failed to submit order. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <motion.div
      className="min-h-screen bg-[var(--color-bg)] pt-24 pb-16 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-[var(--color-text-primary)] mb-8"
          variants={formVariants}
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={formVariants}>
            <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
                Delivery Information
              </h2>

              <AnimatePresence mode="wait">
                {errorMessage && (
                  <motion.div
                    className="bg-[var(--color-danger)]/10 text-[var(--color-danger)] p-4 rounded-lg mb-6 text-sm flex items-start gap-3"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Delivery Address
                  </label>
                  <motion.textarea
                    placeholder="Enter your complete delivery address"
                    className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all resize-none h-28"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                </div>


                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  // disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? {
                    scale: 1.02,
                    backgroundColor: "var(--color-primary-hover)"
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                        Order via WhatsApp
                    </>
                  )}
                </motion.a>

                <p className="text-xs text-[var(--color-text-muted)] text-center">
                  Your order will be sent to WhatsApp for confirmation and delivery arrangement
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={formVariants}>
            <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b border-[var(--color-border)] last:border-0"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -20 }}
                      layout
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 bg-[var(--color-bg-muted)] rounded-lg overflow-hidden">
                        <Image
                          src={item.productImagePath}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                          onError={(e) => {
                            e.currentTarget.src = '/fallback.png';
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-1">
                          {item.brand}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[var(--color-text-muted)]">
                            Qty: {item.quantity}
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-bold text-[var(--color-text-primary)]">
                              {(item.effectivePrice * item.quantity).toLocaleString()} LE
                            </div>
                            {item.discountPrice && item.discountPrice < item.price && (
                              <div className="text-xs text-[var(--color-text-muted)] line-through">
                                {(item.price * item.quantity).toLocaleString()} LE
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} LE
                  </span>
                </div>

                {totalSavings > 0 && (
                  <motion.div
                    className="flex justify-between text-[var(--color-success)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                      </svg>
                      You Save
                    </span>
                    <span className="font-semibold">
                      -{totalSavings.toLocaleString()} LE
                    </span>
                  </motion.div>
                )}

                <div className="pt-3 border-t border-[var(--color-border)]">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Total
                    </span>
                    <motion.span
                      className="text-2xl font-bold text-[var(--color-primary)]"
                      key={cartTotal}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {cartTotal.toLocaleString()} LE
                    </motion.span>
                  </div>
                </div>
              </div>

              {totalSavings > 0 && (
                <motion.div
                  className="mt-4 p-3 bg-[var(--color-success)]/10 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <p className="text-sm text-[var(--color-success)] text-center font-medium">
                    🎉 You're saving {totalSavings.toLocaleString()} LE on this order!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}