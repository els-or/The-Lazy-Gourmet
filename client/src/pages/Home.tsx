import { useState, useEffect, useLayoutEffect } from "react";
//import { retrieveUsers } from "../api/userAPI";
//import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
//import UserList from "../components/Users";
import auth from "../utils/auth";
import RecipeForm from "../components/RecipeForm";
import RecipeHistory from "../components/RecipeHistory";
import DisplayRecipe from "../components/DisplayRecipe.tsx";

const Home = () => {
  //const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const [recipe, setRecipe] = useState<string>();

  function updateRecipe(data: string) {
    setRecipe(data);
  }

  //useEffect(() => {
   // if (loginCheck) {
      //fetchUsers();
   //   checkLogin();
      
   // }
 // }, [loginCheck]);
  

 useLayoutEffect(() => {
  
    checkLogin();
 }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  



  /*const fetchUsers = async () => {
    try {
      //const data = await retrieveUsers();
      //setUsers(data);

    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };*/


  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Please login to view this page</h1>
        </div>
      ) : (
        <>
          {auth.getProfile().username}
          <RecipeForm updateRecipe={updateRecipe} />
          <DisplayRecipe recipe={recipe} />
          {/* <UserList users = {users} /> */}
        </>
      )}
      <RecipeHistory />
    </>
  );
};

export default Home;
