import React from "react";
import RecipeHistory from "../components/RecipeHistory";
import { Link } from "react-router-dom";

const History: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recipe History</h2>
      <RecipeHistory />
      <div className="mt-4">
      <Link to="/">
      <button className= "text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Go Back
          </button>
      </Link>
    </div>
    </div>
  );
};

export default History;
