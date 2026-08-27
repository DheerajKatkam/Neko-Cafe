const img = (id, w = 1200, h = 900) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=${w}&h=${h}`;

export const happeningsData = [
  {
    id: "caturday",
    title: "Caturday Adoption Day",
    schedule: "Every Saturday · 11am – 4pm",
    description:
      "Meet adoptable cats from our shelter partner. Adoption fees are waived after 2pm for any cat who finds their human.",
    image: img("photo-1561948955-570b270e7c36"),
    cta: { label: "See who's adoptable", href: "#cats" },
  },
  {
    id: "meow-mondays",
    title: "Meow Mondays",
    schedule: "Every Monday · after 4pm",
    description:
      "Order any latte after 4pm and get a complimentary cat-shaped cookie. Slow evenings, fast friends.",
    image: img("photo-1495474472287-4d71bcdd2085"),
    cta: { label: "Plan your Monday", href: "#book" },
  },
  {
    id: "kitten-story-time",
    title: "Kitten Story Time",
    schedule: "First Sunday of the month · 10:30am",
    description:
      "A storytelling hour with the newest kittens in residence. Best for little humans — blankets provided.",
    image: img("photo-1543852786-1cf6624b9987"),
    cta: { label: "Reserve a cushion", href: "#book" },
  },
];
