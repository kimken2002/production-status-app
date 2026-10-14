import { useState } from "react";
import Layout from "../components/Layout";
import DataTable from "../components/DataTable";
import WateringGuideTable from "../components/WateringGuideTable";
import { useAppData } from "../context/AppDataContext";
import { useAuth } from "../context/AuthContext";

function CultivationPage() {
  const { productionData, addProductionRecord } = useAppData();
  const { user } = useAuth();

  const [form, setForm] = useState({
    date: productionData.dates[0] || "",
    temperature: "",
    humidity: "",
    soil: "",
    watering: "",
  });

  const isAdmin = user?.role === "admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date) {
      alert("日付を選択してください。");
      return;
    }

    if (
      form.temperature === "" &&
      form.humidity === "" &&
      form.soil === "" &&
      form.watering === ""
    ) {
      alert("いずれかの入力項目を記入してください。");
      return;
    }

    if (!isAdmin && form.watering !== "") {
      alert("散水は管理者のみ入力可能です。");
      return;
    }

    addProductionRecord(form);
    alert("左側の表へ反映しました。");

    setForm((prev) => ({
      ...prev,
      temperature: "",
      humidity: "",
      soil: "",
      watering: "",
    }));
  };

  return (
    <Layout title="生産入力画面">
      <div className="cultivation-page-content">
        <div className="left-panel">
          <DataTable dates={productionData.dates} rows={productionData.rows} />
        </div>

        <div className="form-panel">
          <form className="vertical-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>日付</label>
              <select name="date" value={form.date} onChange={handleChange}>
                {productionData.dates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label>気温（℃）</label>
              <input
                type="number"
                name="temperature"
                value={form.temperature}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label style={{ display: "inline-block", minWidth: "120px" }}>
                水分（％）
              </label>
              <input
                type="number"
                name="humidity"
                value={form.humidity}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label>土壌（重量）</label>
              <input
                type="number"
                name="soil"
                value={form.soil}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label>散水（時間）</label>
              <input
                type="number"
                name="watering"
                value={form.watering}
                onChange={handleChange}
                disabled={!isAdmin}
                placeholder={isAdmin ? "" : "管理者のみ入力可"}
              />
            </div>

            <div className="button-row">
              <button type="submit" className="primary-button">
                登録
              </button>
            </div>
          </form>
        </div>
      </div>

      <WateringGuideTable />
    </Layout>
  );
}

export default CultivationPage;
