import {NavLink, useLocation} from "react-router-dom";
import {useUser} from "../../contexts/UserContext.tsx";
import { ReactComponent as MinhasFotos } from '../../assets/feed.svg';
import { ReactComponent as Estatistica } from '../../assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../assets/adicionar.svg';
import { ReactComponent as Sair } from '../../assets/sair.svg';
import  styles from './UserHeaderNava.module.css'
import {useEffect, useState} from "react";
import useMedia from "../../hooks/useMedia.tsx";


const UserHeaderNav = ()=>{

    const {userLogout} = useUser()
    const mobile = useMedia({media:"(max-width: 40rem)"})

    const [mobileMenu, setMobileMenu] = useState<boolean>(false);
    const {pathname} = useLocation()

    useEffect(()=>{
        setMobileMenu(false)
    },[pathname])
    return(
        <>
        {mobile &&<button className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} aria-label="Menu" onClick={()=>{ setMobileMenu(!mobileMenu)}}></button>}
        <nav className={`${mobile?styles.navMobile:styles.nav} ${mobileMenu && styles.navMobileActive}`}>

            <NavLink to="/conta" end>
                <MinhasFotos/> {mobile && 'Minhas Fotos'}
            </NavLink>

            <NavLink to="/conta/estatistica">
                <Estatistica/> {mobile && 'Estatistica'}
            </NavLink>
            <NavLink to="/conta/postar">
                <AdicionarFoto/>{mobile && 'Adicionar Foto'}</NavLink>
            <button onClick={userLogout}>
                <Sair/>{mobile && 'Sair'}</button>
        </nav></>
    )
}
export default UserHeaderNav