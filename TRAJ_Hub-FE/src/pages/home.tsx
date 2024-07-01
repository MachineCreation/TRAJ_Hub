// react

// components
import Header from "../components/header";
import NavCube from "../components/nav-cube";
import QuadSquad from "../components/quad-squad";
import TeamStats from "../components/team-stats";

function Home() {


  return (
    <section className="flex flex-col xl:h-screen w-full m-auto justify-items-center relative">
    <Header
      name={'Home'} />
    <NavCube />
    <QuadSquad />
    <TeamStats />
    </section>
  )
}

export default Home;