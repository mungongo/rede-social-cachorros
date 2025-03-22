import UserHeaderNav from "./UserHeaderNav.tsx";
import styles from "./UserHeader.module.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const UserHeader = ()=>{
    const [title, setTitle] = useState('');
    const location = useLocation()

    useEffect(()=>{
        const {pathname} = location;
        switch(pathname){
            case '/conta/postar': setTitle('Posta Sua Foto')
                break;
            case '/conta/estatistica': setTitle('Estatistica')
                break;
            default: setTitle('Minha Conta');
        }
    },[location])
    return(
        <header className={styles.header}>
            <h1 className="title">{title}</h1>
            <UserHeaderNav/>
        </header>
    )
}
export default UserHeader