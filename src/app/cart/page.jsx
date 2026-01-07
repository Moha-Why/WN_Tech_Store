"use client";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const totalVariants = {
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

const getStockStatus = (stock) => {
  if (stock === 0) return { label: "Out of Stock", color: "text-[var(--color-danger)]", bg: "bg-[var(--color-danger)]/10" };
  if (stock <= 5) return { label: `Low Stock (${stock})`, color: "text-[var(--color-warning)]", bg: "bg-[var(--color-warning)]/10" };
  return { label: "In Stock", color: "text-[var(--color-success)]", bg: "bg-[var(--color-success)]/10" };
};

export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    cartTotal, 
    cartCount 
  } = useCart();
  
  const router = useRouter();

  const totalSavings = cart.reduce((savings, item) => {
    if (item.discountPrice && item.price > item.discountPrice) {
      return savings + ((item.price - item.discountPrice) * item.quantity);
    }
    return savings;
  }, 0);

  return (
    <motion.div 
      className="min-h-screen bg-[var(--color-bg)] pt-24 pb-16 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex items-baseline justify-between mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Shopping Cart
          </h1>
          <span className="text-lg text-[var(--color-text-secondary)]">
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
          </span>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-20 bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)]"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-[var(--color-bg-muted)] flex items-center justify-center">
              <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Add some tech to get started
            </p>
            <motion.button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg font-medium"
              whileHover={{ scale: 1.02, backgroundColor: "var(--color-primary-hover)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Browse Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => {
                  const stockStatus = getStockStatus(item.stock);
                  const hasDiscount = item.discountPrice && item.discountPrice < item.price;
                  const isDisabled = !item.isAvailable || item.stock === 0;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mb-4 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] overflow-hidden"
                      whileHover={{ 
                        y: -2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5">
                        <div className="relative w-full sm:w-32 h-60 sm:h-32 flex-shrink-0 bg-[var(--color-bg-muted)] rounded-lg overflow-hidden">
                          <Image
                            src={item.productImagePath}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 128px"
                            onError={(e) => {
                              e.currentTarget.src = '/fallback.png';
                            }}
                          />
                          {hasDiscount && (
                            <div className="absolute top-2 right-2 px-2 py-1 bg-[var(--color-danger)] text-white text-xs font-bold rounded">
                              {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                            </div>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                              <div className="flex-1">
                                <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)] font-medium">
                                  {item.brand}
                                </p>
                              </div>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color} w-fit`}>
                                {stockStatus.label}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-[var(--color-text-secondary)] mb-3">
                              {item.cpu && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                  </svg>
                                  {item.cpu}
                                </span>
                              )}
                              {item.ram && <span>{item.ram} RAM</span>}
                              {item.storage && <span>{item.storage}</span>}
                              {item.screenSize && <span>{item.screenSize}"</span>}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-baseline gap-2">
                              <motion.span 
                                className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]"
                                key={item.effectivePrice}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                {item.effectivePrice.toLocaleString()} LE
                              </motion.span>
                              {hasDiscount && (
                                <span className="text-sm text-[var(--color-text-muted)] line-through">
                                  {item.price.toLocaleString()} LE
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3">
                              <div className="flex items-center gap-2 bg-[var(--color-bg-muted)] rounded-lg p-1">
                                <motion.button
                                  onClick={() => decreaseQuantity(item.id)}
                                  // disabled={isDisabled}
                                  className="w-8 h-8 flex items-center justify-center text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed rounded-md hover:bg-[var(--color-border)] transition-colors"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </motion.button>
                                
                                <motion.span 
                                  className="w-8 text-center font-semibold text-[var(--color-text-primary)]"
                                  key={item.quantity}
                                  initial={{ scale: 1.2, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {item.quantity}
                                </motion.span>
                                
                                <motion.button
                                  onClick={() => increaseQuantity(item.id)}
                                  disabled={item.quantity >= item.stock}
                                  className="w-8 h-8 flex items-center justify-center text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed rounded-md hover:bg-[var(--color-border)] transition-colors"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </motion.button>
                              </div>

                              <motion.button
                                onClick={() => removeFromCart(item.id)}
                                className="w-9 h-9 flex items-center justify-center text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </motion.button>
                            </div>
                          </div>

                          <motion.div 
                            className="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-between items-center"
                            key={`subtotal-${item.id}-${item.quantity}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="text-sm text-[var(--color-text-secondary)]">Subtotal:</span>
                            <span className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
                              {(item.effectivePrice * item.quantity).toLocaleString()} LE
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <motion.div 
                className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 sticky top-24"
                variants={totalVariants}
              >
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
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
                      <span>Savings</span>
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

                <motion.button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-4 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg font-semibold"
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "var(--color-primary-hover)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Proceed to Checkout
                </motion.button>

                <p className="text-xs text-[var(--color-text-muted)] text-center mt-4">
                  Your order details will be sent to WhatsApp for confirmation
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}