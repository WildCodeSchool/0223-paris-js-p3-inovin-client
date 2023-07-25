import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SelectedWine.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";
import api from "../../services/api";

function SelectedWine() {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate()

  const [selectedWine, setSelectedWine] = useState();
  const [favorites, setFavorites] = useState();

  const emptyHeart =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADTElEQVR4nO2ZS2xNURSGv2olaCkDIU0x8ChC0DLwSIzExCNCg4kYCErFSBkQBEmnpJ5BVJuYeM2olmEjRBAJYuCtiXhTVaKtrOQ/yU573J57e3q7m9wvOcm9Z+299lpnr73P2utAhgwZMmTwnCJgJ9AAPAGagVagCagHdgOTk9A3Bdijvk3S1Szddq8CmBSnA7OBm0BHhKsduA7MTKBvltq0R9TZAJT0xIGBQJUz4CfgNLBMs5MLDALGAEuB48Bntf0L7AeyHX32+6Bkgb5jwBLpMF250r0cOKM2wQM6AuQk68QI4JaU/AQOAMMi9BsK7FOYWN/zcsCuWt0z2V617Y5hcr7FmZ3hycxE4MRrhUKyWGi9ko5ax4mXwIwU9JUAbxxnIs1MleNEAakzTjqCWDfHxvZAX4HjzOEoC7td4ZTKTIQ9yVZdxTHoK1aYtXWnL9idbE3ERYWuuDgkG22LDqXI2U2iLOyoBIs9LvKd3XFiWINdEtoW6ztnZeuOMGG9hLaH+84K2XojTPhMwgn4T5FsfRom/CFhHv6TJ1vN5i4Eb09LFXxniJN1dOGdhD15CaaLQtlqL8guPJSwR5lmmpgjWx+ECWsk3Iz/bJWt58KE5RJW4z81snXL/05sJvzi+YIfDHyTrbYNh3JPDUrxlzWy8U6iRtvUyBzKwj+ygPuysay7aWtSw5X4xyrZ9jZK+Jc7e7Rlmr6QLwf+u8g7Y8fIu+pgWaYvVMum28kcC6Y7BYRN9D1lsuUXMDXZzhvU+TewiL5jsWwwW9anqiQoRFgFcB7pZ4ESw0gFh0RYLF5wnEnnzCwEvmvsi3Ecl63OddWJ0bX0Pms1lo15STbEQrZKmEGN6mQq5cuI41Q6Zdqa3hgnS+XQNg1yTaXVuDBdddLdprJqr2YXVrD+qgGfA3Nj0DkfeOEkrVbYTgtWoHjkVN4rU4zjHH1z+SNdT5SFp70AcMpZN43A+CQfRqPz2eCEPiv06QsrOO+36AkPSNDe4n6jU7V5r28uXjASuOzMTp0KBJ0pVFGtw9lara93lAIfZKRtCKsdmVUwPzoL2mbFa0YDV5ynbmnOUee/zdwo+hHrlNYEDtibejv9lGnAY132u1+T79lJMwPp4B+umggDgRN8wAAAAABJRU5ErkJggg==";

  const redHeart =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACp0lEQVR4nO2ZyWsUQRjFy31BBRG8iXgJCuJBUPQg8eAhoKIIzaTf6yaQw+By9eTBeFDR/0FFQQ9KvOQqMmiW+aoTUYlI4t2AOIgIRo1LpIYQoz1LZaZnKo394LsMTPXvVb2arvpGqUyZMv2fGurt3TgIbH7leatVGjTm+zs1eUkDRSE/anJ2rr5r4LUmbwh59IHnrag1TsHzNhR9v1vIuwKMC/mtPA7wRZMvNXAnAk6NeN66RMB1GHYIeU+Anwugq5YAExGQ+3ccAyTkRQFKluNMad8/M5bPr2oYXoBQgM82D4wV0C/kJjNORO4TYLLBcV4MA9sXP/Pk1YYe+PcsjjY1CZw38W7U9/fbwwOnm4VPugQoSRDsqB8b8oBt3ttewLNCZ+fKqvCzSi0TUjsHZc2VyFeffeCEa0Bd38BUoadnbbXs97sG1HZROhaDN640OZ0SAzdjBqIg2O0cjNYxGo/nPwhOugbT9ivwKWbAnE+cg9G+YhvZHMRSFKGvsRUYIfe6BtP29TZmwByDNfkhFStADlR8Dwj5MCUROlfRgHlBpAB+JsrltlU0MNvXt7zhc3v7DNyuCJ+Gn1Mx188w7KhpYG4vPHENqysVcKUufHkVwnBX07eo5KMzMZbPr1e2isizrqH1n5oudnfvUYuVaXG4hhfyV0QGqhG96epao4Gnjg1cUM124DQ56Cj3l1USMptHA4/bGRsBzicCv9CEkI/aYOCHkL2qFSpfO4FbLYxMSQdBl2q1TGtjvimbHHxk1bhKzAR5qNyATSDvmrxes2HVKukw3CLA/SZmfbJIHm47eMwI4An5fhHgM0Jeq9qgcqHhINhqNvhcJGpFZsD8WaKWqrTvH6zUXzWfLYm42CoCjgj5XMihyPePm8ax9ZczZcqUSaVFvwEOHoQBFyCYegAAAABJRU5ErkJggg==";

  useEffect(() => {
    api.get(`wines/${id}`).then((result) => setSelectedWine(result.data[0]));
    api
      .get("wines/favorites")
      .then((result) => setFavorites(result.data.map((e) => e.wine_id)));
  }, []);


  const handleRemove = async () => {
    try {
      await api.delete(`wines/favorites/${id}`);
      const result = await api.get("wines/favorites");
      setFavorites(result.data.map((e) => e.wine_id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    if(auth.isLogged) {
        try {
            await api.post(`wines/favorites/${id}`);
            const result = await api.get("wines/favorites");
            setFavorites(result.data.map((e) => e.wine_id));
          } catch (error) {
            console.error(error);
          }
    } else {
        navigate('/login')
    }

  };

  return (
    <div className="selected-wine">
      <div className="picture">
        <img src={selectedWine?.wine_img} alt="" />
      </div>
      <div className="carac">
        <div className="title">
          <p className="name">
            {selectedWine?.wine_name}, {selectedWine?.manufacture_year}
          </p>
          {favorites?.includes(parseInt(id)) ? (
            <img
              src={redHeart}
              alt=""
              className="fav-icon"
              onClick={handleRemove}
            />
          ) : (
            <img
              src={emptyHeart}
              alt=""
              className="fav-icon"
              onClick={handleAdd}
            />
          )}
        </div>
        <p>{selectedWine?.domain}</p>
        <p>Région : {selectedWine?.region_name}</p>
        <p>Appellation : {selectedWine?.appellation}</p>
        <p>Cépage : {selectedWine?.cepage}</p>
        <p className="desc-desk">{selectedWine?.comment}</p>
      </div>
    </div>
  );
}

export default SelectedWine;
