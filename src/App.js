import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import useState
import { useState } from "react";

// Import Components
import Header from "./Components/Header";

// Import Pages
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Publish from "./Pages/Publish";
import Payment from "./Pages/Payment";

// Import Cookies
import Cookies from "js-cookie";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  // console.log(searchInput);

  //! Coder Cookies dans App.js avec les Tokens
  //! Cookies.get = Lire le cookie
  //! Cookies.set = Crée le cookie
  //! Cookies.remove = Supprimé le cookie

  // Lire le cookie dans le useState Cookies.get en fonction du userToken ||(soit) null
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  // Faire une fonction de setUser qui a pour argument (token)
  const setUser = (token) => {
    // Faire une condition si le token n'existe pas alors crée un cookie Cookies.set
    if (token !== null) {
      // Action de connexion, Création du Cookies si la condition est valide avec une expiration de 10 jours
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      // Action de déconnexion, on supprime userToken le Cookies.remove
      //
      Cookies.remove("userToken");
    }
    // On appel userToken
    setToken(token);
  };

  //! Il ne faut pas oublié de mettre setUser={setUser} dans SignUp et Login
  return (
    <div className="App">
      <Router>
        <Header
          token={token}
          setUser={setUser}
          setSearchInput={setSearchInput}
        />

        <Routes>
          <Route path="/" element={<Home searchInput={searchInput} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/Signup" element={<Signup setUser={setUser} />} />
          <Route path="/Login" element={<Login setUser={setUser} />} />
          <Route path="/Publish" element={<Publish token={token} />} />
          <Route path="/Payment" element={<Payment />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
