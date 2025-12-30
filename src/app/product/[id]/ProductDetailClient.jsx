"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaStar, FaShoppingCart, FaCheck, FaTimes, FaCheckCircle } from "react-icons/fa"
import { useCart } from "@/src/context/CartContext"

export default function ProductDetailClient({ 
  productId, 
  initialProduct, 
  initialRelatedProducts 
}) {
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addToCart, isInCart, getItemQuantity } = useCart()

  const product = initialProduct
  const relatedProducts = initialRelatedProducts || []
  const isProductInCart = isInCart(product.id)
  const cartQuantity = getItemQuantity(product.id)

  const finalPrice = product.discountPrice || product.price
  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category === "phone" ? "Smartphone" : "Laptop" },
    { label: "CPU", value: product.cpu },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    { label: "GPU", value: product.gpu },
    { label: "Screen Size", value: product.screenSize },
    { label: "Battery", value: product.battery },
    { label: "Camera", value: product.camera },
    { label: "Operating System", value: product.os }
  ].filter(spec => spec.value)

  const handleAddToCart = () => {
    const success = addToCart(product, quantity)
    
    if (success) {
      setShowSuccess(true)
      setQuantity(1)
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/#products-section" className="hover:text-[var(--color-primary)]">
                {product.category === "phone" ? "Smartphones" : "Laptops"}
              </Link>
            </li>
            <li>/</li>
            <li className="text-[var(--color-text-primary)]">{product.name}</li>
          </ol>
        </nav>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden aspect-square relative border border-[var(--color-border)]">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />
              
              {hasDiscount && (
                <div className="absolute top-4 left-4 bg-[var(--color-danger)] text-[var(--color-danger-foreground)] px-3 py-1 rounded-full text-sm font-bold">
                  {discountPercent}% OFF
                </div>
              )}

              {!product.isAvailable && (
                <div className="absolute inset-0 bg-[var(--color-bg)] bg-opacity-80 flex items-center justify-center">
                  <span className="text-[var(--color-danger)] font-bold text-2xl">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Brand */}
            <p className="text-[var(--color-text-muted)] text-sm mb-2 uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-[var(--color-warning)]"
                          : "text-[var(--color-border)]"
                      }
                    />
                  ))}
                </div>
                <span className="text-[var(--color-text-secondary)] text-sm">
                  {product.rating} / 5
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-bold text-[var(--color-text-primary)]">
                  {finalPrice} LE
                </span>
                {hasDiscount && (
                  <span className="text-xl text-[var(--color-text-muted)] line-through">
                    {product.price} LE
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-[var(--color-danger)] font-medium">
                  Save {product.price - product.discountPrice} LE
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.isAvailable ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <FaCheck />
                    <span className="font-medium">
                      In Stock {product.stock && `(${product.stock} available)`}
                    </span>
                  </div>
                  {isProductInCart && (
                    <div className="text-sm text-[var(--color-text-muted)]">
                      {cartQuantity} in cart
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[var(--color-danger)]">
                  <FaTimes />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {product.isAvailable && (
              <div className="mb-6">
                <label className="block text-[var(--color-text-primary)] font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold text-[var(--color-text-primary)] min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.isAvailable || quantity + cartQuantity > product.stock}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)] py-4 rounded-lg font-semibold flex items-center justify-center gap-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaShoppingCart />
              {!product.isAvailable 
                ? "Out of Stock" 
                : quantity + cartQuantity > product.stock
                ? "Not Enough Stock"
                : "Add to Cart"
              }
            </button>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 bg-green-100 border border-green-500 rounded-lg flex items-center gap-2 text-green-700"
              >
                <FaCheckCircle />
                <span className="font-medium">Added to cart successfully!</span>
              </motion.div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                  Description
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Specifications - Full Width */}
        {specs.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Technical Specifications
            </h2>
            <div className="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className={`flex flex-col px-6 py-4 ${
                      index < specs.length - 1 ? "border-b md:border-b-0 md:border-r border-[var(--color-border)]" : ""
                    } ${
                      index >= specs.length - 3 && specs.length % 3 !== 0 ? "md:border-b-0" : ""
                    }`}
                  >
                    <span className="text-[var(--color-text-muted)] text-sm mb-1">
                      {spec.label}
                    </span>
                    <span className="text-[var(--color-text-primary)] font-semibold">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}