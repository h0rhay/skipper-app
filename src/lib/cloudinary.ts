const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export function imgUrl(publicId: string, transforms = 'f_auto,q_auto') {
  if (!CLOUD) return `/illustrations/${publicId.split('/').pop()}.png`
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicId}`
}

// Tiny LQIP — ~500 bytes, loads almost instantly, blurred in CSS
export function placeholderUrl(publicId: string) {
  if (!CLOUD) return null
  return imgUrl(publicId, 'f_auto,q_1,w_20')
}
