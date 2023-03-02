import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../context/Appcontext";
import Spinner from "../components/Spinner";
import axios from "axios";

function Login() {
  const { setLoggedIn, isLoading, setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const login = await axios.post("/api/v1/users/create-session", formData);
      localStorage.setItem("token", login.data.data.token);
      setLoggedIn(true);
      toast.success("You are login successfully");
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      toast.error("Email or password is incorrect");
      navigate("/login");
    }
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="auth">
        <div className="card">
          <div className="auth__header text-center">
            <h3>Account Login</h3>
          </div>

          <form className="form auth__form" onSubmit={onSubmit}>
            <div className="form__field">
              <label style={{ fontSize: "16px" }}>Email: </label>
              <input
                className="input input--text"
                type="email"
                name="email"
                required
                value={email}
                id="email"
                onChange={onChange}
                placeholder="Enter your email..."
              />
            </div>

            <div className="form__field">
              <label style={{ fontSize: "16px" }}>Password: </label>
              <input
                className="input input--password"
                type="password"
                value={password}
                required
                name="password"
                id="password"
                onChange={onChange}
                placeholder="Enter your password..."
              />
            </div>
            <div className="auth__actions">
              <input
                className="btn btn--sub btn--lg"
                type="submit"
                value="Log In"
              />
              {/* <Link to="/forget">Forget Password?</Link> */}
            </div>
          </form>
          <div className="auth__alternative">
            <p>Don’t have an Account?</p>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
