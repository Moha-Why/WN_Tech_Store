"use client"

import { motion } from "framer-motion"
import { FaShieldAlt, FaGlobe, FaDollarSign, FaTruck, FaTools, FaMemory, FaAward } from "react-icons/fa"

export default function ProductInfoSection({ name }) {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-6 hover:border-[var(--color-primary)] transition-colors"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-2xl">
                <FaTools className="text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Is the {name} suitable for office work and studying?
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Yes, it is powerful and fast, suitable for daily tasks.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-6 hover:border-[var(--color-primary)] transition-colors"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-2xl">
                <FaMemory className="text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Can RAM and storage be upgraded?
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Yes, upgrades are supported.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-6 hover:border-[var(--color-primary)] transition-colors"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 text-2xl">
                <FaShieldAlt className="text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Is there a warranty?
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  3 months warranty with replacement during the first month for manufacturing defects.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-6 text-center hover:border-[var(--color-primary)] hover:shadow-lg transition-all"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] bg-opacity-10 mb-4">
              <FaAward className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Genuine Warranty
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Genuine warranty on all devices
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-6 text-center hover:border-[var(--color-primary)] hover:shadow-lg transition-all"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] bg-opacity-10 mb-4">
              <FaGlobe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              European Imports
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              European-imported refurbished devices in excellent condition
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-6 text-center hover:border-[var(--color-primary)] hover:shadow-lg transition-all"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] bg-opacity-10 mb-4">
              <FaDollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Affordable Prices
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Affordable prices with professional technical support
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-6 text-center hover:border-[var(--color-primary)] hover:shadow-lg transition-all"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] bg-opacity-10 mb-4">
              <FaTruck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Nationwide Shipping
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Shipping available to all governorates
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}