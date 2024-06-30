// React

// components

// css
import "../css/QuadSquad.css"

const QuadSquad = () => {

    return(
        <div className="absolute flex justify-items-center w-full h-screen">
            <section className="flex w-full max-w-5xl h-screen m-auto overflow-hidden relative">
                <figure id="avi-t"></figure>
                <figure id="avi-r"></figure>
                <figure id="avi-a"></figure>
                <figure id="avi-j"></figure>
            </section>
        </div>
    );
};

export default QuadSquad;