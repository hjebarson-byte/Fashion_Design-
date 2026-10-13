import { MEN_CATEGORIES, WOMEN_CATEGORIES } from './categories'
import { campaign } from './images'

// Header, mobile menu and footer navigation, all in one editable place.

const menLinks = [
  { label: "All Men's Clothing", to: '/collections/men' },
  ...MEN_CATEGORIES.map((c) => ({ label: c.label, to: `/collections/men/${c.slug}` })),
]
const womenLinks = [
  { label: "All Women's Clothing", to: '/collections/women' },
  ...WOMEN_CATEGORIES.map((c) => ({ label: c.label, to: `/collections/women/${c.slug}` })),
]

export const megaMenus = {
  men: {
    links: menLinks,
    promo: {
      image: campaign.megaMen,
      eyebrow: 'The Modern Man',
      title: 'Everyday essentials. Elevated style.',
      to: '/collections/men',
      cta: 'Shop Men',
    },
  },
  women: {
    links: womenLinks,
    promo: {
      image: campaign.megaWomen,
      eyebrow: 'The Modern Woman',
      title: 'Confident looks for every moment.',
      to: '/collections/women',
      cta: 'Shop Women',
    },
  },
  collections: {
    links: [
      { label: 'New Arrivals', to: '/collections/new-arrivals' },
      { label: 'Best Sellers', to: '/collections/best-sellers' },
      { label: 'Sale', to: '/collections/sale' },
      { label: 'Streetwear Edit', to: '/search?q=streetwear' },
      { label: 'Smart Casual Edit', to: '/search?q=smart%20casual' },
      { label: 'Premium Edit', to: '/search?q=premium' },
    ],
    promo: {
      image: campaign.megaCollections,
      eyebrow: 'Curated edits',
      title: 'Less ordinary. More you.',
      to: '/collections/new-arrivals',
      cta: 'Explore',
    },
  },
}

/** Left-hand desktop navigation. `menu` links an item to a mega menu. */
export const mainNav = [
  { label: "Men's", to: '/collections/men', menu: 'men' },
  { label: "Women's", to: '/collections/women', menu: 'women' },
  { label: 'New Arrivals', to: '/collections/new-arrivals' },
  { label: 'Collections', to: '/collections/best-sellers', menu: 'collections' },
  { label: 'Sale', to: '/collections/sale', sale: true },
]

export const footerNav = [
  {
    title: 'Shop',
    links: [
      { label: 'Men', to: '/collections/men' },
      { label: 'Women', to: '/collections/women' },
      { label: 'New Arrivals', to: '/collections/new-arrivals' },
      { label: 'Best Sellers', to: '/collections/best-sellers' },
      { label: 'Sale', to: '/collections/sale' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Shipping', to: '/shipping-returns#shipping' },
      { label: 'Returns', to: '/shipping-returns#returns' },
      { label: 'Size Guide', to: '/faq#sizing' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'Sustainability', to: '/about#commitment' },
      { label: 'Careers', to: '/contact?subject=Careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms and Conditions', to: '/terms' },
    ],
  },
]
