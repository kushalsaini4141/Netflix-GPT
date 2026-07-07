import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Browse from "./Browse";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch()
const appRouter = createBrowserRouter([
  {
    path: "/",
     element: (
      <>
        <Header />
        <Login />
      </>
    ),
  },
  {
    path: "/browse",
    element: (
      <>
        <Header />
        <Browse />
      </>
    ),
  }
])

useEffect(()=>{
 const unsubscribe =  onAuthStateChanged(auth, (user) => {
  if (user) {
    const {uid,email, displayName,photoURL} = user;
    dispatch(addUser({uid: uid, email: email,displayName: displayName, photoURL: photoURL}))
  } else {
    dispatch(removeUser());
  }

});
    return () => unsubscribe();

}, [dispatch])


  return (
    <div>
      <RouterProvider router ={appRouter}/>
    </div>
  );
};

export default Body;