/**
 * Pexels images for category sections (carousels)
 * Scenic: beaches, mountains, fjords | Historic: Rome, Cotswolds, temples | Exotic: beaches, Morocco, mountains
 */

const PEX = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

export const SCENIC_CAROUSEL = [
  PEX(1285625),
  PEX(417173),
  PEX(2662116),
  PEX(1174732),
];

export const HISTORIC_CAROUSEL = [
  PEX(696205),
  PEX(2823456),
  PEX(318238),
  PEX(1745747),
];

export const EXOTIC_CAROUSEL = [
  PEX(1285625),
  PEX(696205),
  PEX(417173),
  PEX(1580173),
];
