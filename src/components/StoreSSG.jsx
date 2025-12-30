"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { FaFilter, FaFilterCircleXmark, FaFire, FaStar } from "react-icons/fa6"
import { supabase } from "../lib/supabaseClient"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.02 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const categories = [
{
    key: "laptop",
    name: "Laptops",
    image: "/laptops.jpg",
    description: "Premium computing power"
  }
]

export default function TechStore() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [brandFilter, setBrandFilter] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [availabilityFilter, setAvailabilityFilter] = useState("")
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const saleProducts = useMemo(() => 
    products.filter(p => p.discountPrice && p.isAvailable).slice(0, 4),
    [products]
  )

  const brands = useMemo(() => 
    [...new Set(products.map(p => p.brand).filter(Boolean))],
    [products]
  )

  const categoryCounts = useMemo(() => {
    const counts = {}
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const price = product.discountPrice || product.price
      return (
        (!categoryFilter || product.category === categoryFilter) &&
        (!brandFilter || product.brand === brandFilter) &&
        (!minPrice || price >= parseFloat(minPrice)) &&
        (!maxPrice || price <= parseFloat(maxPrice)) &&
        (!availabilityFilter || (availabilityFilter === "in-stock" ? product.isAvailable : !product.isAvailable)) &&
        (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })

    return filtered.sort((a, b) => {
      const priceA = a.discountPrice || a.price
      const priceB = b.discountPrice || b.price
      
      switch (sortBy) {
        case "price-low":
          return priceA - priceB
        case "price-high":
          return priceB - priceA
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        default:
          return b.id - a.id
      }
    })
  }, [products, categoryFilter, brandFilter, minPrice, maxPrice, searchTerm, sortBy, availabilityFilter])

  const clearAllFilters = () => {
    setCategoryFilter("")
    setBrandFilter("")
    setMinPrice("")
    setMaxPrice("")
    setSortBy("newest")
    setSearchTerm("")
    setAvailabilityFilter("")
  }

  const handleCategoryClick = (categoryKey) => {
    setCategoryFilter(categoryKey)
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const getDiscountPercentage = (originalPrice, salePrice) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">

      {saleProducts.length > 0 && (
        <motion.div variants={containerVariants} className="mb-16">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div
              className="
                inline-flex items-center gap-3
                bg-primary
                text-[var(--color-danger-foreground)]
                px-6 py-3 rounded-full mb-4
                shadow-sm
              "
            >
              <FaFire className="text-base" />
              <span className="text-sm font-semibold tracking-wide">
                LIMITED OFFERS
              </span>
              <FaFire className="text-base" />
            </div>

            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              Discounted Tech Deals
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Premium devices for less
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product, index) => (
              <Link href={`/product/${product.id}`} key={`sale-${product.id}`}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onMouseEnter={() => setHoveredId(`sale-${product.id}`)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="
                    group relative cursor-pointer
                    bg-[var(--color-card)]
                    rounded-xl overflow-hidden
                    border border-[var(--color-border)]
                    transition-all duration-300
                    hover:bg-[var(--color-card-hover)]
                    hover:shadow-xl
                  "
                >
                  {/* Discount Badge */}
                  <div
                    className="
                      absolute top-3 left-3 z-10
                      bg-[var(--color-danger)]
                      text-[var(--color-danger-foreground)]
                      px-3 py-1 rounded-full
                      text-xs font-semibold
                    "
                  >
                    {getDiscountPercentage(product.price, product.discountPrice)}% OFF
                  </div>

                  {/* Image */}
                  <div className="relative h-80 bg-[var(--color-bg-muted)] overflow-hidden">
                    <Image
                      src={product.productImagePath}
                      alt={product.name}
                      fill
                      className="
                        object-contain p-4
                        transition-transform duration-500
                        group-hover:scale-110
                      "
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index < 2}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">
                      {product.brand}
                    </p>

                    <h3
                      className="
                        font-semibold text-sm mb-2 line-clamp-2
                        text-[var(--color-text-primary)]
                      "
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-[var(--color-text-primary)]">
                        {product.discountPrice} LE
                      </span>
                      <span className="text-sm text-[var(--color-text-muted)] line-through">
                        {product.price} LE
                      </span>
                    </div>

                    {product.rating && (
                      <div className="flex items-center gap-1 text-xs mb-3 text-[var(--color-text-secondary)]">
                        <FaStar className="text-[var(--color-warning)]" />
                        <span>{product.rating}</span>
                      </div>
                    )}

                    {/* CTA */}
                    <div
                      className="
                        w-full py-2 rounded-lg text-center text-sm font-medium
                        bg-[var(--color-primary)]
                        text-[var(--color-primary-foreground)]
                        transition-colors
                        group-hover:bg-[var(--color-primary-hover)]
                      "
                    >
                      View Product
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}


        <motion.div variants={containerVariants} className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Shop by Category</h2>
          
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {categories.map((category) => (
              <motion.div
                key={category.key}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg bg-white"
                onClick={() => handleCategoryClick(category.key)}
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10 p-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90 mb-2">{category.description}</p>
                      <p className="text-lg font-semibold">{categoryCounts[category.key] || 0} products</p>
                    </div>
                  </div>
                  
                  {categoryFilter === category.key && (
                    <div className="absolute top-4 right-4 bg-white text-slate-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      Active
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Our Collection</h1>
          <p className="text-xl text-slate-600 mb-8">Discover the latest tech and premium devices</p>
          
          <div className="max-w-md mx-auto relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products or brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </motion.div>

        <div id="products-section">
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-6 mb-8">
            {categoryFilter && (
              <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600">Filtering by:</span>
                    <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(c => c.key === categoryFilter)?.name || categoryFilter}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCategoryFilter("")}
                    className="text-slate-500 hover:text-slate-700 text-sm"
                  >
                    Clear Category
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <label htmlFor="sort" className="sr-only">Sort products</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="ml-auto flex gap-3">
                <button
                  type="button"
                  aria-label="Clear all filters"
                  className="px-6 py-3 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>

                <button
                  type="button"
                  className="p-3 rounded-full hover:bg-slate-100 transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                  aria-label="Toggle filters"
                >
                  {showFilters ? <FaFilterCircleXmark className="w-5 h-5" /> : <FaFilter className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                    <select
                      value={brandFilter}
                      onChange={(e) => setBrandFilter(e.target.value)}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">All Brands</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>

                    <select
                      value={availabilityFilter}
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">All Availability</option>
                      <option value="in-stock">In Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-700">Price:</span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-24 px-3 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                      <span className="text-slate-500">—</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-24 px-3 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative overflow-hidden bg-slate-50 h-80">
                    <Image
                      src={product.productImagePath}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index < 8}
                    />

                    {product.discountPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        SALE
                      </div>
                    )}

                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-slate-500 mb-1">{product.brand}</p>
                    <h3 className="font-medium text-slate-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      {product.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-slate-900">
                            {product.discountPrice} LE
                          </span>
                          <span className="text-sm text-slate-500 line-through">
                            {product.price} LE
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-semibold text-slate-900">
                          {product.price} LE
                        </span>
                      )}
                    </div>

                    {product.rating && (
                      <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                        <FaStar className="text-yellow-500" />
                        <span>{product.rating}</span>
                      </div>
                    )}

                    {(product.cpu || product.ram || product.storage) && (
                      <div className="text-xs text-slate-600 space-y-1 mb-3">
                        {product.cpu && <p className="truncate">CPU: {product.cpu}</p>}
                        {product.ram && <p>RAM: {product.ram}</p>}
                        {product.storage && <p>Storage: {product.storage}</p>}
                      </div>
                    )}

                    <div className={`text-xs font-medium ${product.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {product.isAvailable ? `✓ In Stock${product.stock ? ` (${product.stock})` : ''}` : '✗ Out of Stock'}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}