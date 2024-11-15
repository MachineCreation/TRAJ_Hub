// components
import Header from "../components/header";
import WeaponBuilder from "../components/weapon-builder";

function Test() {

  return (
    <section className="flex flex-col xl:h-screen w-full max-w-[1850px] m-auto justify-items-center relative">
    <Header
      name={'test'} />
    <div className="relative flex mx-5 p-4">
    <WeaponBuilder />
    </div>
    </section>
  )
}

export default Test;