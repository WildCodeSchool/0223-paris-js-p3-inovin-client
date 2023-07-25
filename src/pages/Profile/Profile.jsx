import { useState, useEffect } from "react";
import tagsService from "../../services/tag";
import usersService from "../../services/users"
import "../Profile/Profile.scss";
import { useSelector } from "react-redux";
import { getCurrentCategoryUser } from "../../services/tag.js";
import avatar from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [comment, setComment]=useState([]);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    getCurrentCategoryUser().then((res) => setCategory(res.data));
  }, []);

  const onChange = (id) => {
    if (tags.includes(id)) {
      setTags(tags.filter((tag) => tag != id));
    } else {
      setTags((prevState) => [...prevState, id]);
    }
    console.log(tags)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await tagsService.sendTags(tags) ? navigate("/") :     
      await usersService.updateComment(comment);
      navigate("/");
    } catch (error) {
      console.log(error);
     }
  };



  return (
    <>
      {error && <p>{error}</p>}

      <form className="formLog" onSubmit={handleSubmit}>
        <h1 className="">Bonjour {auth.user?.firstname}</h1>
        <img className="avatar" src={avatar} alt="avatar" />
        <h2>Profil dégustation</h2>
        <p>
          L'atelier Inovin est une expérience unique vous permettant de créer
          votre propre vin au travers d’une dégustation de cépages vers votre
          assemblage...
        </p>

        <h2>COULEUR</h2>
        <div className="containerTags">
          {category
            .filter((e) => e.category == "Couleur")
            .map((type) => (
              <input
                className={tags.includes(type.id) ? "checkboxCategory checkboxCategorySelected"  : "checkboxCategory"  }
                type="button"
                value={type.name}
                onClick={() => onChange(type.id)}
              />
            ))}
        </div>

        <h2>ARÔMES</h2>
        <div className="containerTags">
          {category
            .filter((e) => e.category == "Arôme")
            .map((type) => (
              <input
                className={tags.includes(type.id) ? "checkboxCategory checkboxCategorySelected"  : "checkboxCategory"  }
                type="button"
                value={type.name}
                onClick={() => onChange(type.id)}
              />
            ))}
        </div>

        <h2>SUCROSITÉ</h2>
        <div className="containerTags">
          {category
            .filter((e) => e.category == "Sucrosité")
            .map((type) => (
              <input
                className= {tags.includes(type.id) ? "checkboxCategory checkboxCategorySelected"  : "checkboxCategory"  }
                type="button"
                value={type.name}
                onClick={() => onChange(type.id)}
              />
            ))}
        </div>

        <h2>COMMENTAIRE</h2>
        <textarea
          className="inputComment"
          id="story"
          name="story"
          rows="5"
          cols="33"
          value={comment}
          onChange={(e)=> setComment(e.target.value)}
          
        >
          Mettez votre commentaire ici ...
        </textarea>

        <button className="btn" type="submit"  >Valider</button>
      </form>
    </>
  );
}

export default Profile;
