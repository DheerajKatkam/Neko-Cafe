const img = (id, w = 1200, h = 900) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=${w}&h=${h}`;

export const menuData = {
  pours: [
    {
      id: "miso-matcha",
      name: "Miso Matcha",
      price: "6",
      description: "Stone-ground matcha, oat milk, a tiny wink of honey.",
      image: img("photo-1515823064-d6e0c04616a7", 400, 300),
    },
    {
      id: "slow-drip",
      name: "The Slow Drip",
      price: "5",
      description: "Single-origin beans, brewed while you pet a lap cat.",
      image: img("photo-1495474472287-4d71bcdd2085", 400, 300),
    },
    {
      id: "kitten-cappuccino",
      name: "Kitten Cappuccino",
      price: "5.5",
      description: "Steamed milk with a paw-print cocoa dusting.",
      image: img("photo-1541167760496-1628856ab772", 400, 300),
    },
  ],
  bites: [
    {
      id: "croissant-chaud",
      name: "Croissant Chaud",
      price: "4",
      description: "Butter-laminated, warmed, split with jam.",
      image: img("photo-1555507036-ab1f4038808a", 400, 300),
    },
    {
      id: "cat-buns",
      name: "Cat-Shaped Buns",
      price: "7",
      description: "Soft milk buns with a surprise filling.",
      image: img("photo-1509440159596-0249088772ff", 400, 300),
    },
    {
      id: "soup-of-the-day",
      name: "Soup of the Day",
      price: "9",
      description: "Seasonal vegetables, house stock, crusty bread.",
      image: img("photo-1547592166-23ac45744acd", 400, 300),
    },
  ],
  catTreats: [
    {
      id: "churu-chaser",
      name: "Churu Chaser",
      price: "3",
      description: "A lickable tube — the highest form of diplomacy.",
      image: img("photo-1583511655857-d19b40a7a54e", 400, 300),
    },
    {
      id: "catnip-cookie",
      name: "Catnip Cookie",
      price: "3",
      description: "Baked daily, adored immediately.",
      image: img("photo-1533738363-b7f9aef128ce", 400, 300),
    },
    {
      id: "feather-and-crunch",
      name: "Feather & Crunch",
      price: "4",
      description: "A tiny crunchy cup for the feline regulars.",
      image: img("photo-1573865526739-10659fec78a5", 400, 300),
    },
  ],
};

export const menuTeaserImages = [
  {
    id: "pour",
    label: "The Pours",
    image: img("photo-1509042239860-f550ce710b93", 1000, 1200),
    aspect: "tall",
  },
  {
    id: "bites",
    label: "The Bites",
    image: img("photo-1511690743698-d9d85f2fbf38", 1000, 1200),
    aspect: "tall",
  },
  {
    id: "kitchen",
    label: "The Kitchen",
    image: img("photo-1546069901-ba9599a7e63c", 1200, 1000),
    aspect: "wide",
  },
];
