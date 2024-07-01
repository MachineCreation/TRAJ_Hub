//react

//components
import Header from "./header";

//css

interface MemberProps {
    name: string
}

const MemberPage = (props: MemberProps) => {

    return (
        <section className="w-full h-fit min-h screen text-cyan-50">
            <Header 
                name={props.name}/>
        </section>
    );
};

export default MemberPage;