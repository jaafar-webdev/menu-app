"use client";

import { useState } from "react";
import CopyIcon from "@/components/icon/CopyIcon";

const PromoCodePage = () => {
  const promoCode = "FRIEND25";
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(promoCode).then(
        () => {
          setCopySuccess("تم نسخ الرمز بنجاح!");
          setTimeout(() => setCopySuccess(""), 2000);
        },
        () => {
          setCopySuccess("فشل نسخ الرمز.");
          setTimeout(() => setCopySuccess(""), 2000);
        },
      );
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = promoCode;
      textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setCopySuccess("تم نسخ الرمز بنجاح!");
          setTimeout(() => setCopySuccess(""), 2000);
        } else {
          setCopySuccess("فشل نسخ الرمز.");
          setTimeout(() => setCopySuccess(""), 2000);
        }
      } catch (err) {
        setCopySuccess("فشل نسخ الرمز.");
        setTimeout(() => setCopySuccess(""), 2000);
      }
      document.body.removeChild(textArea);
    }
  };

  const referralHistory = [
    {
      id: 1,
      friend: "أحمد محمود",
      date: "2024-05-15",
      points: 50,
    },
    {
      id: 2,
      friend: "فاطمة الزهراء",
      date: "2024-05-18",
      points: 50,
    },
    {
      id: 3,
      friend: "محمد علي",
      date: "2024-05-21",
      points: 50,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            شارك واربح مع أصدقائك
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            شارك رمزك الترويجي مع أصدقائك واحصل على نقاط عند تسجيلهم.
          </p>

          <div className="mt-8">
            <div className="relative bg-gray-100 rounded-lg p-6 flex items-center justify-between">
              <span className="text-2xl font-mono text-gray-800 tracking-widest">
                {promoCode}
              </span>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                {copySuccess ? "تم النسخ" : <CopyIcon />}
              </button>
            </div>
            {copySuccess && (
              <p className="mt-2 text-sm text-green-600">{copySuccess}</p>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            سجل النقاط المكتسبة
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    الصديق
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    تاريخ التسجيل
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    النقاط
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referralHistory.map((referral) => (
                  <tr key={referral.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {referral.friend}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {referral.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-bold">
                      +{referral.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodePage;
