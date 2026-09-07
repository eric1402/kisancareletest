import { Triangle } from "lucide-react";
import { Link } from "@tanstack/react-router";

const prices = [
  {
    crop: "Wheat",
    market: "Pune Market",
    price: "₹2,125",
    change: "2.45%",
    isUp: true,
  },
  {
    crop: "Sugarcane",
    market: "Kolhapur Market",
    price: "₹3,350",
    change: "1.20%",
    isUp: true,
  },
  {
    crop: "Onion",
    market: "Lasalgaon Market",
    price: "₹1,480",
    change: "-1.15%",
    isUp: false,
  },
  {
    crop: "Tomato",
    market: "Nashik Market",
    price: "₹1,130",
    change: "-0.85%",
    isUp: false,
  },
];

export default function MarketPricesCard() {
  return (
    <div className="bg-white rounded-2xl border border-kc-border p-5 shadow-xs flex flex-col justify-between card-3d-hover">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-sm text-kc-text">
          Market Prices (Mandi)
        </span>
        <Link
          to={"/mandi" as any}
          className="text-xs font-semibold text-kc-green hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] text-kc-muted font-normal border-b border-gray-100">
              <th className="pb-2 font-medium">Crop</th>
              <th className="pb-2 font-medium">Market</th>
              <th className="pb-2 font-medium text-right">Price (₹/Quintal)</th>
              <th className="pb-2 font-medium text-right">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {prices.map((item) => (
              <tr key={item.crop} className="hover:bg-gray-50/60 transition-colors">
                <td className="py-2.5 text-xs font-bold text-kc-text">
                  {item.crop}
                </td>
                <td className="py-2.5 text-xs text-kc-muted font-medium">
                  {item.market}
                </td>
                <td className="py-2.5 text-xs font-bold text-kc-text text-right">
                  {item.price}
                </td>
                <td
                  className={`py-2.5 text-xs font-bold text-right flex items-center justify-end gap-1 ${
                    item.isUp ? "text-kc-green" : "text-kc-red"
                  }`}
                >
                  <Triangle
                    className={`w-2.5 h-2.5 fill-current ${
                      item.isUp ? "" : "rotate-180"
                    }`}
                  />
                  <span>{item.change}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
