export type ProductCategory =
  | "Face Care"
  | "Body Care"
  | "Cleansers"
  | "Hair & Scalp"
  | "Gift Sets"

export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  image: string
  category: ProductCategory
  badge?: "Bestseller" | "New" | "Save" | "Luxury"
  rating: number
  reviews: number
  ingredients: string[]
  keyBenefits: string[]
  description: string
  howToUse: string
  skinTypes: string[]
  isVegan: boolean
  isCrueltyFree: boolean
  size: string
  inStock: boolean
}

export const FREE_SHIPPING_THRESHOLD = 50
export const STANDARD_SHIPPING_COST = 4.99

export const CATEGORIES: ("All" | ProductCategory)[] = [
  "All",
  "Face Care",
  "Body Care",
  "Cleansers",
  "Hair & Scalp",
  "Gift Sets",
]

export const PRODUCTS: Product[] = [
  {
    id: "gro-collection",
    name: "GRO Collection",
    subtitle: "Hair & Scalp Care",
    price: 49.99,
    originalPrice: 59.99,
    image: "/images/pink-collection.jpg",
    category: "Hair & Scalp",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 243,
    ingredients: [
      "Australian Kakadu Plum",
      "Vitamin C",
      "Rosemary Leaf Extract",
      "Native Botanical Extracts",
    ],
    keyBenefits: [
      "Promotes hair growth",
      "Strengthens hair follicles",
      "Reduces hair fall",
      "Natural shine and volume",
    ],
    description:
      "Our GRO Collection is formulated with powerful Australian botanicals to nourish your scalp and promote healthy hair growth. Enriched with Vitamin C-rich Kakadu Plum, this range delivers visible results in 8 weeks.",
    howToUse:
      "Apply GRO Hair Serum to scalp daily. Massage gently for 2 minutes. Use GRO Shampoo and Conditioner regularly for best results.",
    skinTypes: ["All hair types", "Dry scalp", "Thinning hair"],
    isVegan: true,
    isCrueltyFree: true,
    size: "50ml",
    inStock: true,
  },
  {
    id: "essentials",
    name: "ESSENTIALS",
    subtitle: "Daily Skincare Trio",
    price: 34.99,
    image: "/images/modern-skincare.jpg",
    category: "Face Care",
    badge: "Bestseller",
    rating: 4.7,
    reviews: 312,
    ingredients: [
      "Organic Aloe Vera",
      "Natural Vitamin E",
      "Finger Lime Extract",
      "Jojoba Esters",
    ],
    keyBenefits: [
      "Daily hydration",
      "Skin barrier protection",
      "Gentle for sensitive skin",
      "Long-lasting moisture",
    ],
    description:
      "The essential daily skincare routine for healthy, radiant skin. This curated set includes a cleanser, hydrating mist, and daily moisturizer infused with soothing Aloe Vera and protective Vitamin E.",
    howToUse:
      "Cleanse morning and night. Apply hydrating mist after cleansing. Follow with moisturizer to lock in hydration.",
    skinTypes: ["All skin types", "Sensitive skin", "Dehydrated skin"],
    isVegan: true,
    isCrueltyFree: true,
    size: "Travel size set",
    inStock: true,
  },
  {
    id: "luxury",
    name: "LUXURY",
    subtitle: "24K Botanical Elixir",
    price: 89.99,
    originalPrice: 109.99,
    image: "/images/luxury-collection.jpg",
    category: "Face Care",
    badge: "Luxury",
    rating: 4.9,
    reviews: 187,
    ingredients: [
      "Premium Botanical Oils",
      "Rare Australian Extracts",
      "24K Gold Flakes",
      "Macadamia Seed Oil",
    ],
    keyBenefits: [
      "Luxurious treatment experience",
      "Visible anti-aging benefits",
      "Deep nourishment",
      "Radiant complexion",
    ],
    description:
      "Our most premium collection, featuring rare Australian botanicals and luxury ingredients including 24K gold flakes for a truly decadent skincare experience.",
    howToUse:
      "Warm 2-3 drops between fingertips and press gently onto clean skin morning and evening. Follow with your daily cream.",
    skinTypes: ["Mature skin", "Dry skin", "Normal to combination"],
    isVegan: false,
    isCrueltyFree: true,
    size: "30ml",
    inStock: true,
  },
  {
    id: "gro-essentials",
    name: "GRO ESSENTIALS",
    subtitle: "Growth & Care Bundle",
    price: 64.99,
    originalPrice: 79.99,
    image: "/images/product-flat-lay.jpg",
    category: "Gift Sets",
    badge: "Save",
    rating: 4.6,
    reviews: 156,
    ingredients: [
      "Biotin",
      "Rosemary Oil",
      "Kakadu Plum",
      "Organic Aloe Vera",
    ],
    keyBenefits: [
      "Dual action hair and skin",
      "Strengthens and nourishes",
      "Visible results in 4 weeks",
      "Value bundle savings",
    ],
    description:
      "The ultimate growth bundle combining our best-selling hair care and skincare products. A complete routine for total botanical beauty enhancement.",
    howToUse:
      "Use GRO Hair Serum daily and GRO Shampoo 2-3x weekly. Apply Essential Moisturizer twice daily on cleansed skin.",
    skinTypes: ["All types", "Dry", "Mature"],
    isVegan: true,
    isCrueltyFree: true,
    size: "Combo pack",
    inStock: true,
  },
  {
    id: "kakadu-brightening-cleanser",
    name: "Kakadu Brightening Cleanser",
    subtitle: "Gentle Gel Wash",
    price: 26.99,
    image: "/images/hero-products.jpg",
    category: "Cleansers",
    badge: "New",
    rating: 4.8,
    reviews: 128,
    ingredients: [
      "Kakadu Plum",
      "Desert Lime",
      "Chamomile Hydrosol",
      "Glycerin",
    ],
    keyBenefits: [
      "Removes impurities gently",
      "Brightens dull skin",
      "Non-stripping pH balance",
      "Soothes redness",
    ],
    description:
      "A refreshing botanical gel cleanser powered by wild-harvested Kakadu Plum and Desert Lime that melts away daily buildup while respecting your skin barrier.",
    howToUse:
      "Massage 1-2 pumps onto damp skin in circular motions for 30 seconds, then rinse with lukewarm water.",
    skinTypes: ["All skin types", "Dull skin", "Combination skin"],
    isVegan: true,
    isCrueltyFree: true,
    size: "150ml",
    inStock: true,
  },
  {
    id: "tasmanian-kelp-body-balm",
    name: "Tasmanian Kelp Body Balm",
    subtitle: "Deep Moisture Body Cream",
    price: 38.5,
    image: "/images/product-flat-lay.jpg",
    category: "Body Care",
    rating: 4.7,
    reviews: 94,
    ingredients: [
      "Tasmanian Sea Kelp",
      "Shea Butter",
      "Eucalyptus Leaf Oil",
      "Sweet Almond Oil",
    ],
    keyBenefits: [
      "48-hour body hydration",
      "Silky fast-absorbing finish",
      "Calms dry patches",
      "Subtle coastal botanical scent",
    ],
    description:
      "Rich yet weightless body balm infused with mineral-dense Tasmanian sea kelp and whipped botanical butters to leave skin supple and glowing.",
    howToUse:
      "Apply generously to clean, towel-dried skin after showering, focusing on elbows, knees, and dry areas.",
    skinTypes: ["Dry skin", "Normal skin", "Sensitive skin"],
    isVegan: true,
    isCrueltyFree: true,
    size: "200ml",
    inStock: true,
  },
  {
    id: "botanical-hydrating-serum",
    name: "Australian Botanical Serum",
    subtitle: "Hyaluronic + Lilly Pilly",
    price: 44.0,
    originalPrice: 52.0,
    image: "/images/modern-skincare.jpg",
    category: "Face Care",
    badge: "Save",
    rating: 4.9,
    reviews: 215,
    ingredients: [
      "Lilly Pilly Extract",
      "Plant Hyaluronic Acid",
      "Niacinamide",
      "Davidson Plum",
    ],
    keyBenefits: [
      "Plumps fine lines",
      "Locks in multi-layer moisture",
      "Evens skin tone",
      "Boosts natural radiance",
    ],
    description:
      "A potent water-light hydration serum combining plant-derived hyaluronic acid with antioxidant-rich Lilly Pilly for glass-skin luminosity.",
    howToUse:
      "Apply 3-4 drops to damp face and neck morning and night before your moisturizer.",
    skinTypes: ["All skin types", "Dehydrated skin", "Blemish-prone"],
    isVegan: true,
    isCrueltyFree: true,
    size: "30ml",
    inStock: true,
  },
  {
    id: "coastal-glow-gift-set",
    name: "Coastal Glow Gift Set",
    subtitle: "4-Piece Ritual Box",
    price: 74.99,
    originalPrice: 92.0,
    image: "/images/hero-products.jpg",
    category: "Gift Sets",
    badge: "Save",
    rating: 4.9,
    reviews: 141,
    ingredients: [
      "Kakadu Plum",
      "Rose Quartz Gua Sha",
      "Aloe Vera",
      "Tasmanian Kelp",
    ],
    keyBenefits: [
      "Complete AM/PM ritual",
      "Includes facial sculpting tool",
      "Gift-ready eco packaging",
      "18% bundle savings",
    ],
    description:
      "Our signature botanical ritual packaged in a recyclable keepsake box—featuring our Brightening Cleanser, Botanical Serum, Daily Moisturizer, and sculpting facial roller.",
    howToUse:
      "Cleanse, apply serum, and glide the facial tool upward along jawline and cheekbones before sealing with moisturizer.",
    skinTypes: ["All skin types"],
    isVegan: true,
    isCrueltyFree: true,
    size: "4-Piece Gift Box",
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function formatPrice(amount: number): string {
  return `£${amount.toFixed(2)}`
}
