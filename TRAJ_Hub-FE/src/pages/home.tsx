// react

// components
import Header from "../components/header";
import NavCube from "../components/nav-cube";
import QuadSquad from "../components/quad-squad";
import TeamStats from "../components/team-stats";
import Footer from "../components/footer";

function Home() {

  return (
    <div className="w-full">
      <Header
        name={'Home'} />
      <section className="flex flex-col xl:h-screen w-full max-w-[1850px] m-auto justify-items-center relative">
      
      <NavCube />
      <QuadSquad />
      <TeamStats />
      <Footer />
      </section>
    </div>
  )
}

export default Home;