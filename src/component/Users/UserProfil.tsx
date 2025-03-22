import Feed from "../feed/Feed.tsx";
import {useParams} from "react-router-dom";
import Head from "../Helpe/Head.tsx";

const UserProfil = ()=>{
    const {user} = useParams()

    return(
        <section className="container mainContainer" >
            <h1 className="title">{user}</h1>
            <Head title={`Perfil `+user}></Head>
            <Feed user={user}/>
        </section>
    )
}
export default UserProfil;