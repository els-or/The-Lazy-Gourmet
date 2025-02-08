import React from "react";
import RecipeHistory from "../components/RecipeHistory";

const History: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recipe History</h2>
      <RecipeHistory />
    </div>
  );
};

export default History;
