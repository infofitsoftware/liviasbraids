export const SALON_NAME = "Livia’s Braids";

export const ADDRESS =
  "4003 Warner Avenue, Hyattsville, Maryland 20784";

export const OPENING_HOURS = "Monday – Sunday, 8:00 AM – 8:00 PM";

// ----------------------------
// SERVICES
// ----------------------------

export type Service = {
  name: string;
  description: string;
  tag?: string;
};

export const services: Service[] = [
  {
    name: "Knotless Braids",
    description:
      "Lightweight, painless and natural-looking braids gentle on your scalp.",
    tag: "Popular",
  },
  {
    name: "Crochet Braids",
    description:
      "Fast, protective style with versatile texture options.",
  },
  {
    name: "Twist Braids",
    description:
      "Beautiful rope-like twists that protect natural hair.",
  },
  {
    name: "Passion Twists",
    description:
      "Soft, boho-inspired twists with a romantic natural flow.",
  },
  {
    name: "Natural Hair Twists",
    description:
      "Defined twists using your own natural hair — no extensions.",
  },
  {
    name: "Cornrows",
    description:
      "Clean, stylish cornrows including straight-backs and designs.",
  },
  {
    name: "Kids Braids",
    description:
      "Neat, gentle, kid-friendly braids that last longer.",
  },
  {
    name: "French Braids & French Curls",
    description:
      "Elegant & classic styles for all occasions.",
  },
  {
    name: "Box Braids",
    description:
      "Timeless braids with clean parts and long-lasting wear.",
  },
  {
    name: "Boho / Goddess Braids",
    description:
      "Trendy curly, boho-inspired braid look.",
  },
];

// ----------------------------
// GALLERY – 13 IMAGES, NO NAMES
// ----------------------------

export type GalleryItem = {
  id: number;
  image: string;
};

export const galleryItems: GalleryItem[] = [
  { id: 1, image: "/images/1.jpg" },
  { id: 2, image: "/images/2.jpg" },
  { id: 3, image: "/images/3.jpg" },
  { id: 4, image: "/images/4.jpg" },
  { id: 5, image: "/images/5.jpg" },
  { id: 6, image: "/images/6.jpg" },
  { id: 7, image: "/images/7.jpg" },
  { id: 8, image: "/images/8.jpg" },
  { id: 9, image: "/images/9.jpg" },
  { id: 10, image: "/images/10.jpg" },
  { id: 11, image: "/images/11.jpg" },
  { id: 12, image: "/images/12.jpg" },
  { id: 13, image: "/images/13.jpg" },
];
