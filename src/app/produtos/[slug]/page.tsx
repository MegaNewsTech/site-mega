import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductPage from '@/features/products/ProductPage'
import { findProduct, productHref, products } from '@/features/products/products'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = findProduct((await params).slug)
  if (!product) return {}

  return {
    title: `${product.name} — Mega News`,
    description: product.bandText,
    alternates: { canonical: `${productHref(product)}/` },
  }
}

export default async function Page({ params }: Params) {
  const product = findProduct((await params).slug)
  if (!product) notFound()

  return <ProductPage product={product} />
}
