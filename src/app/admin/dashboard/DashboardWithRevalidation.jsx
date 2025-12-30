"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FiBox,
  FiTrash2,
  FiPlus,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const PHONE_SPECS = {
  cpu: [
    "Apple A18 Pro",
    "Apple A17 Pro",
    "Apple A16 Bionic",
    "Snapdragon 8 Gen 3",
    "Snapdragon 8 Gen 2",
    "Google Tensor G4",
    "Google Tensor G3",
    "MediaTek Dimensity 9300",
    "Exynos 2400",
  ],
  ram: ["4GB", "6GB", "8GB", "12GB", "16GB", "18GB"],
  storage: ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"],
  screenSize: [
    "5.4 inches",
    "6.1 inches",
    "6.3 inches",
    "6.5 inches",
    "6.7 inches",
    "6.8 inches",
    "6.9 inches",
  ],
  battery: ["3000mAh", "3500mAh", "4000mAh", "4500mAh", "5000mAh", "5500mAh", "6000mAh"],
  camera: [
    "12MP Single",
    "48MP Main",
    "50MP Main",
    "64MP Main",
    "108MP Main",
    "200MP Main",
    "Triple 12MP",
    "Triple 50MP",
    "Quad 50MP",
  ],
  os: [
    "iOS 18",
    "iOS 17",
    "Android 15",
    "Android 14",
    "One UI 6.1",
    "ColorOS 14",
    "MIUI 15",
  ],
}

const LAPTOP_SPECS = {
  cpu: [
    "Apple M4",
    "Apple M3 Pro",
    "Apple M3 Max",
    "Apple M3",
    "Intel Core i9-14th Gen",
    "Intel Core i7-14th Gen",
    "Intel Core i5-14th Gen",
    "AMD Ryzen 9 7945HX",
    "AMD Ryzen 7 7840HS",
    "AMD Ryzen 5 7640HS",
  ],
  ram: ["8GB", "16GB", "24GB", "32GB", "64GB", "96GB", "128GB"],
  storage: [
    "256GB SSD",
    "512GB SSD",
    "1TB SSD",
    "2TB SSD",
    "4TB SSD",
    "8TB SSD",
  ],
  gpu: [
    "Integrated Graphics",
    "Intel Iris Xe",
    "NVIDIA RTX 4050",
    "NVIDIA RTX 4060",
    "NVIDIA RTX 4070",
    "NVIDIA RTX 4080",
    "NVIDIA RTX 4090",
    "AMD Radeon RX 7600M XT",
    "AMD Radeon RX 7700S",
    "AMD Radeon RX 7900M",
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

  const specs = form.category === "phone" ? PHONE_SPECS : LAPTOP_SPECS

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
    const { data: img, error: URLErorr } = supabase.storage
    .from('product-images')
    .getPublicUrl(path)
    if (URLErorr) { alert(imgError.message); setLoading(false); return; }
   
    update("productImagePath", img.publicUrl)

    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
      stock: Number(form.stock),
      rating: Number(form.rating),
      cpu: form.cpu || null,
      ram: form.ram || null,
      storage: form.storage || null,
      gpu: form.gpu || null,
      screenSize: form.screenSize || null,
      battery: form.battery || null,
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
              <option value="phone">Phone</option>
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
              <select
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
              </select>

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

              {form.category === "laptop" && (
                <select
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  value={form.gpu}
                  onChange={(e) => updateSpec("gpu", e.target.value)}
                >
                  <option value="">Select GPU / Graphics</option>
                  {specs.gpu.map((gpu) => (
                    <option key={gpu} value={gpu}>
                      {gpu}
                    </option>
                  ))}
                </select>
              )}

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

              <select
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
              </select>

              {form.category === "phone" && (
                <select
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  value={form.camera}
                  onChange={(e) => updateSpec("camera", e.target.value)}
                >
                  <option value="">Select Camera</option>
                  {specs.camera.map((camera) => (
                    <option key={camera} value={camera}>
                      {camera}
                    </option>
                  ))}
                </select>
              )}

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

function ManageProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      alert(error.message)
    } else {
      setProducts((p) => p.filter((prod) => prod.id !== id))
    }
  }

  if (loading) {
    return (
      <div className="bg-surface rounded-2xl p-8 border border-border">
        <div className="text-center text-text-secondary">
          Loading products...
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bg-surface rounded-2xl p-8 border border-border">
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
          className="bg-surface rounded-xl p-6 border border-border hover:border-primary transition-colors"
        >
          <div className="flex gap-6">
            {/* Thumbnail */}
            <div className="w-32 h-32 bg-bg rounded-lg overflow-hidden flex-shrink-0">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-secondary">
                  <FiImage className="w-8 h-8" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-text-primary truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {product.brand} • {product.category}
                  </p>
                </div>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-danger text-white rounded-lg hover:bg-danger/90 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-text-secondary">Price</p>
                  <p className="font-medium text-text-primary">
                    ${product.discountPrice ?? product.price}
                  </p>
                  {product.discountPrice && (
                    <p className="text-xs line-through text-text-secondary">
                      ${product.price}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-text-secondary">Stock</p>
                  <p className="font-medium text-text-primary">
                    {product.stock}
                  </p>
                </div>

                <div>
                  <p className="text-text-secondary">Rating</p>
                  <p className="font-medium text-text-primary">
                    {product.rating ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-text-secondary">Status</p>
                  <p
                    className={`font-medium ${
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
                <p className="mt-4 text-sm text-text-secondary line-clamp-2">
                  {product.description}
                </p>
              )}

              {product.specs && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(product.specs)
                    .filter(([, value]) => value)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-bg border border-border rounded-lg px-3 py-2 text-xs"
                      >
                        <p className="text-text-secondary capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </p>
                        <p className="font-medium text-text-primary">
                          {value}
                        </p>
                      </div>
                    ))}
                </div>)}
              </div>
            </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

