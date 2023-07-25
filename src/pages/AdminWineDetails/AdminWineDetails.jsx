import { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./AdminWineDetails.scss";

const AdminWineDetails = () => {
  const [wine, setWine] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getWineInfos = async (id) => {
      try {
        const wineInfos = await getWinesById(id);
        setWine(wineInfos.data);
      } catch (error) {
        console.error(error);
      }
    };

    getWineInfos(id);
  }, []);
  return <div className="admin-wine-details">AdminWineDetails</div>;
};

export default AdminWineDetails;
