import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAppData } from "../context/AppDataContext";

function EmployeesListPage() {
  const navigate = useNavigate();
  const { employees } = useAppData();

  return (
    <Layout title="社員一覧画面">
      <div className="employees-page-content">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>氏名</th>
              <th>所属部署</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-row right">
          <button className="secondary-button" onClick={() => navigate("/top")}>
            トップページ
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default EmployeesListPage;
