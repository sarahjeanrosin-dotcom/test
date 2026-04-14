"use client";

import { useState } from "react";
import { FormData } from "@/lib/grocery-generator";
import { DietType, CuisineStyle, Budget } from "@/lib/seasonal-data";

interface Props {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

const COMMON_ALLERGIES = ["Nightshades", "Stone Fruit", "Citrus", "Peanuts", "Tree Nuts", "Legumes"];

export default function GroceryForm({ onSubmit, loading }: Props) {
  const [zipcode, setZipcode] = useState("");
  const [familySize, setFamilySize] = useState(2);
  const [allergyText, setAllergyText] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [dietType, setDietType] = useState<DietType>("omnivore");
  const [cuisineStyle, setCuisineStyle] = useState<CuisineStyle | "any">("any");
  const [budget, setBudget] = useState<Budget>("moderate");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [zipcodeError, setZipcodeError] = useState("");

  function toggleAllergy(allergy: string) {
    setSelectedAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{5}(-\d{4})?$/.test(zipcode.trim())) {
      setZipcodeError("Please enter a valid 5-digit US zipcode.");
      return;
    }
    setZipcodeError("");

    const allAllergies = [
      ...selectedAllergies,
      ...allergyText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ];

    onSubmit({
      zipcode: zipcode.trim(),
      familySize,
      allergies: allAllergies,
      dietType,
      cuisineStyle,
      budget,
      organicOnly,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Zipcode */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Zipcode <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={zipcode}
          onChange={(e) => { setZipcode(e.target.value); setZipcodeError(""); }}
          placeholder="e.g. 10001"
          maxLength={10}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        {zipcodeError && <p className="text-red-500 text-xs mt-1">{zipcodeError}</p>}
        <p className="text-xs text-gray-500 mt-1">Used to determine your region and seasonal produce.</p>
      </div>

      {/* Family size */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Family Size
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFamilySize((n) => Math.max(1, n - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
          >
            -
          </button>
          <span className="text-lg font-semibold w-6 text-center">{familySize}</span>
          <button
            type="button"
            onClick={() => setFamilySize((n) => Math.min(20, n + 1))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
          >
            +
          </button>
          <span className="text-sm text-gray-500">
            {familySize === 1 ? "person" : "people"}
          </span>
        </div>
      </div>

      {/* Diet type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Diet Type</label>
        <div className="flex flex-wrap gap-2">
          {(["omnivore", "vegetarian", "vegan", "paleo", "keto"] as DietType[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDietType(d)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                dietType === d
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 text-gray-600 hover:border-green-400"
              }`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine style */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Cuisine Style</label>
        <div className="flex flex-wrap gap-2">
          {(["any", "american", "mediterranean", "asian", "latin", "middleeastern"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCuisineStyle(c)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                cuisineStyle === c
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 text-gray-600 hover:border-green-400"
              }`}
            >
              {c === "any" ? "Any" : c === "middleeastern" ? "Middle Eastern" : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">Prioritizes produce commonly used in that cuisine.</p>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Budget</label>
        <div className="flex gap-2">
          {(["budget", "moderate", "premium"] as Budget[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                budget === b
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 text-gray-600 hover:border-green-400"
              }`}
            >
              {b.charAt(0).toUpperCase() + b.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Organic */}
      <div className="flex items-center gap-2">
        <input
          id="organic"
          type="checkbox"
          checked={organicOnly}
          onChange={(e) => setOrganicOnly(e.target.checked)}
          className="w-4 h-4 accent-green-600"
        />
        <label htmlFor="organic" className="text-sm text-gray-700 font-semibold cursor-pointer">
          Organic produce only
        </label>
      </div>

      {/* Allergies — presets */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Food Allergies / Sensitivities
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {COMMON_ALLERGIES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAllergy(a)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                selectedAllergies.includes(a)
                  ? "bg-red-500 text-white border-red-500"
                  : "border-gray-300 text-gray-600 hover:border-red-300"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={allergyText}
          onChange={(e) => setAllergyText(e.target.value)}
          placeholder="Other allergies, comma-separated (e.g. mango, avocado)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {loading ? "Generating..." : "Generate My Grocery List"}
      </button>
    </form>
  );
}
