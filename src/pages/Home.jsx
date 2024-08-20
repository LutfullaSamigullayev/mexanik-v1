import { Outlet, Route } from "react-router-dom";
import { Header } from "../components/Header";
import MachineSelect from "../components/MachineSelect";
import Nav from "../components/Nav";
import Inventory from "./Inventory";
import Machines from "./Machines";

const Home = () => {
  return (
    <div className="flex w-full h-fit">
      <Nav />
      <div className="flex-auto">
        <Header />
        <Outlet />
        {/* <Machines /> */}
        {/* <Inventory /> */}
        {/* <MachineSelect /> */}
      </div>
    </div>
  );
};

export default Home;
