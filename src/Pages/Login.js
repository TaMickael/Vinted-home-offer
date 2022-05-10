import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Pour ne pas que sa refresh on utilise handle...
  const handleLogin = async (event) => {
    try {
      // event.preventDefault() permet le non rafraichissement de la page
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      // On peut regarder avec un console.log(response.data)
      //   console.log(response.data);
      // On place une condition
      if (response.data.token) {
        setUser(response.data.token);
        //redirection vers la page home ("/")
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <br />

      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <br />

      <input type="submit" value="Se connecter" />

      <br />
    </form>
  );
};

export default Login;
