import api from "./api";


const getCurrentCategoryUser = () => {
    return api.get("/tags/category");
  };

const sendTags = async (tagsId) => {
  return api.post("/tags/sendTags", { tags : tagsId  });
};


  
export { getCurrentCategoryUser, sendTags };
export default { getCurrentCategoryUser, sendTags };
