import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AppContext from "../context/Appcontext";
import Spinner from "../components/Spinner";
import usePagination from "../hooks/usePagination";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import NotFound from "./NotFound";

function Playlist() {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const { isLoading, setLoading } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { previousPage, nextPage, totalPages, data } = usePagination(
    movie,
    currentPage,
    12
  );
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const formData = {
          playlist_id: params.playlistId,
        };
        if (params.isPrivate === "true") {
          const headers = {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          };
          const data1 = await axios.post(
            "/api/v1/playlist/playlist-data-private",
            formData,
            {
              headers,
            }
          );
          setMovie(data1.data.data.movies);
        } else {
          const data1 = await axios.post(
            "/api/v1/playlist/playlist-data-public",
            formData
          );
          setMovie(data1.data.data.movies);
        }
      } catch (err) {
        toast.error("Something Went Wrong");
      }
      setLoading(false);
    };
    getData();
  }, [params.isPrivate, params.playlistId, setLoading]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <main className="projects">
        <section className="projectsList">
          <div className="container">
            <div className="grid grid--four">
              {data && data.length ? (
                data.map((movie) => (
                  <div className="column" key={movie.movie_id}>
                    <div className="card project">
                      <div className="project">
                        <Link to={`/single/${movie.movie_id}`}>
                          <img src={movie.poster_link} alt="Image_Poster" />
                        </Link>
                      </div>
                      <div className="card__body">
                        <Link to={`/single/${movie.movie_id}`}>
                          <h3 className="project__title">{movie.name}</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NotFound message={"There is no movie/show in this playlist"} />
              )}
            </div>
          </div>
        </section>

        <div className="pagination">
          <ul className="container">
            {previousPage && (
              <li>
                <div
                  onClick={() => setCurrentPage(previousPage)}
                  className="btn "
                >
                  &#10094; Prev
                </div>
              </li>
            )}

            {totalPages &&
              Array(totalPages)
                .fill(1)
                .map((_, idx) => (
                  <li key={uuidv4()}>
                    <div
                      className={`btn ${currentPage === idx + 1 && "btn--sub"}`}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </div>
                  </li>
                ))}
            {nextPage && (
              <li>
                <div onClick={() => setCurrentPage(nextPage)} className="btn">
                  Next &#10095;
                </div>
              </li>
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Playlist;
