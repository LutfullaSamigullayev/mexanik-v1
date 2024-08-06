import { Header } from "../components/Header";
// import { Nav2 } from "../components/Nav2";
// import { Logo } from "../components/Logo";
import Nav from "../components/Nav";
import Machines from "./Machines";

const Home = () => {
  return (
    <div className="flex w-full h-fit">
      <Nav />
      <div className="flex-auto">
        <Header />
        <Machines />
      </div>
    </div>
  );
};

export default Home;
