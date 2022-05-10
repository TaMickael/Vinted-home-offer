import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchdata();
  }, [id]);

  return isLoading === true ? (
    <div>Charging ...</div>
  ) : (
    <div>
      <img src={data.product_image.secure_url} alt="" />

      <h2>{data.product_name}</h2>

      <span>{data.product_price}</span>

      <div>
        {data.product_details.map((item, index) => {
          const keys = Object.keys(item);

          return (
            <div key={index}>
              {keys[0]} : {item[keys[0]]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offer;
