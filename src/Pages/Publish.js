import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [conditional, setConditional] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState("");

  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handlePublish = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("conditional", conditional);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("exchange", exchange);

      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
        // {
        //   picture: picture,
        //   title: title,
        //   description: description,
        //   brand: brand,
        //   size: size,
        //   color: color,
        //   conditional: conditional,
        //   city: city,
        //   price: price,
        // }
      );

      console.log(response.data);
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return token ? (
    <div className="formulaire">
      <form onSubmit={handlePublish}>
        <h1>Vends ton article</h1>

        <input
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
            setPreview(URL.reateObjectURL(event.target.files[0]));
          }}
        />
        <img src={preview} alt="" />
        <h2>Titre</h2>
        <input
          type="text"
          placeholder="ex: Chemise Sézanne verte"
          name="titre"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <br />

        <h2>Décris ton article</h2>
        <input
          type="text"
          placeholder="ex: porté quelquefois, taille correctement"
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <br />

        <input
          type="text"
          placeholder="ex: Zara"
          name="brand"
          value={brand}
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="ex: L/40/12"
          name="size"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="ex: Fushia"
          name="color"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Neuf avec étiquette"
          name="condition"
          value={conditional}
          onChange={(event) => {
            setConditional(event.target.value);
          }}
        />

        <br />

        <input
          type="text"
          placeholder="ex: Paris"
          name="city"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />

        <br />

        <input
          type="price"
          placeholder="0.00 €"
          name="price"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />

        <br />

        <input
          type="checkbox"
          value={exchange}
          onChange={(event) => {
            setExchange(event.target.value);
          }}
        />
        <span>Je suis intéressé(e) par les échanges</span>
      </form>

      <input type="submit" value="Ajouter" />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default Publish;
