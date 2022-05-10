import homeImage from "../assets/Firstimage.jpeg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ searchInput }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [page, setPage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="home-block">
      <div className="home-image">
        <img src={homeImage} alt="" />
      </div>

      {isLoading === true ? (
        <p>is Loading ...</p>
      ) : (
        <div className="container">
          <div>
            <h1>Articles populaires</h1>
          </div>

          {/* <button onClick={() => setPage(page - 1)}>Page Précédente</button>
          <button onClick={() => setPage(page + 1)}>Page Suivante</button> */}

          <div className="offer-product-image">
            {data.offers.map((offer, index) => {
              // console.log(offer);
              return (
                <Link to={`/offer/${offer._id}`} key={offer._id}>
                  <div>
                    <div className="image-container" key={index}>
                      <img src={offer.product_image.secure_url} alt="" />
                      <p>{offer.product_price} €</p>

                      <span>{offer.product_description}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
