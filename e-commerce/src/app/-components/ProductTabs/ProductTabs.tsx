"use client";

import { ProductTabsProps, TabId } from "@/api/types/productTabs.type";
import { useState } from "react";
import {
  LuCheck,
  LuFileText,
  LuRotateCcw,
  LuShieldCheck,
  LuStar,
  LuTruck,
} from "react-icons/lu";

const keyFeatures = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
];

const distribution = [
  { star: 5, percent: 25 },
  { star: 4, percent: 60 },
  { star: 3, percent: 25 },
  { star: 2, percent: 5 },
  { star: 1, percent: 5 },
];

export default function ProductTabs({
  description,
  category,
  subcategory,
  brand,
  sold,
  ratingsAverage,
  ratingsQuantity,
}: ProductTabsProps) {
  const [active, setActive] = useState<TabId>("details");

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "details", label: "Product Details", icon: <LuFileText /> },
    { id: "reviews", label: `Reviews (${ratingsQuantity})`, icon: <LuStar /> },
    { id: "shipping", label: "Shipping & Returns", icon: <LuTruck /> },
  ];

  const info = [
    { label: "Category", value: category },
    { label: "Subcategory", value: subcategory },
    { label: "Brand", value: brand },
    { label: "Items Sold", value: sold !== undefined ? `${sold}+ sold` : undefined },
  ].filter((row) => row.value);

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white">
      <div role="tablist" className="flex overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`flex shrink-0 cursor-pointer items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium transition ${
                isActive
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {active === "details" && (
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-800">
              About this Product
            </h3>
            <p className="text-gray-600">{description}</p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold text-gray-800">
                  Product Information
                </h4>
                <dl className="divide-y divide-gray-100 text-sm">
                  {info.map((row) => (
                    <div key={row.label} className="flex justify-between py-2.5">
                      <dt className="text-gray-500">{row.label}</dt>
                      <dd className="font-medium text-gray-800">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-gray-800">Key Features</h4>
                <ul className="space-y-2.5 text-sm text-gray-600">
                  {keyFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <LuCheck className="h-4 w-4 text-green-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {active === "reviews" && (
          <div>
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="text-center md:w-40">
                <p className="text-5xl font-bold text-gray-800">{ratingsAverage}</p>
                <div className="mt-2 flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <LuStar
                      key={i}
                      className={`h-4 w-4 text-yellow-400 ${
                        ratingsAverage >= i - 0.5 ? "fill-yellow-400" : ""
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Based on {ratingsQuantity} reviews
                </p>
              </div>

              <div className="flex-1 space-y-2">
                {distribution.map(({ star, percent }) => (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-10 text-gray-600">{star} star</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-yellow-400"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-gray-500">{percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center rounded-xl bg-gray-50 py-10 text-center">
              <LuStar className="h-8 w-8 text-gray-300" />
              <p className="mt-3 text-sm text-gray-500">
                Customer reviews will be displayed here.
              </p>
              <button
                type="button"
                className="mt-2 cursor-pointer text-sm font-medium text-green-600 hover:underline"
              >
                Write a Review
              </button>
            </div>
          </div>
        )}

        {active === "shipping" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoCard
                icon={<LuTruck className="h-5 w-5" />}
                title="Shipping Information"
                items={[
                  "Free shipping on orders over 500 EGP",
                  "Standard delivery: 3-5 business days",
                  "Express delivery available (1-2 business days)",
                  "Track your order in real-time",
                ]}
              />
              <InfoCard
                icon={<LuRotateCcw className="h-5 w-5" />}
                title="Returns & Refunds"
                items={[
                  "30-day hassle-free returns",
                  "Full refund or exchange available",
                  "Free return shipping on defective items",
                  "Easy online return process",
                ]}
              />
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                <LuShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-gray-800">
                  Buyer Protection Guarantee
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Get a full refund if your order doesn&apos;t arrive or isn&apos;t
                  as described. We ensure your shopping experience is safe and
                  secure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl bg-green-50 p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
          {icon}
        </span>
        <h4 className="font-semibold text-gray-800">{title}</h4>
      </div>
      <ul className="space-y-2 text-sm text-gray-600">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <LuCheck className="h-4 w-4 shrink-0 text-green-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}