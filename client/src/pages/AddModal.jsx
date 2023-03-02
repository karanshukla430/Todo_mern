import { useState } from "react";
import "../static/Modal.css";
import axios from "axios";
import { toast } from "react-toastify";
function AddModal({ setAddFieldModal }) {
  const [title, setTitle] = useState();
  const [isPrivate, setIsPrivate] = useState(false);

  const onchange = (e) => {
    setIsPrivate(e.target.value);
  };

  const textChange = (e) => {
    setTitle(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = {
      playlist_name: title,
      private: isPrivate,
    };
    const header = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };

    const res = await axios.post("/api/v1/playlist/create-playlist", formData, {
      headers: header,
    });
    toast.success(res.data.message);
    setAddFieldModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setAddFieldModal(false);
            }}
          >
            X
          </button>
        </div>
        <div>
          <label className="form-label">Enter Title</label>
          <br />
          <input
            type="text"
            placeholder="Enter Title"
            className="input-text"
            onChange={textChange}
          />
          <br />
          <br />
          <label className="form-label">Private</label>
          <br />
          <input
            className="input-radio"
            onChange={onchange}
            type="radio"
            name="Private"
            value="true"
          />
          <label className="form-label">Yes</label>
          <br />
          <input
            className="input-radio"
            onChange={onchange}
            type="radio"
            name="Private"
            value="false"
          />
          <label className="form-label">No</label>
          <div className="bottom">
            <button className="button" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
