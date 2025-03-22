import UserHeader from "./UserHeader.tsx";
import UserPhoto from "./UserPhoto.tsx";
import {Route, Routes} from "react-router-dom";
import UserStats from "./UserStats.tsx";
import Feed from "../feed/Feed.tsx";
import {useUser} from "../../contexts/UserContext.tsx";
import NotFound from "../NotFound.tsx";
import Head from "../Helpe/Head.tsx";

const User = ()=>{
    const { user} = useUser()
    return(
        <section className="container">
            <Head title="Minha conta"></Head>
          <UserHeader/>
            <Routes>
                <Route path="/" element={<Feed user={user?.id}/>}/>
                <Route path="postar" element={<UserPhoto/>}/>
                <Route path="estatistica" element={<UserStats/>}/>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>

        </section>

    )
}
export default User;