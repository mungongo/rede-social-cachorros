import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { ReactComponent as Dogs } from '../assets/dogs.svg';
import {useUser} from "../contexts/UserContext.tsx";


const Header = ()=>{
    const {user} = useUser()
    return(
        <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
            <Link className={styles.logo} aria-label="Dog - Home" to="/">
       <Dogs />
            </Link>
            {user? <Link className={styles.login} to="/conta"> {user.username} </Link> :<Link className={styles.login} to="/login">Login / Criar Login</Link>
            }


        </nav>
        </header>
    )
}

export default Header