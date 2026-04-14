import { GroceryItem, formatItemQuantity } from "./grocery-generator";
import { Region, Season } from "./seasonal-data";
import { getRegionLabel } from "./zipcode-region";

export async function downloadGroceryPDF(
  items: GroceryItem[],
  region: Region,
  season: Season,
  zipcode: string,
  familySize: number,
  organicOnly: boolean
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = margin;

  // Season colors (RGB)
  const seasonBg: Record<Season, [number, number, number]> = {
    spring: [220, 252, 231],
    summer: [254, 249, 195],
    fall: [255, 237, 213],
    winter: [219, 234, 254],
  };
  const seasonAccent: Record<Season, [number, number, number]> = {
    spring: [22, 163, 74],
    summer: [202, 138, 4],
    fall: [234, 88, 12],
    winter: [37, 99, 235],
  };
  const seasonEmoji: Record<Season, string> = {
    spring: "Spring",
    summer: "Summer",
    fall: "Fall",
    winter: "Winter",
  };

  const [r, g, b] = seasonBg[season];
  const [ar, ag, ab] = seasonAccent[season];

  // Header background
  doc.setFillColor(r, g, b);
  doc.roundedRect(margin, y, contentW, 28, 4, 4, "F");

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(ar, ag, ab);
  doc.text(`${seasonEmoji[season]} Seasonal Grocery List`, margin + 6, y + 10);

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(
    `${getRegionLabel(region)}  |  Zipcode: ${zipcode}  |  ${familySize} ${familySize === 1 ? "person" : "people"}${organicOnly ? "  |  Organic" : ""}`,
    margin + 6,
    y + 19
  );

  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Generated: ${dateStr}`, margin + 6, y + 25);

  y += 35;

  // Helper: section header
  function drawSectionHeader(title: string) {
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, y, contentW, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(title.toUpperCase(), margin + 3, y + 5);
    y += 10;
  }

  // Helper: draw item row
  function drawItem(item: GroceryItem, index: number) {
    if (y > 250) {
      doc.addPage();
      y = margin;
    }
    // Alternating row background
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y, contentW, 8, "F");
    }
    // Checkbox
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin + 2, y + 1.5, 5, 5, 1, 1, "S");

    // Item name
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    const name = `${item.organic ? "Organic " : ""}${item.name}`;
    doc.text(name, margin + 10, y + 5.5);

    // Quantity (right aligned)
    const qty = formatItemQuantity(item);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(ar, ag, ab);
    doc.text(qty, margin + contentW - 2, y + 5.5, { align: "right" });

    y += 9;
  }

  const vegetables = items.filter((i) => i.type === "vegetable");
  const fruits = items.filter((i) => i.type === "fruit");

  if (vegetables.length > 0) {
    drawSectionHeader(`Vegetables (${vegetables.length})`);
    vegetables.forEach((item, i) => drawItem(item, i));
    y += 4;
  }

  if (fruits.length > 0) {
    drawSectionHeader(`Fruits (${fruits.length})`);
    fruits.forEach((item, i) => drawItem(item, i));
    y += 4;
  }

  // Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text(
    "Quantities are estimated weekly amounts per household. Adjust based on your needs.",
    margin,
    270
  );

  doc.save(`seasonal-grocery-list-${season}-${zipcode}.pdf`);
}
