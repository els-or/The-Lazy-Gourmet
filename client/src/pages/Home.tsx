import { useState, useEffect, useLayoutEffect } from "react";
//import { retrieveUsers } from "../api/userAPI";
//import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
//import UserList from "../components/Users";
import auth from "../utils/auth";
import RecipeForm from "../components/RecipeForm";
// import RecipeHistory from "../components/RecipeHistory";
import DisplayRecipe from "../components/DisplayRecipe.tsx";

const Home = () => {
  //const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const [recipe, setRecipe] = useState<string>();

  function updateRecipe(data: string) {
    setRecipe(data);
  }

  useEffect(() => {
    if (loginCheck) {
      //fetchUsers();

      setError(false);
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  //const fetchUsers = async () => {
  //  try {
  //    const data = await retrieveUsers();
  //   setUsers(data);

  //  } catch (err) {
  //     console.error("Failed to retrieve tickets:", err);
  //    setError(true);
  // }
  //};

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice text-center bg-background-tertiary p-5 mx-auto rounded-lg shadow-xl">
          <h3 className="font-header">
            Welcome to The Lazy Gourmet, an AI recipe generator!
          </h3>
          <p>
            Simply enter your ingredients, the number of people you are serving,
            any special requests and we will deliver a recipe right to your
            screen!
          </p>
          <p>Please log in to begin your experience.</p>
          <img
            src="/chef.png"
            alt="clipart of a gourmet chef"
            className="h-60 mx-auto"
          />
        </div>
      ) : (
        <div>
          <h4 className="font-header text-center p-5">
            Welcome {auth.getProfile().username}, please make your selections
            below!
          </h4>
          <RecipeForm updateRecipe={updateRecipe} />
          <hr className="w-48 h-1 mx-auto my-4 rounded-sm md:my-10" />
          <DisplayRecipe recipe={recipe} />
          {/* <UserList users = {users} /> */}
        </div>
      )}
    </>
  );
};

export default Home;
