import Feed from "./feed/Feed.tsx";
import Head from "./Helpe/Head.tsx";


const Home = ()=>{
    return(
        <section className="container mainContainer">
            <Head title="Fotos"/>
            <Feed/>
        </section>

    )
}

export default Home