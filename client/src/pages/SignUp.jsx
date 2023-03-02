import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../context/Appcontext";
import Spinner from "../components/Spinner";
import axios from "axios";

function SignUp() {
  const { setLoggedIn, isLoading, setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  });

  const { email, password, name, confirm_password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      toast.error("Enter Password Again");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/v1/users/create-user", formData);
      setLoggedIn(true);
      toast.success("You are signup successfully");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
      navigate("/signup");
    }
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className="auth">
        <div className="card">
          <div className="auth__header text-center">
            <h3>Account SignUp</h3>
          </div>

          <form className="form auth__form" onSubmit={onSubmit}>
            <div className="form__field">
              <label style={{ fontSize: "16px" }}>Name: </label>
              <input
                className="input input--text"
                type="text"
                name="username"
                required
                onChange={onChange}
                value={name}
                id="name"
                placeholder="Enter your username..."
              />
            </div>
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
            <div className="form__field">
              <label style={{ fontSize: "16px" }}>Confirm password: </label>
              <input
                className="input input--password"
                type="password"
                id="confirm_password"
                required
                value={confirm_password}
                name="confirm-password"
                onChange={onChange}
                placeholder="Enter your password again..."
              />
            </div>
            <div className="auth__actions">
              <input
                className="btn btn--sub btn--lg"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <div className="auth__alternative">
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
