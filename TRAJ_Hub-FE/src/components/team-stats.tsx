// react

// components
import YouTubeVideo from "./ytvid";

// css


const TeamStats = () => {

    return (
        <section className="relative xl:absolute flex flex-col xl:flex-row xl:justify-between w-full xl:h-screen m-auto ">
            <aside className="flex order-2 xl:order-1 flex-col justify-stretch w-full xl:w-1/6 h-fit xl:h-full xl:pt-28 ">
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">Youtube for <br/> topsloth <br/> Araspberryberet </figure>
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">Squad favorite weapons 1 & 2</figure>
            </aside>
            <article className="flex order-1 xl:order-2 xl:self-end w-full xl:w-1/4 h-60 xl:h-1/4">
                <figure className="flex grow mr-auto ml-auto justify-items-center text-center"><YouTubeVideo videoId="USLZJ5FTr-Y" /></figure>
            </article>
            <aside className="flex order-3 flex-col w-full xl:w-1/6 h-fit xl:h-full xl:pt-28">
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">Youtube for <br/> RedPrimeOrigin <br/> JesusTts</figure>
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">Squad favorite weapons 3 & 4</figure>
            </aside>
        </section>
    );
};

export default TeamStats;