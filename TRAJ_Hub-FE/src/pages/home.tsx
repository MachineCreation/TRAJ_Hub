// react

// components
import Header from "../components/header";
import NavCube from "../components/nav-cube";
import QuadSquad from "../components/quad-squad";
import TeamStats from "../components/team-stats";
import Footer from "../components/footer";


function Home() {


  return (
    <section className="flex flex-col xl:h-screen w-full max-w-[1850px] m-auto justify-items-center relative">
    <Header
      name={'Home'} />
    <NavCube />
    <QuadSquad />
    <TeamStats />
    <Footer />
    </section>
  )
}

export default Home;