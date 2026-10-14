import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout({ title, children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      alert("ログアウト失敗メッセージを表示します。");
    }
  };

  return (
    <div className="page-frame">
      <div className="page-header">
        <h1>{title}</h1>

        <div className="header-actions">
          <div className="user-info">
            ログイン中: {user?.name}（{user?.department}）
          </div>
          <button className="secondary-button" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </div>

      <div className="page-body">{children}</div>
    </div>
  );
}

export default Layout;
