// app/product/[id]/page.jsx - SERVER COMPONENT
import ProductDetailClient from './ProductDetailClient.jsx'
import { supabase } from '@/src/lib/supabaseClient'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

async function getRelatedProducts(product, limit = 8) {
  if (!product) return []

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', product.id)
    .eq('isAvailable', true)
    .limit(limit)

  if (error) {
    console.error('Error fetching related products:', error)
    return []
  }

  return data || []
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params
  
  try {
    console.log(`📦 Loading product ${id} from Supabase...`)
    
    const product = await getProductById(id)
    
    if (!product) {
      console.log(`❌ Product ${id} not found`)
      notFound()
    }

    const relatedProducts = await getRelatedProducts(product, 8)

    return (
      <div className="min-h-screen pt-16 bg-[var(--color-bg)]">
        <Suspense fallback={<div className="text-center py-20 text-[var(--color-text-muted)]">Loading product details...</div>}>
        <ProductDetailClient 
          productId={id} 
          initialProduct={product}
          initialRelatedProducts={relatedProducts}
        />
        </Suspense>
      </div>
    )
    
  } catch (error) {
    console.error(`❌ Error loading product ${id}:`, error)
    notFound()
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params
  
  try {
    const product = await getProductById(id)
    
    if (!product) {
      return {
        title: 'Product Not Found - WN Store',
        description: 'The requested product could not be found.'
      }
    }

    const price = product.discountPrice || product.price
    const discountText = product.discountPrice 
      ? ` - ${Math.round((1 - product.discountPrice / product.price) * 100)}% OFF` 
      : ''
    
    return {
      title: `${product.name} - ${price} LE${discountText} | WN Store`,
      description: product.description || `Buy ${product.brand} ${product.name} at WN Store. ${product.category === 'phone' ? 'Latest smartphone' : 'Premium laptop'} with great specs.`,
      openGraph: {
        title: `${product.brand} ${product.name}`,
        description: product.description || `Shop ${product.name} at WN Store`,
        type: 'website',
        url: `https://wn-store.vercel.app/product/${id}`,
        siteName: 'WN Store',
        images: [
          {
            url: product.prodctImagePath,
            width: 800,
            height: 800,
            alt: product.name
          },
          // ...(product.productImagePath || []).map(img => ({
          //   url: img,
          //   width: 800,
          //   height: 800,
          //   alt: product.name
          // }))
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.brand} ${product.name}`,
        description: product.description,
        images: [product.thumbnail]
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Product - WN Store',
      description: 'Tech products at WN Store'
    }
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 3600