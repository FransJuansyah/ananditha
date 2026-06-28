const modules = import.meta.glob('../assets/images/gallery/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', { eager: true })

const categories = [
  { key: 'wedding', label: 'Wedding' },
  { key: 'prewedding', label: 'Pre-Wedding' },
  { key: 'event', label: 'Special Event' },
  { key: 'editorial', label: 'Editorial' },
  { key: 'graduation', label: 'Graduation' },
  { key: 'class', label: 'Class' },
]

function buildPhotos() {
  const photos = []
  for (const path in modules) {
    const match = path.match(/gallery\/([^/]+)\/([^/]+)$/)
    if (!match) continue
    const [, category, filename] = match
    photos.push({
      id: `${category}-${filename}`,
      category,
      src: modules[path].default,
    })
  }
  return photos
}

export function useGalleryPhotos() {
  const photos = buildPhotos()
  const featuredPhotos = categories.flatMap(category =>
    photos.filter(photo => photo.category === category.key).slice(0, 4)
  )

  return { photos, featuredPhotos, categories }
}
