import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function AuthModal({ onClose, defaultIsRegister = false }) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(defaultIsRegister);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsRegister(defaultIsRegister);
  }, [defaultIsRegister]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      if (isRegister) {
        if (!formData.name.trim()) {
          setErrorMsg("Please enter your name");
          setIsSubmitting(false);
          return;
        }
        await register(formData);
      } else {
        await login(formData.email, formData.password);
      }
      onClose();
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          err.message ||
          "Authentication failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillQuickDemo = (roleType) => {
    if (roleType === "admin") {
      setFormData({
        name: "Faculty Admin",
        email: "admin@college.edu",
        password: "admin123",
        role: "admin",
      });
      setIsRegister(false);
    } else {
      setFormData({
        name: "Rahul Sharma",
        email: "student@college.edu",
        password: "student123",
        role: "student",
      });
      setIsRegister(false);
    }
    setErrorMsg("");
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content modal-auth">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title">
            {isRegister ? "Create an Account" : "Sign In to Portal"}
          </h2>
        </div>
        <p className="modal-intro">
          {isRegister
            ? "Register to access the Campus Notice Board"
            : "Sign in with your campus credentials to access the board"}
        </p>

        {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

        <div className="quick-demo-accounts">
          <span className="quick-demo-title">Quick Demo Login:</span>
          <div className="quick-demo-buttons">
            <button
              type="button"
              className="quick-demo-btn admin-demo"
              onClick={() => fillQuickDemo("admin")}
            >
              🛡️ Admin
            </button>
            <button
              type="button"
              className="quick-demo-btn student-demo"
              onClick={() => fillQuickDemo("student")}
            >
              🎓 Student
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="create-notice-form">
          {isRegister && (
            <div className="form-group">
              <label htmlFor="auth-name">Full Name *</label>
              <input
                id="auth-name"
                name="name"
                type="text"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Campus Email *</label>
            <input
              id="auth-email"
              name="email"
              type="email"
              required
              placeholder="e.g. user@college.edu"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Password *</label>
            <input
              id="auth-password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label htmlFor="auth-role">Account Role</label>
              <select
                id="auth-role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="student">Student (Read-Only & Bookmark)</option>
                <option value="admin">Faculty / Admin (Manage Notices)</option>
              </select>
            </div>
          )}

          <div className="modal-footer form-actions" style={{ marginTop: "18px" }}>
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : isRegister
                ? "Register"
                : "Sign In"}
            </button>
          </div>
        </form>

        <div className="auth-toggle-prompt">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setIsRegister(false);
                  setErrorMsg("");
                }}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setIsRegister(true);
                  setErrorMsg("");
                }}
              >
                Register
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
