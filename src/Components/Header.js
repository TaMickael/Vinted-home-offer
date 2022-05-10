import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = ({ token, setSearchInput, setUser }) => {
  const navigate = useNavigate();
  return (
    <section className="first-container">
      <div className="header-component">
        <Link to="/">
          <img src={logo} alt="logoHomeVinted" />
        </Link>
        <div className="space-bar">
          <input
            type="Rechercher des articles"
            placeholder="Recherche des articles"
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
        </div>

        <div className="button">
          <div className="signupButt">
            <Link to="/Signup">
              <button>S'inscrire</button>
            </Link>
          </div>
          <div className="loginButt">
            <Link to="/Login">
              <button>Se connecter</button>
            </Link>
          </div>

          <div className="disconnect">
            <button
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          </div>

          <div className="publishButt">
            <Link to="/Publish">
              <button> Vends tes articles </button>
            </Link>
          </div>
        </div>
      </div>
      {/* 
      <div className="home-button">
        <button>Femmes </button>
        <button>Hommes </button>
        <button>Enfants </button>
        <button>Maison</button>
        <button>Divertissement </button>
        <button>Animaux </button>
        <button>A propos </button>
        <button>Notre plateforme </button>
      </div> */}
    </section>
  );
};

export default Header;
