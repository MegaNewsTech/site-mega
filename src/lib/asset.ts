import type { StaticImageData } from 'next/image'

export function assetSrc(asset: string | StaticImageData) {
  if (typeof asset === 'string') return asset
  if (asset && typeof asset === 'object' && 'src' in asset) return asset.src
  return String(asset)
}
