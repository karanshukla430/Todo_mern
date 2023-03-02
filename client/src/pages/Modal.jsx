import { useState, useEffect } from "react";
import "../static/Modal.css";
import { toast } from "react-toastify";
import axios from "axios";

function Modal({ setOpenModal, setAddFieldModal, movie }) {
  const [option, setOption] = useState();
  const [playlists, setPlaylists] = useState();
  // const { isLoading, setLoading } = useContext(AppContext);

  useEffect(() => {
    // if (isLoggedIn === true) {
    // setLoading(true);
    const getAllplayList = async () => {
      const headers = {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      };
      const resposnse = await axios.get("/api/v1/playlist/user-all-playlist", {
        headers,
      });
      // setLoading(false);
      setPlaylists(resposnse.data.data);
    };
    getAllplayList();
    // }
  }, []);

  const onchange = (e) => {
    setOption(e.target.value);
  };
  const add = async (e) => {
    const formData = {
      movie_id: movie.imdbID,
      movie_name: movie.Title,
      playlist: option,
    };
    const header = {
      Authorization: `bearer ${localStorage.getItem("token")}`,
    };
    await axios.post("/api/v1/playlist/add-to-playlist", formData, {
      headers: header,
    });
    toast.success(`${movie.Title} added to playlist`);

    setOpenModal(false);
  };
  const createNew = (e) => {
    setOpenModal(false);
    setAddFieldModal(true);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div>
          <h4>Your playlists</h4>
          {playlists && playlists.length ? (
            playlists.map((item) => (
              <div key={item._id}>
                <input
                  className="input-radio"
                  onChange={onchange}
                  type="radio"
                  name="playlist"
                  value={item._id}
                />
                <label className="form-label" htmlFor="html">
                  {item.playlist_name}
                </label>
                <br />
              </div>
            ))
          ) : (
            <p>No Playlist Yet</p>
          )}

          <div className="bottom">
            <button className="button" onClick={createNew}>
              Create New
            </button>
            <button className="button" onClick={add}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
