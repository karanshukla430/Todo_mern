import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Account() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const header = {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      };
      const data = await axios.get("/api/v1/users/get-details", {
        headers: header,
      });
      console.log(data.data.data);
      setName(data.data.data.name);
      setEmail(data.data.data.email);
    };
    getData();
  }, []);
  const submitHandler = async () => {
    const formData = {
      name,
      age,
      gender,
      email,
    };
    // console.log(formData);
    const header = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await axios.post("/api/v1/users/user-update-details", formData, {
      headers: header,
    });
    navigate("/");
  };

  const changeHandler = (e) => {
    setAge(e.target.value);
  };
  return (
    <>
      <main className="formPage my-xl">
        <div className="content-box">
          <div className="formWrapper">
            <br />
            <form className="form auth__form">
              <div className="form__field">
                <label>Name: </label>
                <input
                  className="input"
                  type="text"
                  name="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form__field">
                <label>Email: </label>
                <input
                  className="input"
                  id="formInput#text"
                  type="text"
                  // disabled
                  name="text"
                  value={email}
                  placeholder="Enter your Email"
                />
              </div>

              <div className="form__field">
                <label>Gender: </label>
                <input
                  className="input input--text"
                  type="text"
                  id="gender"
                  value={gender}
                  name="gender"
                  placeholder="Enter your Gender"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="form__field">
                <label>Age: </label>
                <input
                  className="input"
                  type="number"
                  name="age"
                  value={age}
                  id="age"
                  placeholder="Enter your Age"
                  onChange={changeHandler}
                />
              </div>
              <div className="auth__actions">
                <input
                  className="btn btn--sub btn--lg"
                  type="submit"
                  value="Save"
                  onClick={submitHandler}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Account;
