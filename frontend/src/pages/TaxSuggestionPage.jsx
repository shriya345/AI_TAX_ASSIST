import { useState } from "react";
import { calculateTax } from "../services/api";

const TaxSuggestionPage = () => {
  const [form, setForm] = useState({
    income: "",
    sec80c: "",
    sec80d: "",
    hra: "",
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!form.income || !form.sec80c || !form.sec80d || !form.hra) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await calculateTax(form);
      setResult(res.data);
    } catch {
      alert("Error connecting to backend");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl mb-4">Tax Regime Suggestion</h2>

      <input
        type="number"
        placeholder="Annual Income"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, income: e.target.value })}
      />
      <input
        type="number"
        placeholder="Section 80C (e.g. LIC, PF)"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, sec80c: e.target.value })}
      />
      <input
        type="number"
        placeholder="Section 80D (medical insurance)"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, sec80d: e.target.value })}
      />
      <input
        type="number"
        placeholder="HRA"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, hra: e.target.value })}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleSubmit}
      >
        Suggest Best Regime
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p>Old Regime Tax: ₹{result.old_regime_tax}</p>
          <p>New Regime Tax: ₹{result.new_regime_tax}</p>
          <p className="font-bold mt-2">
            ✅ Recommended: {result.suggested_regime}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaxSuggestionPage;