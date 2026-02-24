/**
 * Pexels + Unsplash images for category sections (carousels)
 * Verified URLs for reliable loading
 */

const PEX = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
const UNSPLASH = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=85`;

export const SCENIC_CAROUSEL = [
  PEX(1285625),
  PEX(417173),
  PEX(2662116),
  PEX(1174732),
];

export const HISTORIC_CAROUSEL = [
  UNSPLASH('1552832238-c57a7197761c'),
  PEX(4394220),
  UNSPLASH('1587595431973-160d0d94add1'),
  UNSPLASH('1539650116574-8efeb43e2750'),
];

export const EXOTIC_CAROUSEL = [
  PEX(1285625),
  PEX(30179958),
  PEX(417173),
  PEX(3355777),
];
