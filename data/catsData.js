const img = (id) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=1200&h=1200`;

export const catsData = [
  {
    id: "miso",
    name: "Miso",
    age: "2 yrs",
    personality: ["lap cat", "whispery meow", "treat negotiator"],
    adoptionStatus: "available",
    image: img("photo-1518791841217-8f162f1e1131"),
  },
  {
    id: "waffles",
    name: "Waffles",
    age: "1 yr",
    personality: ["chaos", "parkour", "dramatic naps"],
    adoptionStatus: "available",
    image: img("photo-1533738363-b7f9aef128ce"),
  },
  {
    id: "sunny",
    name: "Sunny",
    age: "3 yrs",
    personality: ["window warmer", "photogenic", "purr machine"],
    adoptionStatus: "fostered",
    image: img("photo-1573865526739-10659fec78a5"),
  },
  {
    id: "mao",
    name: "Mao",
    age: "5 yrs",
    personality: ["cafe supervisor", "greets everyone", "strict nap schedule"],
    adoptionStatus: "adopted",
    image: img("photo-1495360010541-f48722b34f7d"),
  },
  {
    id: "fig",
    name: "Fig",
    age: "1 yr",
    personality: ["explorer", "yarn connoisseur", "tiny bell"],
    adoptionStatus: "available",
    image: img("photo-1529778873920-4da4926a72c2"),
  },
  {
    id: "hazel",
    name: "Hazel",
    age: "4 yrs",
    personality: ["biscuit maker", "side sleeper", "slow blinker"],
    adoptionStatus: "available",
    image: img("photo-1514888286974-6c03e2ca1dba"),
  },
];
