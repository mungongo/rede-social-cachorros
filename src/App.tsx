import './App.css';
import Footer from "./component/Footer.tsx";
import Header from "./component/Header.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./component/Home.tsx";
import Login from "./component/login/Login.tsx";
import {UserProvider} from "./contexts/UserContext.tsx";
import User from "./component/Users/User.tsx";
import ProtectedRoute from "./component/Helpe/ProtecteRoute.tsx";
import Photo from "./component/photo/Photo.tsx";
import UserProfil from "./component/Users/UserProfil.tsx";
import NotFound from "./component/NotFound.tsx";


const App = ()=>{
    return (
        <div className="app">
            <BrowserRouter>
           <UserProvider>
                <Header/>
               <main className="appBody">
                 <Routes>
                     <Route path="/" element={<Home/>}></Route>
                     <Route path="login/*" element={<Login/>}></Route>
                     <Route path="conta/*" element={<ProtectedRoute><User/></ProtectedRoute>}></Route>
                     <Route path="foto/:id" element={<Photo/>}></Route>
                     <Route path="perfil/:user" element={<UserProfil/>}></Route>
                     <Route path="*" element={<NotFound/>}></Route>
                 </Routes>
               </main>
                <Footer/>
            </UserProvider>
            </BrowserRouter>

        </div>

    )
 }

 export default App;