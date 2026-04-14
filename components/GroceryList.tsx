"use client";

import { GroceryItem, formatItemQuantity } from "@/lib/grocery-generator";
import { Region, Season } from "@/lib/seasonal-data";
import { getRegionLabel } from "@/lib/zipcode-region";

interface Props {
  items: GroceryItem[];
  region: Region;
  season: Season;
  familySize: number;
  zipcode: string;
  organicOnly: boolean;
  onDownloadPDF: () => void;
}

const seasonColors: Record<Season, string> = {
  spring: "bg-green-100 text-green-800",
  summer: "bg-yellow-100 text-yellow-800",
  fall: "bg-orange-100 text-orange-800",
  winter: "bg-blue-100 text-blue-800",
};

const seasonEmoji: Record<Season, string> = {
  spring: "🌱",
  summer: "☀️",
  fall: "🍂",
  winter: "❄️",
};

export default function GroceryList({
  items,
  region,
  season,
  familySize,
  zipcode,
  organicOnly,
  onDownloadPDF,
}: Props) {
  const vegetables = items.filter((i) => i.type === "vegetable");
  const fruits = items.filter((i) => i.type === "fruit");

  return (
    <div id="grocery-list-print" className="space-y-4">
      {/* Header info */}
      <div className={`rounded-xl p-4 ${seasonColors[season]}`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide opacity-70">
              {seasonEmoji[season]} {season.charAt(0).toUpperCase() + season.slice(1)} Produce
            </p>
            <h2 className="text-lg font-bold">
              {getRegionLabel(region)}
            </h2>
            <p className="text-sm opacity-80">
              Zipcode {zipcode} &bull; {familySize} {familySize === 1 ? "person" : "people"}
              {organicOnly ? " • Organic" : ""}
            </p>
          </div>
          <span className="text-4xl">{seasonEmoji[season]}</span>
        </div>
      </div>

      {/* Item count */}
      <p className="text-sm text-gray-500">{items.length} items found for this season</p>

      {/* Vegetables section */}
      {vegetables.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Vegetables</h3>
          <ul className="space-y-2">
            {vegetables.map((item, i) => (
              <li key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">🥦</span>
                  <span className="text-sm font-medium text-gray-800">
                    {item.organic ? "Organic " : ""}{item.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500 font-mono">{formatItemQuantity(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fruits section */}
      {fruits.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Fruits</h3>
          <ul className="space-y-2">
            {fruits.map((item, i) => (
              <li key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">🍎</span>
                  <span className="text-sm font-medium text-gray-800">
                    {item.organic ? "Organic " : ""}{item.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500 font-mono">{formatItemQuantity(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {items.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No items match your current filters. Try adjusting your preferences.
        </p>
      )}

      {/* Download button */}
      <button
        onClick={onDownloadPDF}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF
      </button>
    </div>
  );
}
