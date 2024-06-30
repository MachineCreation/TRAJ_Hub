// react

// components

// css


const TeamStats = () => {

    return (
        <section className="relative xl:absolute flex flex-col xl:flex-row xl:justify-between w-full xl:h-screen m-auto ">
            <aside className="flex order-2 xl:order-1 flex-col justify-stretch w-full xl:w-1/6 h-fit xl:h-full xl:pt-28 ">
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">stats 1 & 3</figure>
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor voluptatem consequuntur nulla tempore illum numquam sint eum ullam, doloribus illo excepturi, aspernatur ad magnam molestias delectus vero, doloremque mollitia officiis.</figure>
            </aside>
            <article className="flex order-1 xl:order-2 xl:self-end w-full xl:w-1/4 h-fit xl:h-1/4 border-2">
                <figure className="flex grow m-auto p-3 justify-items-center bg-slate-500 bg-opacity-10 text-cyan-50 text-center">stat table</figure>
            </article>
            <aside className="flex order-3 flex-col w-full xl:w-1/6 h-fit xl:h-full xl:pt-28">
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">stats 2 & 4</figure>
                <figure className=" flex xl:grow m-1 h-fit p-3 bg-slate-500 bg-opacity-10 text-cyan-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi hic voluptas, dicta at autem velit maxime veniam tempore. Exercitationem dolore laudantium, atque vero quia maxime necessitatibus ad minus provident mollitia?</figure>
            </aside>
        </section>
    );
};

export default TeamStats;