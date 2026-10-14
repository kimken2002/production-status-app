import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeId = (e) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    setId(onlyNumbers.slice(0, 6));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const result = login({ id });

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    navigate("/top");
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>ログイン画面</h1>

        <div className="form-group">
          <label>ID（6桁）</label>
          <input
            type="text"
            value={id}
            onChange={handleChangeId}
            placeholder="6桁のIDを入力"
            maxLength={6}
          />
        </div>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <button type="submit" className="primary-button">
          ログイン
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
