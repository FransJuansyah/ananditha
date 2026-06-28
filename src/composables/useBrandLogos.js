const modules = import.meta.glob('../assets/images/brands/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG}', { eager: true })

const brandLabelMap = {
  artisan: 'Artisan',
  blp: 'BLP',
  'bobbi-brown': 'Bobbi Brown',
  chanel: 'Chanel',
  buttonscarves: 'Buttonscarves',
  'charlotte-tilbury': 'Charlotte Tilbury',
  ysl: 'YSL',
  'tom-ford': 'Tom Ford',
  sulwhasoo: 'Sulwhasoo',
  somethinc: 'Somethinc',
  sephora: 'Sephora',
  nars: 'NARS',
  muaq: 'MUAQ',
  'make-over': 'Make Over',
  mac: 'MAC',
  luxcrime: 'Luxcrime',
  'lt-pro': 'LT Pro',
  lancome: 'Lancôme',
  kvd: 'KVD',
  guele: 'Guele',
  'estee-lauder': 'Estée Lauder',
  dior: 'Dior',
  dalba: "d'Alba",
  'holika-holika': 'Holika Holika',
  haquhara: 'Haquhara',
  hourglass: 'Hourglass',
  'huda-beauty': 'Huda Beauty',
  inglot: 'Inglot',
}

export function useBrandLogos() {
  const logos = Object.entries(modules).map(([path, mod]) => {
    const filename = path.split('/').pop().split('.')[0]
    return {
      name: filename,
      label: brandLabelMap[filename] || filename,
      src: mod.default,
    }
  })
  return { logos }
}