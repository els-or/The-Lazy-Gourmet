import React from "react";
import RecipeHistory from "../components/RecipeHistory";
import { Link } from "react-router-dom";

const History: React.FC = () => {
  return (
    <div className="p-5 mx-auto rounded-lg shadow-xl bg-background-tertiary">
      <h2 className="text-2xl font-bold mb-4">Recipe History</h2>
      <RecipeHistory />
      <div className="mt-4">
        <Link to="/">
          <button className="btn">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default History;
