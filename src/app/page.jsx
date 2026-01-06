// app/page.jsx - Fixed for Vercel Deployment
import Nav from "../components/Nav"
import StoreSSG from "../components/StoreSSG"
// import { getAllProducts, getSaleProducts, getProductCategories } from "@/src/lib/productService"

/**
 * ✅ FIXED: Home Page without Build Mode Issues
 */
export default async function Home() {
  // console.log('🏠 Building home page...')
  
  // let allProducts = []
  // let saleProducts = []
  // let categories = []
  
  // try {
  //   // ✅ FIXED: Always fetch real data, let fallbacks handle errors
  //   console.log('📡 Fetching data from Supabase...')
    
  //   // Parallel data fetching with individual error handling
  //   const [productsResult, saleResult, categoriesResult] = await Promise.allSettled([
  //     getAllProducts(false),
  //     getSaleProducts(4),
  //     getProductCategories()
  //   ])
    
  //   // Handle each result individually
  //   if (productsResult.status === 'fulfilled') {
  //     allProducts = productsResult.value || []
  //     console.log(`✅ Products loaded: ${allProducts.length}`)
  //   } else {
  //     console.error('❌ Failed to load products:', productsResult.reason)
  //     allProducts = []
  //   }
    
  //   if (saleResult.status === 'fulfilled') {
  //     saleProducts = saleResult.value || []
  //     console.log(`✅ Sale products loaded: ${saleProducts.length}`)
  //   } else {
  //     console.error('❌ Failed to load sale products:', saleResult.reason)
  //     saleProducts = []
  //   }
    
  //   if (categoriesResult.status === 'fulfilled') {
  //     categories = categoriesResult.value || []
  //     console.log(`✅ Categories loaded: ${categories.length}`)
  //   } else {
  //     console.error('❌ Failed to load categories:', categoriesResult.reason)
  //     categories = []
  //   }

  //   console.log(`✅ Home page data loaded:`)
  //   console.log(`   - Products: ${allProducts.length}`)
  //   console.log(`   - Sale products: ${saleProducts.length}`)
  //   console.log(`   - Categories: ${categories.length}`)
    
  // } catch (error) {
  //   console.error('❌ Error loading home page data:', error)
    
  //   // Use empty fallback to prevent build failure
  //   console.log('⚠️ Using empty fallback data for home page')
  //   allProducts = []
  //   saleProducts = []
  //   categories = []
  // }

  return (
    <>
      <Nav />
      <StoreSSG
      />
    </>
  )
}

/**
 * Enhanced Metadata for SEO
 */
export const metadata = {
  title: "N&Y Store - Laptops for Every Need",
  description: "Shop the latest laptops at Wn Store. Find high-performance gaming laptops, ultrabooks, and everyday laptops with fast delivery in Egypt.",
  keywords: "laptops, gaming laptops, ultrabooks, notebook, online shopping, Egypt",
  authors: [{ name: "N&Y Store" }],
  creator: "N&Y Store",
  publisher: "N&Y Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wn-store.vercel.app",
    siteName: "N&Y Store",
    title: "N&Y Store - Laptops for Every Need",
    description: "Shop the latest laptops at Wn Store. Find high-performance gaming laptops, ultrabooks, and everyday laptops with fast delivery in Egypt.",
    images: [
      {
        url: "/laptops.jpg", // replace with laptop-related OG image
        width: 1200,
        height: 630,
        alt: "Wn Store Laptops Collection",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "N&Y Store - Laptops for Every Need",
    description: "Shop the latest laptops at N&Y Store. Find high-performance gaming laptops, ultrabooks, and everyday laptops with fast delivery in Egypt.",
    images: ["/og-image-laptops.jpg"],
    creator: "@n&ystore"
  },
  alternates: {
    canonical: "https://wn-store.vercel.app"
  }
}


/**
 * ✅ FIXED: Build Configuration for Vercel
 */
export const dynamic = 'force-dynamic' // Allow real data fetching
export const revalidate = 0 // Disable static caching, use in-memory cache instead
export const fetchCache = 'default-cache'
export const preferredRegion = 'auto'