import { Region } from "./seasonal-data";

// Map zipcode prefixes (first 3 digits) to US regions
// Based on USPS zone assignments
export function getRegionFromZipcode(zipcode: string): Region | null {
  const cleaned = zipcode.replace(/\D/g, "");
  if (cleaned.length < 5) return null;

  const prefix = parseInt(cleaned.substring(0, 3), 10);

  // Northeast: CT, MA, ME, NH, NJ, NY, PA, RI, VT
  if (prefix >= 0 && prefix <= 99) return "northeast";   // CT, MA, ME, NH, RI, VT, NY
  if (prefix >= 100 && prefix <= 199) return "northeast"; // NY, PA
  if (prefix >= 200 && prefix <= 218) return "northeast"; // DC, MD, DE, VA
  if (prefix >= 220 && prefix <= 246) return "northeast"; // VA, WV

  // Southeast: AL, FL, GA, MS, NC, SC, TN
  if (prefix >= 247 && prefix <= 268) return "southeast"; // WV, VA (border)
  if (prefix >= 270 && prefix <= 289) return "southeast"; // NC, SC
  if (prefix >= 290 && prefix <= 319) return "southeast"; // SC, GA, FL
  if (prefix >= 320 && prefix <= 349) return "southeast"; // FL
  if (prefix >= 350 && prefix <= 399) return "southeast"; // AL, MS, TN, GA

  // Midwest: IA, IL, IN, KS, KY, MI, MN, MO, ND, NE, OH, SD, WI
  if (prefix >= 400 && prefix <= 499) return "midwest"; // KY, IN, OH, MI
  if (prefix >= 500 && prefix <= 599) return "midwest"; // IA, WI, MN, ND, SD
  if (prefix >= 600 && prefix <= 699) return "midwest"; // IL, MO, KS, NE

  // South: AR, LA, OK, TX
  if (prefix >= 700 && prefix <= 799) return "south"; // LA, AR, OK, TX

  // Mountain: AZ, CO, ID, MT, NM, NV, UT, WY
  if (prefix >= 800 && prefix <= 899) return "mountain"; // CO, WY, ID, MT, AZ, NM, NV, UT

  // Pacific: AK, CA, HI, OR, WA
  if (prefix >= 900 && prefix <= 999) return "pacific"; // CA, OR, WA, AK, HI

  return null;
}

export function getRegionLabel(region: Region): string {
  const labels: Record<Region, string> = {
    northeast: "Northeast",
    southeast: "Southeast",
    midwest: "Midwest",
    south: "South / Southwest",
    mountain: "Mountain West",
    pacific: "Pacific / West Coast",
  };
  return labels[region];
}

export function getCurrentSeason(): "spring" | "summer" | "fall" | "winter" {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return "spring";  // Mar-May
  if (month >= 5 && month <= 7) return "summer";  // Jun-Aug
  if (month >= 8 && month <= 10) return "fall";   // Sep-Nov
  return "winter";                                  // Dec-Feb
}
