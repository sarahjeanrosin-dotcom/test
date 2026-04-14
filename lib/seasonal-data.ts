export type Region = "northeast" | "southeast" | "midwest" | "south" | "mountain" | "pacific";
export type Season = "spring" | "summer" | "fall" | "winter";
export type DietType = "omnivore" | "vegetarian" | "vegan" | "paleo" | "keto";
export type CuisineStyle = "american" | "mediterranean" | "asian" | "latin" | "middleeastern";
export type Budget = "budget" | "moderate" | "premium";

export interface ProduceItem {
  name: string;
  type: "vegetable" | "fruit";
  baseQtyPerPerson: number; // per week
  unit: string;
  cuisines: CuisineStyle[];
  allergyTags: string[];
  premiumOnly?: boolean;
  highCarb?: boolean; // flag for keto filtering
  isLegume?: boolean; // flag for paleo filtering
  isNightshade?: boolean;
}

// Seasonal produce by region and season
export const seasonalProduce: Record<Region, Record<Season, ProduceItem[]>> = {
  northeast: {
    spring: [
      { name: "Asparagus", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Spinach", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bag", cuisines: ["american", "mediterranean", "asian", "middleeastern"], allergyTags: [] },
      { name: "Peas", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "asian"], allergyTags: [], isLegume: true },
      { name: "Radishes", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "asian", "latin"], allergyTags: [] },
      { name: "Rhubarb", type: "fruit", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [] },
      { name: "Lettuce", type: "vegetable", baseQtyPerPerson: 1, unit: "head", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Green Onions", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bunch", cuisines: ["american", "asian", "latin"], allergyTags: [] },
      { name: "Strawberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
    summer: [
      { name: "Zucchini", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean", "latin"], allergyTags: [] },
      { name: "Tomatoes", type: "vegetable", baseQtyPerPerson: 0.75, unit: "lb", cuisines: ["american", "mediterranean", "latin"], allergyTags: [], isNightshade: true },
      { name: "Corn", type: "vegetable", baseQtyPerPerson: 1, unit: "ear", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Cucumbers", type: "vegetable", baseQtyPerPerson: 1, unit: "cucumber", cuisines: ["american", "mediterranean", "asian", "middleeastern"], allergyTags: [] },
      { name: "Bell Peppers", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean", "latin", "asian"], allergyTags: [], isNightshade: true },
      { name: "Blueberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american"], allergyTags: [] },
      { name: "Peaches", type: "fruit", baseQtyPerPerson: 2, unit: "peach", cuisines: ["american", "mediterranean"], allergyTags: ["stone fruit"] },
      { name: "Basil", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Eggplant", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["mediterranean", "asian", "middleeastern"], allergyTags: [], isNightshade: true },
    ],
    fall: [
      { name: "Butternut Squash", type: "vegetable", baseQtyPerPerson: 0.5, unit: "squash", cuisines: ["american", "mediterranean"], allergyTags: [], highCarb: true },
      { name: "Kale", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Brussels Sprouts", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Apples", type: "fruit", baseQtyPerPerson: 2, unit: "apple", cuisines: ["american"], allergyTags: [] },
      { name: "Beets", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bunch", cuisines: ["american", "mediterranean", "middleeastern"], allergyTags: [] },
      { name: "Sweet Potatoes", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Pears", type: "fruit", baseQtyPerPerson: 2, unit: "pear", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Cauliflower", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "mediterranean", "middleeastern"], allergyTags: [] },
    ],
    winter: [
      { name: "Parsnips", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Turnips", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [] },
      { name: "Winter Squash", type: "vegetable", baseQtyPerPerson: 0.5, unit: "squash", cuisines: ["american", "mediterranean"], allergyTags: [], highCarb: true },
      { name: "Stored Apples", type: "fruit", baseQtyPerPerson: 2, unit: "apple", cuisines: ["american"], allergyTags: [] },
      { name: "Cabbage", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "asian", "latin"], allergyTags: [] },
      { name: "Leeks", type: "vegetable", baseQtyPerPerson: 1, unit: "leek", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Root Vegetables Mix", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
  },
  southeast: {
    spring: [
      { name: "Strawberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Vidalia Onions", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Snap Peas", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "asian"], allergyTags: [], isLegume: true },
      { name: "Asparagus", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Lettuce", type: "vegetable", baseQtyPerPerson: 1, unit: "head", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Blueberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american"], allergyTags: [] },
    ],
    summer: [
      { name: "Peaches", type: "fruit", baseQtyPerPerson: 2, unit: "peach", cuisines: ["american", "mediterranean"], allergyTags: ["stone fruit"] },
      { name: "Watermelon", type: "fruit", baseQtyPerPerson: 0.25, unit: "melon", cuisines: ["american"], allergyTags: [], highCarb: true },
      { name: "Tomatoes", type: "vegetable", baseQtyPerPerson: 0.75, unit: "lb", cuisines: ["american", "mediterranean", "latin"], allergyTags: [], isNightshade: true },
      { name: "Okra", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [] },
      { name: "Sweet Corn", type: "vegetable", baseQtyPerPerson: 1, unit: "ear", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Blackberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american"], allergyTags: [] },
      { name: "Cucumbers", type: "vegetable", baseQtyPerPerson: 1, unit: "cucumber", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Muscadine Grapes", type: "fruit", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [] },
    ],
    fall: [
      { name: "Sweet Potatoes", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Collard Greens", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american"], allergyTags: [] },
      { name: "Peanuts", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "asian"], allergyTags: ["peanuts"], isLegume: true },
      { name: "Persimmons", type: "fruit", baseQtyPerPerson: 2, unit: "persimmon", cuisines: ["american", "asian"], allergyTags: [] },
      { name: "Pumpkin", type: "vegetable", baseQtyPerPerson: 0.25, unit: "pumpkin", cuisines: ["american"], allergyTags: [], highCarb: true },
      { name: "Turnip Greens", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american"], allergyTags: [] },
    ],
    winter: [
      { name: "Citrus", type: "fruit", baseQtyPerPerson: 3, unit: "orange", cuisines: ["american", "mediterranean"], allergyTags: ["citrus"] },
      { name: "Broccoli", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "mediterranean", "asian"], allergyTags: [] },
      { name: "Kale", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Cabbage", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "asian"], allergyTags: [] },
      { name: "Brussels Sprouts", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
  },
  midwest: {
    spring: [
      { name: "Morel Mushrooms", type: "vegetable", baseQtyPerPerson: 0.25, unit: "lb", cuisines: ["american"], allergyTags: [], premiumOnly: true },
      { name: "Ramps (Wild Leeks)", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bunch", cuisines: ["american"], allergyTags: [] },
      { name: "Asparagus", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Spinach", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bag", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Radishes", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "asian"], allergyTags: [] },
      { name: "Strawberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american"], allergyTags: [] },
    ],
    summer: [
      { name: "Sweet Corn", type: "vegetable", baseQtyPerPerson: 2, unit: "ear", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Tomatoes", type: "vegetable", baseQtyPerPerson: 0.75, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [], isNightshade: true },
      { name: "Zucchini", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Green Beans", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [], isLegume: true },
      { name: "Blueberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american"], allergyTags: [] },
      { name: "Raspberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american"], allergyTags: [] },
      { name: "Cucumbers", type: "vegetable", baseQtyPerPerson: 1, unit: "cucumber", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
    fall: [
      { name: "Apples", type: "fruit", baseQtyPerPerson: 2, unit: "apple", cuisines: ["american"], allergyTags: [] },
      { name: "Pumpkin", type: "vegetable", baseQtyPerPerson: 0.25, unit: "pumpkin", cuisines: ["american"], allergyTags: [], highCarb: true },
      { name: "Butternut Squash", type: "vegetable", baseQtyPerPerson: 0.5, unit: "squash", cuisines: ["american", "mediterranean"], allergyTags: [], highCarb: true },
      { name: "Kale", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Brussels Sprouts", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [] },
      { name: "Beets", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Pears", type: "fruit", baseQtyPerPerson: 2, unit: "pear", cuisines: ["american"], allergyTags: [] },
    ],
    winter: [
      { name: "Stored Apples", type: "fruit", baseQtyPerPerson: 2, unit: "apple", cuisines: ["american"], allergyTags: [] },
      { name: "Winter Squash", type: "vegetable", baseQtyPerPerson: 0.5, unit: "squash", cuisines: ["american"], allergyTags: [], highCarb: true },
      { name: "Cabbage", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "asian"], allergyTags: [] },
      { name: "Parsnips", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [] },
      { name: "Carrots", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean", "asian"], allergyTags: [] },
      { name: "Onions", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean", "latin", "asian"], allergyTags: [] },
    ],
  },
  south: {
    spring: [
      { name: "Strawberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Asparagus", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Spinach", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bag", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Broccoli", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "asian"], allergyTags: [] },
      { name: "Lettuce", type: "vegetable", baseQtyPerPerson: 1, unit: "head", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
    summer: [
      { name: "Tomatoes", type: "vegetable", baseQtyPerPerson: 0.75, unit: "lb", cuisines: ["american", "mediterranean", "latin"], allergyTags: [], isNightshade: true },
      { name: "Jalapeños", type: "vegetable", baseQtyPerPerson: 2, unit: "pepper", cuisines: ["latin", "american"], allergyTags: [], isNightshade: true },
      { name: "Tomatillos", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["latin"], allergyTags: [], isNightshade: true },
      { name: "Chiles", type: "vegetable", baseQtyPerPerson: 2, unit: "chile", cuisines: ["latin", "middleeastern", "asian"], allergyTags: [], isNightshade: true },
      { name: "Watermelon", type: "fruit", baseQtyPerPerson: 0.25, unit: "melon", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Cantaloupe", type: "fruit", baseQtyPerPerson: 0.5, unit: "melon", cuisines: ["american"], allergyTags: [] },
      { name: "Peaches", type: "fruit", baseQtyPerPerson: 2, unit: "peach", cuisines: ["american"], allergyTags: ["stone fruit"] },
    ],
    fall: [
      { name: "Sweet Potatoes", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Pumpkin", type: "vegetable", baseQtyPerPerson: 0.25, unit: "pumpkin", cuisines: ["american"], allergyTags: [], highCarb: true },
      { name: "Pecans", type: "fruit", baseQtyPerPerson: 0.25, unit: "lb", cuisines: ["american"], allergyTags: ["tree nuts"], premiumOnly: true },
      { name: "Pomegranates", type: "fruit", baseQtyPerPerson: 1, unit: "pomegranate", cuisines: ["mediterranean", "middleeastern"], allergyTags: [] },
      { name: "Collard Greens", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "latin"], allergyTags: [] },
    ],
    winter: [
      { name: "Citrus Fruits", type: "fruit", baseQtyPerPerson: 3, unit: "fruit", cuisines: ["american", "mediterranean"], allergyTags: ["citrus"] },
      { name: "Grapefruit", type: "fruit", baseQtyPerPerson: 1, unit: "grapefruit", cuisines: ["american"], allergyTags: ["citrus"] },
      { name: "Broccoli", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "mediterranean", "asian"], allergyTags: [] },
      { name: "Cauliflower", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "mediterranean", "middleeastern"], allergyTags: [] },
      { name: "Kale", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
  },
  mountain: {
    spring: [
      { name: "Asparagus", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Spinach", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bag", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Radishes", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "asian"], allergyTags: [] },
      { name: "Arugula", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bag", cuisines: ["mediterranean"], allergyTags: [] },
      { name: "Peas", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "asian"], allergyTags: [], isLegume: true },
    ],
    summer: [
      { name: "Roasted Green Chiles", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["latin", "american"], allergyTags: [], isNightshade: true },
      { name: "Pinto Beans", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["latin", "american"], allergyTags: [], isLegume: true },
      { name: "Corn", type: "vegetable", baseQtyPerPerson: 1, unit: "ear", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Zucchini", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Tomatoes", type: "vegetable", baseQtyPerPerson: 0.75, unit: "lb", cuisines: ["american", "mediterranean", "latin"], allergyTags: [], isNightshade: true },
      { name: "Peaches", type: "fruit", baseQtyPerPerson: 2, unit: "peach", cuisines: ["american"], allergyTags: ["stone fruit"] },
      { name: "Apricots", type: "fruit", baseQtyPerPerson: 3, unit: "apricot", cuisines: ["american", "middleeastern"], allergyTags: ["stone fruit"] },
    ],
    fall: [
      { name: "Apples", type: "fruit", baseQtyPerPerson: 2, unit: "apple", cuisines: ["american"], allergyTags: [] },
      { name: "Pumpkin", type: "vegetable", baseQtyPerPerson: 0.25, unit: "pumpkin", cuisines: ["american"], allergyTags: [], highCarb: true },
      { name: "Butternut Squash", type: "vegetable", baseQtyPerPerson: 0.5, unit: "squash", cuisines: ["american", "mediterranean"], allergyTags: [], highCarb: true },
      { name: "Pears", type: "fruit", baseQtyPerPerson: 2, unit: "pear", cuisines: ["american"], allergyTags: [] },
      { name: "Beets", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Kale", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
    winter: [
      { name: "Stored Root Vegetables", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [] },
      { name: "Winter Squash", type: "vegetable", baseQtyPerPerson: 0.5, unit: "squash", cuisines: ["american"], allergyTags: [], highCarb: true },
      { name: "Cabbage", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american"], allergyTags: [] },
      { name: "Turnips", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american"], allergyTags: [] },
      { name: "Parsnips", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
  },
  pacific: {
    spring: [
      { name: "Asparagus", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Artichokes", type: "vegetable", baseQtyPerPerson: 1, unit: "artichoke", cuisines: ["mediterranean", "american"], allergyTags: [], premiumOnly: true },
      { name: "Fava Beans", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["mediterranean", "middleeastern"], allergyTags: [], isLegume: true },
      { name: "Strawberries", type: "fruit", baseQtyPerPerson: 1, unit: "pint", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Spinach", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bag", cuisines: ["american", "mediterranean", "asian"], allergyTags: [] },
      { name: "Peas", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "asian"], allergyTags: [], isLegume: true },
      { name: "Spring Onions", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bunch", cuisines: ["american", "asian", "latin"], allergyTags: [] },
    ],
    summer: [
      { name: "Tomatoes", type: "vegetable", baseQtyPerPerson: 0.75, unit: "lb", cuisines: ["american", "mediterranean", "latin"], allergyTags: [], isNightshade: true },
      { name: "Stone Fruit", type: "fruit", baseQtyPerPerson: 2, unit: "piece", cuisines: ["american", "mediterranean", "asian"], allergyTags: ["stone fruit"] },
      { name: "Corn", type: "vegetable", baseQtyPerPerson: 1, unit: "ear", cuisines: ["american", "latin"], allergyTags: [], highCarb: true },
      { name: "Avocado", type: "fruit", baseQtyPerPerson: 1, unit: "avocado", cuisines: ["latin", "american", "mediterranean"], allergyTags: ["latex-fruit"] },
      { name: "Figs", type: "fruit", baseQtyPerPerson: 4, unit: "fig", cuisines: ["mediterranean", "middleeastern"], allergyTags: [] },
      { name: "Basil", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bunch", cuisines: ["mediterranean", "american", "asian"], allergyTags: [] },
      { name: "Eggplant", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["mediterranean", "asian", "middleeastern"], allergyTags: [], isNightshade: true },
      { name: "Zucchini", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["mediterranean", "american"], allergyTags: [] },
    ],
    fall: [
      { name: "Pomegranates", type: "fruit", baseQtyPerPerson: 1, unit: "pomegranate", cuisines: ["mediterranean", "middleeastern"], allergyTags: [] },
      { name: "Persimmons", type: "fruit", baseQtyPerPerson: 2, unit: "persimmon", cuisines: ["american", "asian"], allergyTags: [] },
      { name: "Pears", type: "fruit", baseQtyPerPerson: 2, unit: "pear", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Winter Squash", type: "vegetable", baseQtyPerPerson: 0.5, unit: "squash", cuisines: ["american", "mediterranean"], allergyTags: [], highCarb: true },
      { name: "Broccoli", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "asian", "mediterranean"], allergyTags: [] },
      { name: "Kale", type: "vegetable", baseQtyPerPerson: 1, unit: "bunch", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Brussels Sprouts", type: "vegetable", baseQtyPerPerson: 0.5, unit: "lb", cuisines: ["american", "mediterranean"], allergyTags: [] },
    ],
    winter: [
      { name: "Citrus (Navel Oranges)", type: "fruit", baseQtyPerPerson: 3, unit: "orange", cuisines: ["american", "mediterranean"], allergyTags: ["citrus"] },
      { name: "Meyer Lemons", type: "fruit", baseQtyPerPerson: 2, unit: "lemon", cuisines: ["mediterranean", "asian"], allergyTags: ["citrus"] },
      { name: "Blood Oranges", type: "fruit", baseQtyPerPerson: 2, unit: "orange", cuisines: ["mediterranean"], allergyTags: ["citrus"], premiumOnly: true },
      { name: "Broccoli", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "asian", "mediterranean"], allergyTags: [] },
      { name: "Cauliflower", type: "vegetable", baseQtyPerPerson: 0.5, unit: "head", cuisines: ["american", "mediterranean"], allergyTags: [] },
      { name: "Fennel", type: "vegetable", baseQtyPerPerson: 0.5, unit: "bulb", cuisines: ["mediterranean"], allergyTags: [] },
      { name: "Leeks", type: "vegetable", baseQtyPerPerson: 1, unit: "leek", cuisines: ["mediterranean", "american"], allergyTags: [] },
    ],
  },
};
