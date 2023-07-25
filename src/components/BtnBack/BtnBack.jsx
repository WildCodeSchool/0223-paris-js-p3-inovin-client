import "./BtnBack.scss";
const BtnBack = ({ handleBackClick }) => {
  return (
    <button type="button" onClick={handleBackClick} className="backButton btn">
      Retour
    </button>
  );
};

export default BtnBack;
