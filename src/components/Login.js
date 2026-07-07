import { useState } from "react";
import { useRef } from "react";
import { checkValidate } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [signInForm, setsignInForm] = useState(true);
  const [erromessage, seterrormessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleclick = () => {
    const message = checkValidate(
      email.current.value,
      password.current.value,
      signInForm ? "" : fullName.current.value,
      signInForm,
    );
    seterrormessage(message);
    if (message) return;
    if (!signInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/136878465?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                }),
              );
              navigate("/browse");
            })
            .catch((error) => {
              seterrormessage(error.message);
            });

          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(errorCode + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + errorMessage);
          seterrormessage(errorCode + errorMessage);
        });
    }
  };

  return (
    <div className="relative">
      <img
        className="h-screen inset-0 w-screen object-cover "
        src="https://assets.nflxext.com/ffe/siteui/vlv3/81b52f88-dc76-488d-a939-0cf13a260a6e/web/IN-en-20260622-TRIFECTA-perspective_d39d60ef-cb5a-4793-9546-0a8d9a87948e_large.jpg"
        alt="background"
      />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-0 left-0 right-0 mx-auto my-36 w-3/12 bg-black/80 p-12 rounded-lg text-white"
      >
        <h1 className="text-3xl font-bold py-4">
          {signInForm ? "Sing In" : "Sing Up"}
        </h1>

        <input
          ref={email}
          className="p-4 my-4 w-full rounded bg-gray-700"
          type="text"
          placeholder="Email Address"
        />

        {!signInForm && (
          <input
            ref={fullName}
            className="p-4 my-4 w-full bg-gray-700 rounded"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={password}
          className="p-4 my-4 w-full rounded bg-gray-700"
          type="password"
          placeholder="Password"
        />

        <p className="font-bold text-lg text-red-600">{erromessage}</p>

        <button
          className="p-4 my-6 w-full rounded bg-red-600"
          onClick={handleclick}
        >
          {" "}
          {signInForm ? "Sing In" : "Sing Up"}
        </button>

        <p
          className="text-white cursor-pointer"
          onClick={() => setsignInForm(!signInForm)}
        >
          {signInForm
            ? "New to netflix? Sign Up now"
            : "Already Registered? sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
