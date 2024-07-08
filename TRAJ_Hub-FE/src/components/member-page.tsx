//react

//components
import Header from "./header";
import Profile from "./member-profile";

//css

interface MemberProps {
    name: string
}

const MemberPage = (props: MemberProps) => {

    return (
        <section className="flex flex-col justify-items-center w-full h-fit min-h-custom-main text-cyan-50 z-10">
            <Header 
                name={props.name}/>
            <Profile
                />
        </section>
    );
};

export default MemberPage;