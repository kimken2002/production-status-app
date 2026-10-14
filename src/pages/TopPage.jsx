import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import DataTable from "../components/DataTable";
import WateringGuideTable from "../components/WateringGuideTable";
import { useAppData } from "../context/AppDataContext";

function TopPage() {
  const navigate = useNavigate();
  const { productionData } = useAppData();

  return (
    <Layout title="生産状況管理システム">
      <div className="top-page-content">
        <div className="left-panel">
          <DataTable dates={productionData.dates} rows={productionData.rows} />

          <button
            className="secondary-button top-link-button"
            onClick={() => navigate("/cultivation")}
          >
            生産入力進捗画面
          </button>
        </div>

        <div className="right-panel">
          <div className="top-actions">
            <button
              className="secondary-button"
              onClick={() => navigate("/employeeslist")}
            >
              社員一覧
            </button>
            <button
              className="secondary-button"
              onClick={() => navigate("/employeeregister")}
            >
              社員登録
            </button>
          </div>
        </div>
      </div>

      <WateringGuideTable />
    </Layout>
  );
}

export default TopPage;
