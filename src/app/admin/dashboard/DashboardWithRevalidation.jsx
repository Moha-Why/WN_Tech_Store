"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useHardwareData } from "@/src/components/useHardwareData"
import {
  FiBox,
  FiTrash2,
  FiLogOut,
  FiPackage,
  FiDollarSign,
  FiCpu,
  FiImage,
  FiAlignLeft,
  FiTag,
  FiLayers,
  FiStar,
  FiUpload,
  FiPlus, 
  FiMinus
} from "react-icons/fi"
import { supabase } from "@/src/lib/supabaseClient"
import { useRouter } from "next/navigation"

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: { opacity: 1, scale: 1 },
// }

const LAPTOP_SPECS = {
  ram: ["4GB", "8GB", "16GB", "24GB", "32GB"],
  storage: [
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "2TB SSD",
    "4TB SSD",
    "8TB SSD",    
    // "256GB HDD",
    // "512GB HDD",
    // "1TB HDD",
    // "2TB HDD",
    // "4TB HDD",
    // "8TB HDD",
  ],
  screenSize: [
    "13.3 inches",
    "14 inches",
    "15.6 inches",
    "16 inches",
    "17.3 inches",
    "18 inches",
  ],
  battery: ["50Wh", "60Wh", "70Wh", "80Wh", "90Wh", "100Wh"],
  os: [
    "Windows 11 Pro",
    "Windows 11 Home",
    "macOS Sequoia",
    "macOS Sonoma",
    "Ubuntu 24.04",
    "Ubuntu 22.04",
  ],
}

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState("add")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function getUser() {
    await supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    
  }

  useEffect(() => {
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user === null && !loading) {
      router.replace("/admin/login")
    }
  }, [user, loading, router])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    )
  }
  

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiPackage className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-text-primary">
              Tech Store Admin
            </h1>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setTab("add")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              tab === "add"
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-text-secondary hover:bg-card"
            }`}
          >
            <FiPlus className="w-4 h-4" />
            Add Product
          </button>
          <button
            onClick={() => setTab("manage")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              tab === "manage"
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-text-secondary hover:bg-card"
            }`}
          >
            <FiBox className="w-4 h-4" />
            Manage Products
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "add" && (
            <motion.div
              key="add"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AddProduct />
            </motion.div>
          )}
          {tab === "manage" && (
            <motion.div
              key="manage"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ManageProducts />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}



function AddProduct() {
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState({ file: null, fileName: "" })
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "phone",
    price: "",
    discountPrice: "",
    stock: "",
    isAvailable: true,
    description: "",
    thumbnail: "",
    productImagePath: "",
    rating: "",
    cpu: "",
    ram: "",
    storage: "",
    gpu: "",
    screenSize: "",
    battery: "",
    camera: "",
    os: "",
  })

  const { cpuList, gpuList, isLoadingCPU, isLoadingGPU } = useHardwareData();
  // const [formTwo, setForm] = useState({
  //   cpu: "",
  //   gpu: "",
  //   // ... other form fields
  // });

  // const updateSpec = (field, value) => {
  //   setForm(prev => ({ ...prev, [field]: value }));
  // };

  const specs = form.category === "phone" ? LAPTOP_SPECS : LAPTOP_SPECS

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const updateSpec = (key, value) =>
    setForm((f) => ({
      ...f,
      [key]: value ,
}))

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }
    const fileName = `${Date.now()}-${file.name}`
    
    const reader = new FileReader()
    reader.onload = (e) => {
      update("thumbnail", e.target.result)
    }
    reader.readAsDataURL(file)
    setFiles({
      file,
      fileName,
    })

  }

  const submit = async () => {
    console.log("Submitting form:", files)
    setLoading(true)
    const { data, error: imgError } = await supabase.storage
    .from('product-images')
    .upload(files.fileName, files.file)
    if (imgError) { alert(imgError.message); setLoading(false); return; }
    
    const path = data.path
    const { data: imger } = supabase.storage
    .from('product-images')
    .getPublicUrl(path)

    const payload = {
      ...form,
      productImagePath: imger.publicUrl,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
      stock: Number(form.stock),
      rating: Number(form.rating),
      cpu: form.cpu || null,
      ram: form.ram || null,
      storage: form.storage || null,
      gpu: form.gpu || null,
      screenSize: form.screenSize || null,
      battery: "Removed",
      camera: form.camera || null,
      os: form.os || null,
  }
    
    const { error } = await supabase.from("products").insert(payload)

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Product added successfully")
      setForm({
        name: "",
        brand: "",
        category: "phone",
        price: "",
        discountPrice: "",
        stock: "",
        isAvailable: true,
        description: "",
        productImagePath: "",
        thumbnail: "",
        rating: "",
        cpu: "",
        ram: "",
        storage: "",
        gpu: "",
        screenSize: "",
        battery: "",
        camera: "",
        os: "",
        })
    }
  }

  return (
    <motion.div
      className="bg-surface rounded-2xl p-8 border border-border"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Basic Info */}
          <motion.div variants={fieldVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <FiBox className="w-5 h-5 text-primary" />
              Basic Information
            </h2>
            <input
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="Product name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <input
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => update("brand", e.target.value)}
            />
            <select
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              value={form.category}
              onChange={(e) => {
                update("category", e.target.value)
                setForm((f) => ({
                  ...f,
                  cpu: "",
                  ram: "",
                  storage: "",
                  gpu: "",
                  screenSize: "",
                  battery: "",
                  camera: "",
                  os: "",
                  
                }))
              }}
            >
              <option value="laptop">Laptop</option>
            </select>
          </motion.div>

          {/* Description */}
          <motion.div variants={fieldVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <FiAlignLeft className="w-5 h-5 text-primary" />
              Description
            </h2>
            <textarea
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
              placeholder="Product description"
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </motion.div>

          {/* Pricing */}
          <motion.div variants={fieldVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <FiDollarSign className="w-5 h-5 text-primary" />
              Pricing
            </h2>
            <input
              type="number"
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="Price"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
            />
            <input
              type="number"
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="Discount price (optional)"
              value={form.discountPrice}
              onChange={(e) => update("discountPrice", e.target.value)}
            />
          </motion.div>

          {/* Inventory */}
          <motion.div variants={fieldVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <FiLayers className="w-5 h-5 text-primary" />
              Inventory
            </h2>
            <input
              type="number"
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="Stock quantity"
              value={form.stock}
              onChange={(e) => update("stock", e.target.value)}
            />
            <label className="flex items-center gap-3 text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(e) => update("isAvailable", e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm">Available for sale</span>
            </label>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Thumbnail */}
          <motion.div variants={fieldVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <FiImage className="w-5 h-5 text-primary" />
              Product Image
            </h2>
            <div
              className={`relative border-2 border-dashed rounded-lg transition-all ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border bg-bg"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {form.thumbnail ? (
                <div className="relative p-4">
                  <img
                    src={form.thumbnail}
                    alt="Preview"
                    className="w-full h-64 object-contain rounded-lg"
                  />
                  <button
                    onClick={() => update("thumbnail", "")}
                    className="absolute top-6 right-6 bg-danger text-white p-2 rounded-lg hover:bg-danger/90 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-64 cursor-pointer">
                  <FiUpload className="w-12 h-12 text-text-secondary mb-3" />
                  <span className="text-sm text-text-primary font-medium mb-1">
                    Drop image here or click to upload
                  </span>
                  <span className="text-xs text-text-secondary">
                    PNG, JPG, WEBP up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                </label>
              )}
            </div>
          </motion.div>

          {/* Rating */}
          <motion.div variants={fieldVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <FiStar className="w-5 h-5 text-primary" />
              Rating
            </h2>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="Rating (0–5)"
              value={form.rating}
              onChange={(e) => update("rating", e.target.value)}
            />
          </motion.div>

          {/* Specifications */}
          <motion.div variants={fieldVariants} className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <FiCpu className="w-5 h-5 text-primary" />
              Technical Specifications
            </h2>
            <div className="space-y-3">
              {/* <select
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                value={form.cpu}
                onChange={(e) => updateSpec("cpu", e.target.value)}
              >
                <option value="">Select CPU / Processor</option>
                {specs.cpu.map((cpu) => (
                  <option key={cpu} value={cpu}>
                    {cpu}
                  </option>
                ))}
              </select> */}

              <select
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                value={form.ram}
                onChange={(e) => updateSpec("ram", e.target.value)}
              >
                <option value="">Select RAM</option>
                {specs.ram.map((ram) => (
                  <option key={ram} value={ram}>
                    {ram}
                  </option>
                ))}
              </select>

              <select
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                value={form.storage}
                onChange={(e) => updateSpec("storage", e.target.value)}
              >
                <option value="">Select Storage</option>
                {specs.storage.map((storage) => (
                  <option key={storage} value={storage}>
                    {storage}
                  </option>
                ))}
              </select>
              <div>
                {/* <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  CPU / Processor
                </label> */}
                <SearchableSelect
                  value={form.cpu}
                  onChange={(value) => updateSpec("cpu", value)}
                  options={cpuList}
                  placeholder="Select CPU / Processor"
                  isLoading={isLoadingCPU}
                />
              </div>

              <div>
                {/* <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  GPU / Graphics
                </label> */}
                <SearchableSelect
                  value={form.gpu}
                  onChange={(value) => updateSpec("gpu", value)}
                  options={gpuList}
                  placeholder="Select GPU / Graphics"
                  isLoading={isLoadingGPU}
                />
              </div>

              <select
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                value={form.screenSize}
                onChange={(e) => updateSpec("screenSize", e.target.value)}
              >
                <option value="">Select Screen Size</option>
                {specs.screenSize.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              {/* <select
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                value={form.battery}
                onChange={(e) => updateSpec("battery", e.target.value)}
              >
                <option value="">Select Battery</option>
                {specs.battery.map((battery) => (
                  <option key={battery} value={battery}>
                    {battery}
                  </option>
                ))}
              </select> */}

              <select
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                value={form.os}
                onChange={(e) => updateSpec("os", e.target.value)}
              >
                <option value="">Select Operating System</option>
                {specs.os.map((os) => (
                  <option key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        variants={fieldVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        onClick={submit}
        className="mt-8 w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold disabled:opacity-60 transition-opacity"
      >
        {loading ? "Adding Product..." : "Add Product"}
      </motion.button>
    </motion.div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function ManageProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState({})
  const [adjustingStock, setAdjustingStock] = useState({})

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      alert(error.message)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  const toggleAvailability = async (id, currentStatus) => {
    setToggling((prev) => ({ ...prev, [id]: true }))

    const { error } = await supabase
      .from("products")
      .update({ isAvailable: !currentStatus })
      .eq("id", id)

    if (error) {
      alert(error.message)
    } else {
      setProducts((p) =>
        p.map((prod) =>
          prod.id === id ? { ...prod, isAvailable: !currentStatus } : prod
        )
      )
    }

    setToggling((prev) => ({ ...prev, [id]: false }))
  }

  const adjustStock = async (id, currentStock, increment) => {
    const newStock = Math.max(0, currentStock + increment)
    
    setAdjustingStock((prev) => ({ ...prev, [id]: true }))

    const { error } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", id)

    if (error) {
      alert(error.message)
    } else {
      setProducts((p) =>
        p.map((prod) =>
          prod.id === id ? { ...prod, stock: newStock } : prod
        )
      )
    }

    setAdjustingStock((prev) => ({ ...prev, [id]: false }))
  }

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return

    const { error } = await supabase.from("product").delete().eq("id", id)

    if (error) {
      alert(error.message)
    } else {
      setProducts((p) => p.filter((prod) => prod.id !== id))
    }
  }

  if (loading) {
    return (
      <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border">
        <div className="text-center text-text-secondary">
          Loading products...
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border">
        <div className="text-center text-text-secondary">
          No products yet. Add your first product!
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={cardVariants}
          className="bg-surface rounded-xl p-4 sm:p-6 border border-border hover:border-primary transition-colors"
        >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Thumbnail */}
                <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <FiImage className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {product.brand} • {product.category}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAvailability(product.id, product.isAvailable)}
                        disabled={toggling[product.id]}
                        className={`flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors w-full sm:w-auto ${
                          product.isAvailable
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-600 hover:bg-gray-700 text-white"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {toggling[product.id] ? (
                          <span className="text-xs">...</span>
                        ) : product.isAvailable ? (
                          "Available"
                        ) : (
                          "Unavailable"
                        )}
                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">Price</p>
                      <p className="font-medium text-black">
                        ${product.discountPrice ?? product.price}
                      </p>
                      {product.discountPrice && (
                        <p className="text-xs line-through text-gray-500">
                          ${product.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">Stock</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adjustStock(product.id, product.stock, -1)}
                          disabled={adjustingStock[product.id] || product.stock === 0}
                          className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="font-medium text-black min-w-[2rem] text-center">
                          {product.stock}
                        </span>
                        <button
                          onClick={() => adjustStock(product.id, product.stock, 1)}
                          disabled={adjustingStock[product.id]}
                          className="w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">Rating</p>
                      <p className="font-medium text-black">
                        {product.rating ?? "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">Status</p>
                      <p
                        className={`font-medium text-sm ${
                          product.isAvailable
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {product.isAvailable ? "Available" : "Unavailable"}
                      </p>
                    </div>
                  </div>

                  {product.description && (
                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {product.specs && (
                    <div className="mt-3 sm:mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                      {Object.entries(product.specs)
                        .filter(([, value]) => value)
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="bg-gray-900 border border-gray-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs"
                          >
                            <p className="text-gray-500 capitalize text-[10px] sm:text-xs">
                              {key.replace(/([A-Z])/g, " $1")}
                            </p>
                            <p className="font-medium text-white truncate">
                              {value}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )
    }


const SearchableSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  isLoading 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-left flex items-center justify-between"
      >
        <span className={value ? "text-[var(--color-text-primary)]" : "text-blue-950"}>
          {value || placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-2 border-b border-[var(--color-border)]">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                  <svg className="animate-spin w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                  No results found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--color-bg-muted)] transition-colors ${
                      value === option
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
                        : "text-[var(--color-text-primary)]"
                    }`}
                  >
                    {option}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

