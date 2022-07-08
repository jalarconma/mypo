import RegisterPortafolioAsset from "../components/register-portafolio-asset/RegisterPortafolioAsset";
import UserPortafolioList from "../components/user-portafolio-list/UserPortafolioList";

const MyPortafolioPage = () => {
  return (
    <div>
      <h2>My Portafolio</h2>
      <RegisterPortafolioAsset />
      <UserPortafolioList />
    </div>
  )  
};

export default MyPortafolioPage;