import { useEffect, useState } from 'react';
import './SelectedRecipe.scss'
import api from "../../services/api";
import { useParams } from 'react-router-dom';



function SelectedRecipe() {

  const [recipe, setRecipe] = useState([])
  const { id } = useParams();


  useEffect(() => {
    
    api.get(`recipes/${id}`).then((result) => console.log(result.data))

  }, [])
  

  return <div>SelectedRecipe</div>;
}

export default SelectedRecipe;
