import { photoGroups, u } from './images'
import { CATEGORY_LABELS } from './categories'

// -----------------------------------------------------------------
// CENTRAL MOCK PRODUCT CATALOGUE
// Edit the compact table at the bottom to add/change products. Each row is expanded
// into a full product object (slug, images, ratings, care info …) by buildProduct().
// Prices are whole rupees. A product is "on sale" when originalPrice > price.
// -----------------------------------------------------------------

/** Named colours used across the catalogue. */
const COLOR_HEX = {
  Black: '#171717', White: '#F5F4F0', Beige: '#D9C9AE', Navy: '#1F2A44', Olive: '#6B6B47',
  Grey: '#9B9B9B', Charcoal: '#3B3B3B', Indigo: '#3E5A8A', 'Light Blue': '#A9C4E0', Brown: '#6F4E37',
  Red: '#B33A3A', Pink: '#E3B5B5', Green: '#4C6B50', Cream: '#EFE6D2', Sand: '#CDB896', Camel: '#B58B55', Yellow: '#E0C36A',
}

const MATERIALS = {
  tshirts: '100% combed cotton, 220 GSM jersey',
  shirts: '100% premium cotton poplin',
  jeans: '98% cotton, 2% elastane, rigid-stretch denim',
  trousers: '65% cotton, 33% polyester, 2% elastane twill',
  jackets: 'Outer: cotton-blend shell. Lining: recycled polyester',
  hoodies: '80% cotton, 20% recycled polyester brushed fleece',
  sweatshirts: '100% cotton loopback terry',
  shorts: '100% cotton ripstop',
  knitwear: '60% cotton, 40% acrylic fine-gauge knit',
  tops: '95% viscose, 5% elastane rib knit',
  dresses: '100% viscose with soft recycled lining',
  skirts: '70% viscose, 30% polyester crepe',
  activewear: '78% recycled nylon, 22% elastane, moisture-wicking',
  accessories: 'Premium materials — see product description',
}

const CARE = {
  default: ['Machine wash cold with similar colours', 'Do not bleach', 'Tumble dry low or line dry', 'Cool iron if needed'],
  knitwear: ['Hand wash or gentle machine cycle at 30°C', 'Reshape and dry flat', 'Do not tumble dry', 'Cool iron inside out'],
  jackets: ['Spot clean or dry clean recommended', 'Do not tumble dry', 'Store on a wide hanger'],
  accessories: ['Wipe clean with a soft, dry cloth', 'Keep away from moisture and heat'],
  dresses: ['Gentle machine wash at 30°C in a garment bag', 'Do not tumble dry', 'Warm iron on reverse'],
}

const DESCRIPTION = {
  tshirts: 'A wardrobe foundation made from heavyweight cotton with a clean, structured drape.',
  shirts: 'Crisp, considered tailoring with a modern relaxed edge — dress it up or wear it open over a tee.',
  jeans: 'Washed to a soft, lived-in finish with just enough stretch for all-day comfort.',
  trousers: 'A clean line from waist to hem. Cut to sit smoothly and move easily from desk to dinner.',
  jackets: 'The layer that finishes the look. Structured shoulders, durable construction and everyday versatility.',
  hoodies: 'Brushed-back fleece, a roomy hood and an effortless fit for slow mornings and city nights.',
  sweatshirts: 'Substantial loopback cotton with a soft hand-feel and a relaxed, easy shape.',
  shorts: 'Easy summer shorts in a durable cotton with a tailored, comfortable cut.',
  knitwear: 'Fine-gauge knit with beautiful texture and drape — warm without the weight.',
  tops: 'A flattering, close-to-body essential that layers beautifully or stands alone.',
  dresses: 'Fluid movement, a considered silhouette and an easy elegance from day to evening.',
  skirts: 'A versatile piece with graceful movement, designed to pair with everything you own.',
  activewear: 'Technical comfort with a minimal look — made to move, stretch and keep up.',
  accessories: 'Thoughtfully finished details that complete an outfit with quiet confidence.',
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/t-shirt/g, 'tshirt')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const APPAREL_SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const WOMEN_SIZES = ['XS', 'S', 'M', 'L', 'XL']

/** Expand one compact row into a complete product object. */
function buildProduct(row, index) {
  const [name, gender, category, group, price, originalPrice, colorNames, photoIdx, flags, style, stockOverride] = row
  const images = photoIdx.map(u)
  const f = flags || ''
  const sizes =
    category === 'accessories' ? ['One Size'] : gender === 'women' ? WOMEN_SIZES : APPAREL_SIZES

  // Each colour points at one of the product's photos so swatches can swap the image.
  const colors = colorNames.map((cName, i) => ({
    name: cName,
    hex: COLOR_HEX[cName],
    image: images[i % images.length],
  }))

  const isBestSeller = f.includes('B')
  const rating = Math.round((4.0 + (((index + 3) * 37) % 10) / 12) * 10) / 10 // deterministic 4.0 – 4.8
  const labelLower = (CATEGORY_LABELS[category] || category).toLowerCase()

  return {
    id: `p-${String(index + 1).padStart(3, '0')}`,
    order: index,
    name,
    slug: slugify(name),
    category,
    group,
    gender,
    style,
    description: `${DESCRIPTION[category]} Part of our ${gender === 'men' ? "men's" : "women's"} ${labelLower} edit.`,
    price,
    originalPrice: originalPrice || null,
    images,
    colors,
    sizes,
    stock: stockOverride ?? ((index * 7) % 20) + 8,
    rating,
    reviewCount: 14 + ((index * 53) % 420),
    soldCount: ((index * 173) % 600) + (isBestSeller ? 900 : 100),
    isFeatured: f.includes('F'),
    isBestSeller,
    isNew: f.includes('N'),
    isSale: !!originalPrice && originalPrice > price,
    material: MATERIALS[category],
    care: CARE[category] || CARE.default,
    addedAt: Date.UTC(2026, 5, 1) - index * 86400000 * (f.includes('N') ? 1 : 9),
  }
}

// name, gender, category, group, price, originalPrice, colours, photo indexes, flags (N=new B=best F=featured), style, stock?
const ROWS = [
  // ---------------- MEN ----------------
  ['Essential Oversized T-Shirt', 'men', 'tshirts', 'menTee', 899, 1299, ['White', 'Black', 'Beige'], [4, 86, 71], 'NBF', 'Essentials'],
  ['Classic Oxford Shirt', 'men', 'shirts', 'menShirt', 1999, 0, ['White', 'Light Blue'], [52, 85, 12], 'BF', 'Smart Casual'],
  ['Relaxed Fit Denim Jeans', 'men', 'jeans', 'menJeans', 2499, 3299, ['Indigo', 'Black'], [20, 68, 70], 'BF', 'Essentials'],
  ['Premium Cotton Hoodie', 'men', 'hoodies', 'menHoodie', 2999, 0, ['Grey', 'Black', 'Beige'], [19, 40, 69], 'NBF', 'Streetwear'],
  ['Minimal Linen Shirt', 'men', 'shirts', 'menShirt', 1799, 0, ['Beige', 'White', 'Olive'], [85, 44, 12], 'N', 'Smart Casual'],
  ['Straight Fit Trousers', 'men', 'trousers', 'menTrousers', 2299, 0, ['Charcoal', 'Beige', 'Navy'], [22, 15, 41], 'B', 'Smart Casual'],
  ['Bomber Jacket', 'men', 'jackets', 'menJacket', 4999, 6499, ['Olive', 'Black'], [37, 45, 13], 'BF', 'Streetwear'],
  ['Textured Knit Polo', 'men', 'knitwear', 'menKnit', 1999, 0, ['Cream', 'Navy'], [16, 6, 38], 'N', 'Smart Casual'],
  ['Graphic Boxy T-Shirt', 'men', 'tshirts', 'menTee', 999, 0, ['Black', 'White'], [71, 18, 65], 'N', 'Streetwear'],
  ['Washed Black Jeans', 'men', 'jeans', 'menJeans', 2799, 0, ['Black'], [68, 20, 70], '', 'Streetwear'],
  ['Heavyweight Crewneck Sweatshirt', 'men', 'sweatshirts', 'menHoodie', 2499, 0, ['Grey', 'Cream'], [40, 19, 65], 'B', 'Essentials'],
  ['Utility Cargo Shorts', 'men', 'shorts', 'menShorts', 1499, 1999, ['Olive', 'Beige'], [41, 67, 35], '', 'Streetwear'],
  ['Leather Biker Jacket', 'men', 'jackets', 'menJacket', 7999, 0, ['Black'], [32, 36, 62], 'F', 'Premium', 3],
  ['Denim Trucker Jacket', 'men', 'jackets', 'menJacket', 3999, 0, ['Indigo'], [14, 15, 22], 'N', 'Essentials'],
  ['Merino Blend Crew Knit', 'men', 'knitwear', 'menKnit', 3499, 0, ['Charcoal', 'Green', 'Cream'], [87, 16, 6], 'F', 'Premium'],
  ['Slim Chino Trousers', 'men', 'trousers', 'menTrousers', 1899, 2499, ['Beige', 'Navy', 'Olive'], [15, 22, 14], '', 'Smart Casual'],
  ['Everyday Pocket T-Shirt', 'men', 'tshirts', 'menTee', 599, 0, ['Grey', 'White', 'Navy'], [65, 17, 4], 'B', 'Essentials'],
  ['Zip-Up Hoodie', 'men', 'hoodies', 'menHoodie', 3299, 0, ['Black', 'Grey'], [19, 69, 40], 'N', 'Streetwear'],
  ['Striped Cotton Shirt', 'men', 'shirts', 'menShirt', 1599, 0, ['White', 'Light Blue'], [12, 52, 85], '', 'Smart Casual'],
  ['Classic Leather Belt', 'men', 'accessories', 'accessories', 999, 0, ['Black', 'Brown'], [59, 78, 42], '', 'Essentials'],
  ['Everyday Baseball Cap', 'men', 'accessories', 'accessories', 499, 0, ['White', 'Black', 'Navy'], [79, 80, 59], 'B', 'Streetwear'],
  ['Canvas Weekender Backpack', 'men', 'accessories', 'accessories', 2499, 2999, ['Navy', 'Black'], [78, 81, 77], '', 'Essentials'],

  // ---------------- WOMEN ----------------
  ['Minimal Ribbed Top', 'women', 'tops', 'womenTop', 799, 0, ['White', 'Black', 'Beige'], [49, 63, 5], 'NBF', 'Essentials'],
  ['Oversized White Shirt', 'women', 'shirts', 'womenShirt', 1899, 0, ['White'], [74, 47, 26], 'BF', 'Smart Casual'],
  ['Wide-Leg Denim Jeans', 'women', 'jeans', 'womenJeans', 2699, 3499, ['Light Blue', 'Indigo'], [75, 21, 11], 'BF', 'Essentials'],
  ['Floral Midi Dress', 'women', 'dresses', 'womenDress', 3499, 4499, ['Cream', 'Red', 'Pink'], [9, 51, 28], 'NBF', 'Premium'],
  ['Classic Knit Cardigan', 'women', 'knitwear', 'womenKnit', 2999, 0, ['Beige', 'Brown', 'Cream'], [6, 16, 47], 'F', 'Essentials'],
  ['Tailored Straight Trousers', 'women', 'trousers', 'womenTrousers', 2599, 0, ['Black', 'Beige'], [53, 27, 31], 'B', 'Smart Casual'],
  ['Cropped Denim Jacket', 'women', 'jackets', 'womenJacket', 3299, 0, ['Light Blue'], [10, 2, 11], 'N', 'Streetwear'],
  ['Everyday Cotton T-Shirt', 'women', 'tshirts', 'womenTop', 499, 699, ['White', 'Black', 'Pink'], [61, 5, 63], 'B', 'Essentials'],
  ['Satin Slip Dress', 'women', 'dresses', 'womenDress', 3999, 0, ['Black', 'Red'], [28, 29, 30], 'NF', 'Premium'],
  ['Pleated Midi Skirt', 'women', 'skirts', 'womenSkirt', 1999, 0, ['Beige', 'Black'], [26, 49, 50], '', 'Smart Casual'],
  ['Relaxed Linen Trousers', 'women', 'trousers', 'womenTrousers', 2199, 0, ['Sand', 'White'], [27, 31, 0], 'N', 'Essentials'],
  ['Zip-Through Track Jacket', 'women', 'activewear', 'active', 2799, 0, ['Yellow', 'Black'], [0, 8, 56], '', 'Activewear'],
  ['High-Waist Sculpt Leggings', 'women', 'activewear', 'active', 1499, 1999, ['Black', 'Grey'], [56, 0, 39], 'B', 'Activewear'],
  ['Longline Wool Coat', 'women', 'jackets', 'womenJacket', 7499, 0, ['Camel', 'Black'], [43, 2, 53], 'F', 'Premium'],
  ['Oversized Knit Sweater', 'women', 'knitwear', 'womenKnit', 2499, 0, ['Cream', 'Olive'], [38, 87, 16], 'N', 'Essentials'],
  ['Square Neck Crop Top', 'women', 'tops', 'womenTop', 899, 0, ['White', 'Pink'], [5, 63, 49], 'N', 'Essentials'],
  ['Wrap Maxi Dress', 'women', 'dresses', 'womenDress', 4299, 5499, ['Red', 'Navy'], [55, 72, 73], 'B', 'Premium'],
  ['Pinstripe Button Shirt', 'women', 'shirts', 'womenShirt', 1699, 0, ['White', 'Black'], [47, 26, 74], '', 'Smart Casual'],
  ['Mom Fit Jeans', 'women', 'jeans', 'womenJeans', 2299, 2999, ['Indigo', 'Black'], [21, 75, 70], '', 'Essentials'],
  ['Quilted Shoulder Bag', 'women', 'accessories', 'accessories', 3999, 0, ['Black', 'Camel'], [78, 80, 77], 'F', 'Premium'],
  ['Mini Pleated Skirt', 'women', 'skirts', 'womenSkirt', 1499, 0, ['Black', 'Cream'], [50, 26, 49], '', 'Streetwear', 0],
  ['Oversized Hoodie', 'women', 'activewear', 'active', 2699, 0, ['Grey', 'Cream', 'Black'], [39, 19, 40], 'NB', 'Streetwear'],
]

export const products = ROWS.map(buildProduct)

// ---- lookups --------------------------------------------------------------
const byId = new Map(products.map((p) => [p.id, p]))
const bySlug = new Map(products.map((p) => [p.slug, p]))

export const getProductById = (id) => byId.get(id)
export const getProductBySlug = (slug) => bySlug.get(slug)

/** Products related to `product`: same category first, then same gender. */
export function getRelatedProducts(product, limit = 4) {
  const others = products.filter((p) => p.id !== product.id)
  const sameCategory = others.filter((p) => p.category === product.category && p.gender === product.gender)
  const sameGender = others.filter((p) => p.gender === product.gender && p.category !== product.category)
  return [...sameCategory, ...sameGender].slice(0, limit)
}
