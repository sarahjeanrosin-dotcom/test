import { seasonalProduce, ProduceItem, Region, Season, DietType, CuisineStyle, Budget } from "./seasonal-data";

export interface FormData {
  zipcode: string;
  familySize: number;
  allergies: string[];        // free-text tags
  dietType: DietType;
  cuisineStyle: CuisineStyle | "any";
  budget: Budget;
  organicOnly: boolean;
}

export interface GroceryItem {
  name: string;
  type: "vegetable" | "fruit";
  quantity: number;
  unit: string;
  organic: boolean;
}

function formatQuantity(qty: number, unit: string): string {
  const rounded = Math.ceil(qty * 2) / 2; // round up to nearest 0.5
  return `${rounded} ${unit}${rounded !== 1 ? (unit.endsWith("s") ? "" : "s") : ""}`;
}

function itemMatchesDiet(item: ProduceItem, diet: DietType): boolean {
  switch (diet) {
    case "keto":
      return !item.highCarb;
    case "paleo":
      return !item.isLegume;
    default:
      return true; // vegan/vegetarian/omnivore — all produce is fine
  }
}

function itemMatchesAllergies(item: ProduceItem, allergies: string[]): boolean {
  if (!allergies.length) return true;
  const lowerAllergies = allergies.map((a) => a.toLowerCase().trim());
  return !item.allergyTags.some((tag) =>
    lowerAllergies.some((a) => tag.toLowerCase().includes(a) || a.includes(tag.toLowerCase()))
  );
}

function itemNameMatchesAllergies(item: ProduceItem, allergies: string[]): boolean {
  if (!allergies.length) return true;
  const lowerAllergies = allergies.map((a) => a.toLowerCase().trim());
  const itemName = item.name.toLowerCase();
  return !lowerAllergies.some((a) => a.length > 2 && itemName.includes(a));
}

function itemMatchesBudget(item: ProduceItem, budget: Budget): boolean {
  if (budget === "budget" && item.premiumOnly) return false;
  return true;
}

function getCuisineScore(item: ProduceItem, cuisine: CuisineStyle | "any"): number {
  if (cuisine === "any") return 1;
  return item.cuisines.includes(cuisine) ? 2 : 1;
}

export function generateGroceryList(
  region: Region,
  season: Season,
  form: FormData
): GroceryItem[] {
  const produce = seasonalProduce[region][season];

  const filtered = produce.filter((item) => {
    if (!itemMatchesDiet(item, form.dietType)) return false;
    if (!itemMatchesAllergies(item, form.allergies)) return false;
    if (!itemNameMatchesAllergies(item, form.allergies)) return false;
    if (!itemMatchesBudget(item, form.budget)) return false;
    return true;
  });

  // Sort by cuisine relevance
  const sorted = [...filtered].sort((a, b) => {
    const scoreA = getCuisineScore(a, form.cuisineStyle);
    const scoreB = getCuisineScore(b, form.cuisineStyle);
    return scoreB - scoreA;
  });

  return sorted.map((item) => ({
    name: item.name,
    type: item.type,
    quantity: item.baseQtyPerPerson * form.familySize,
    unit: item.unit,
    organic: form.organicOnly,
  }));
}

export function formatItemQuantity(item: GroceryItem): string {
  const qty = Math.ceil(item.quantity * 2) / 2;
  const plural = qty !== 1 && !item.unit.endsWith("s") ? "s" : "";
  return `${qty % 1 === 0 ? qty : qty.toFixed(1)} ${item.unit}${plural}`;
}
