import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../context/Appcontext";
import axios from "axios";

function Search() {
  const { isLoggedIn } = useContext(AppContext);
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    if (isLoggedIn === true) {
      const getAllplayList = async () => {
        const headers = {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        };
        const resposnse = await axios.get(
          "/api/v1/playlist/user-all-playlist",
          {
            headers,
          }
        );
        console.log(resposnse.data.data);
        setPlaylists(resposnse.data.data);
      };
      getAllplayList();
    }
  }, [isLoggedIn]);

  const navigate = useNavigate();
  const onsubmit = (e) => {
    e.preventDefault();
    navigate(`/create-list`);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "83%",
        }}
      >
        <div></div>
        <div style={{ marginTop: "20px" }}>
          <button className="create-list new-btn" onClick={onsubmit}>
            Create New List
          </button>
        </div>
      </div>
      <section className="devlist">
        <div className="container">
          <p
            style={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            My Todo List
          </p>

          <div className="grid grid--three">
            {playlists && playlists.length ? (
              playlists.map((item) => (
                <div className="column card" key={item._id}>
                  <div className="dev">
                    <div className="card__body">
                      <div className="dev__profile">
                        <div className="dev__meta">
                          <Link to={`/tasklist/${item._id}`}>
                            <h4>{item.playlist_name}</h4>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : isLoggedIn ? (
              <h4>You dont have any playlist</h4>
            ) : (
              <h4>You are not logged in</h4>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Search;
