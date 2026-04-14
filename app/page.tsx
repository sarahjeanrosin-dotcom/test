"use client";

import { useState } from "react";
import GroceryForm from "@/components/GroceryForm";
import GroceryList from "@/components/GroceryList";
import { FormData, generateGroceryList, GroceryItem } from "@/lib/grocery-generator";
import { getRegionFromZipcode, getCurrentSeason } from "@/lib/zipcode-region";
import { Region, Season } from "@/lib/seasonal-data";
import { downloadGroceryPDF } from "@/lib/pdf-generator";

export default function Home() {
  const [result, setResult] = useState<{
    items: GroceryItem[];
    region: Region;
    season: Season;
    form: FormData;
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(data: FormData) {
    setLoading(true);
    setError("");

    const region = getRegionFromZipcode(data.zipcode);
    if (!region) {
      setError("Could not determine your region from that zipcode. Please check and try again.");
      setLoading(false);
      return;
    }

    const season = getCurrentSeason();
    const items = generateGroceryList(region, season, data);

    setResult({ items, region, season, form: data });
    setLoading(false);

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleDownloadPDF() {
    if (!result) return;
    downloadGroceryPDF(
      result.items,
      result.region,
      result.season,
      result.form.zipcode,
      result.form.familySize,
      result.form.organicOnly
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-green-800 tracking-tight">
            Seasonal Grocery List
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Discover what&apos;s fresh near you and build your weekly list.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Your Preferences</h2>
            <GroceryForm onSubmit={handleSubmit} loading={loading} />
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}
          </div>

          <div id="results" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[200px]">
            {result ? (
              <GroceryList
                items={result.items}
                region={result.region}
                season={result.season}
                familySize={result.form.familySize}
                zipcode={result.form.zipcode}
                organicOnly={result.form.organicOnly}
                onDownloadPDF={handleDownloadPDF}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="text-5xl mb-4">🥕</div>
                <h3 className="text-gray-500 font-medium">Your grocery list will appear here</h3>
                <p className="text-sm text-gray-400 mt-1">Fill out the form and click generate</p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Produce availability based on typical US regional growing seasons. Quantities are weekly estimates.
        </p>
      </div>
    </main>
  );
}
