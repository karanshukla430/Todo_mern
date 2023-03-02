import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AppContext from "../context/Appcontext";
import Spinner from "../components/Spinner";
// import { v4 as uuidv4 } from "uuid";

function Single() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const { isLoading, setLoading } = useContext(AppContext);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data1 = await axios(
        `https://www.omdbapi.com/?i=${params.id}&apikey=1f59a830`
      );
      setItem(data1.data);
      setLoading(false);
    };
    getData();
  }, [params.id, setLoading]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {item ? (
        <main className="singleProject my-md">
          <div className="container">
            <div className="layout">
              <div className="column column--1of3">
                <h3 className="singleProject__subtitle">Release Date</h3>
                {item.Released}
                <br />
                <br />
                <h3 className="singleProject__subtitle">Director</h3>
                {item.Director}
                <br />
                <br />
                <h3 className="singleProject__subtitle">Writer</h3>
                {item.Writer}
                <br />
                <br />
                <h3 className="singleProject__subtitle">Language</h3>
                {item.Language}
                <br />
                <br />
                <h3 className="singleProject__subtitle">Runtime</h3>
                {item.Runtime}
                <br />
                <br />
                <h3 className="singleProject__subtitle">Country</h3>
                {item.Country}
              </div>
              <div className="column column--2of3">
                <img
                  className="singleProject__preview"
                  src={item.Poster}
                  alt="portfolio thumbnail"
                />
                <p href="profile.html" className="singleProject__developer">
                  {item.publisher}
                </p>
                <h2 className="singleProject__title">{item.Title}</h2>
                <h3 className="singleProject__subtitle">Summary</h3>
                <div className="singleProject__info">{item.Plot}</div>

                <div className="comments">
                  <h3 className="singleProject__subtitle">Rating</h3>
                  <h5 className="project--rating">{item.imdbRating}</h5>
                </div>
                <div className="comments">
                  <h3 className="singleProject__subtitle">
                    BoxOffice Collection
                  </h3>
                  <h5 className="project--rating">{item.BoxOffice}</h5>
                </div>
                <div className="comments">
                  <h3 className="singleProject__subtitle">Genre</h3>
                  <h5 className="project--rating">{item.Genre}</h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
}

export default Single;
