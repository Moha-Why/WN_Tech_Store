"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const iconVariants = {
  hidden: { 
    scale: 0,
    rotate: -180,
    opacity: 0
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

const checkmarkVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.3
      },
      opacity: {
        duration: 0.2,
        delay: 0.3
      }
    }
  }
};

const textVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const buttonVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const pulseVariants = {
  initial: {
    scale: 1,
    opacity: 0.5
  },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.2, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Page() {
  const router = useRouter();

  return (
    <motion.div 
      className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-md w-full">
        <motion.div 
          className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-8 text-center"
          variants={textVariants}
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-[var(--color-success)]/20"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            />
            
            <motion.div
              className="relative w-20 h-20 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center"
              variants={iconVariants}
            >
              <svg 
                className="w-12 h-12 text-[var(--color-success)]" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.6, ease: "easeInOut" },
                    opacity: { duration: 0.2 }
                  }}
                />
                <motion.path
                  d="M8 12.5L10.5 15L16 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  variants={checkmarkVariants}
                />
              </svg>
            </motion.div>
          </div>

          <motion.h1 
            className="text-2xl font-bold text-[var(--color-text-primary)] mb-3"
            variants={textVariants}
          >
            Order Placed Successfully!
          </motion.h1>

          <motion.p 
            className="text-[var(--color-text-secondary)] mb-2"
            variants={textVariants}
          >
            Your order has been submitted and is now under review.
          </motion.p>

          <motion.p 
            className="text-sm text-[var(--color-text-muted)] mb-8"
            variants={textVariants}
          >
            We'll contact you via WhatsApp shortly to confirm your order details and arrange delivery.
          </motion.p>

          <motion.div 
            className="space-y-3"
            variants={buttonVariants}
          >
            <motion.button
              onClick={() => router.push('/')}
              className="w-full py-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg font-semibold"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "var(--color-primary-hover)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Continue Shopping
            </motion.button>

            {/* <motion.button
              onClick={() => router.push('/orders')}
              className="w-full py-3 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] rounded-lg font-medium border border-[var(--color-border)]"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "var(--color-card-hover)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              View Orders
            </motion.button> */}
          </motion.div>

          <motion.div 
            className="mt-8 pt-6 border-t border-[var(--color-border)]"
            variants={textVariants}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)]">
              <svg className="w-5 h-5 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>We'll message you on WhatsApp</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}