import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage("");

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: user,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      if (response.data) {
        // console.log("Account was create !");
        setUser(response.data.token);
        // redirigé l'user vers la page principale
        navigate("/");
      }
    } catch (error) {
      //   console.log(error.message);
      //   console.log(error.response.status);
      if (error.response.status === 409) {
        setErrorMessage("Account exist !");
      }
    }
  };

  return (
    <div className="signupContainer">
      <div className="signupPage">
        <h1> S'inscrire </h1>

        <form onSubmit={handleSubmit}>
          <div className="inputUserMailWord">
            <input
              placeholder="Nom d'utilisateur"
              type="text"
              name="user"
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
              }}
            />

            <input
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div className="newsletterBox">
            <input
              type="checkbox"
              value={newsletter}
              onChange={(event) => {
                setNewsletter(event.target.checked);
              }}
            />
            <p>S'inscrire à notre newsletter</p>
          </div>

          <span className="newsletterSpan">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </span>

          <div className="submitBox">
            <input type="submit" value="Submit" />
          </div>

          <p>{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
