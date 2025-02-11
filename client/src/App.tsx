import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-background-primary min-h-screen h-full text-text font-body">
      <Navbar />
      <main className="container pt-5">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
