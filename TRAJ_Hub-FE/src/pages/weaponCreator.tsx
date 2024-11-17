// components
import Header from "../components/header";
import WeaponBuilder from "../components/weapon-builder";

function WeaponCreator() {

  return (
    <section className="flex flex-col xl:h-screen w-full max-w-[1850px] m-auto justify-items-center relative">
    <Header
      name={'Weapon Creator'} />
    <div className="relative flex mx-5 p-4 rounded-xl shadow-orange-inner">
    <WeaponBuilder />
    </div>
    </section>
  )
}

export default WeaponCreator;