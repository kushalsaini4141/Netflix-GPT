import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute p-5 flex justify-between w-screen bg-gradient-to-b from-black">
      <img
        className="w-44"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="logo"
      />

      {user &&(
        <div>
        <img
          alt="userImage"
          src={user.photoURL}
          className="h-10 w-10 rounded-sm"
        />
        <button className="font-bold text-black " onClick={handleSignOut}>
          (Sign Out)
        </button>
      </div>
      )}
    </div>
  );
};

export default Header;
