// app/store/page.jsx
import StoreSSG from "./StoreSSG"
import { getAllProducts, getSaleProducts, getProductCategories } from "@/src/lib/productService"

/**
 * صفحة المتجر - Static Generation مع Error Handling
 */
export default async function StorePage() {
  try {
    console.log('🏪 Building store page...')
    
    // جلب البيانات في build time مع build mode
    const [allProducts, saleProducts, categories] = await Promise.all([
      getAllProducts(false, true), // Enable build mode
      getSaleProducts(4, true),
      getProductCategories(true)
    ])

    console.log(`🏪 Store page built with:`)
    console.log(`   - Total products: ${allProducts.length}`)
    console.log(`   - Sale products: ${saleProducts.length}`)
    console.log(`   - Categories: ${categories.length}`)

    return (
      <div className="min-h-screen pt-16">
        <StoreSSG
          initialProducts={allProducts}
          initialSaleProducts={saleProducts}
          initialCategories={categories}
        />
      </div>
    )
    
  } catch (error) {
    console.error('❌ Store page build error:', error)
    
    // Provide fallback UI with empty data
    return (
      <div className="min-h-screen pt-16">
        <StoreSSG
          initialProducts={[]}
          initialSaleProducts={[]}
          initialCategories={[]}
        />
      </div>
    )
  }
}

/**
 * إعدادات الcache للأداء الأمثل - محسنة
 */
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const fetchCache = 'default-cache' // بدلاً من force-cache