import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAppData } from "../context/AppDataContext";
import { useAuth } from "../context/AuthContext";

function EmployeeRegisterPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addEmployee, isDuplicateEmployee } = useAppData();

  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  if (user?.role !== "admin") {
    return <Navigate to="/top" replace />;
  }

  const validate = () => {
    const nextErrors = {};

    if (!/^\d{6}$/.test(form.id)) {
      nextErrors.id = "IDは6桁入力必要です。";
    }

    if (!/^[ぁ-んァ-ン一-龥ー\s]+$/.test(form.name)) {
      nextErrors.name = "氏名に記号・数字が含まれています。";
    }

    if (!/^[ぁ-んァ-ン一-龥a-zA-Z0-9ー\s]+$/.test(form.department)) {
      nextErrors.department = "所属に記号が含まれています。";
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.id || !form.name || !form.department) {
      alert("ID、氏名、所属はすべて入力してください。");
      return;
    }

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isDuplicateEmployee(form)) {
      const confirmed = window.confirm(
        "同じIDまたは氏名が存在します。確認必要！このまま登録しますか？",
      );
      if (!confirmed) return;
    }

    addEmployee(form);
    alert("社員を登録しました。");
    navigate("/employeeslist");
  };

  return (
    <Layout title="社員登録画面">
      <div className="register-page-content">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-row register-row-column">
            <label>社員ID</label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              maxLength={6}
            />
            {errors.id && <p className="error-text">{errors.id}</p>}
          </div>

          <div className="register-row register-row-column">
            <label>氏名</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="register-row register-row-column">
            <label>所属</label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
            {errors.department && (
              <p className="error-text">{errors.department}</p>
            )}
          </div>

          <div className="button-row right">
            <button type="submit" className="primary-button">
              登録
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EmployeeRegisterPage;
