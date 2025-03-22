import {Link} from "react-router-dom";
import Input from "../form/Input.tsx";
import Button from "../form/Button.tsx";
import useForm from "../../hooks/useForm.tsx";
import {useUser} from "../../contexts/UserContext.tsx";
import Error from "../Helpe/Error.tsx";
import styles from "./LoginForm.module.css";
import stylesbts from '../form/Button.module.css'
import Head from "../Helpe/Head.tsx";



const LoginForm = ()=>{

    const username = useForm("type");
    const password = useForm("type");
    const {  userLogin, error, loading } = useUser()
   async function handleSubmit(event:any){
        event.preventDefault();
        if (username.validacao() && password.validacao()){
        userLogin(username.value,password.value);
        }

    }

    return(
        <section className="animeLeft">
            <Head title="Login"></Head>
            <h1 className="title">Login form</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input label="Usuario" type="text" name="username" {...username}/>
                <Input label="Senha" type="password" name="password" {...password}/>
                {loading ? <Button disabled >Carregando</Button>: <Button >Entrar</Button>}
                <Error error ={error}></Error>
            </form>
            <Link className={styles.perdeu} to="/login/perdeu">Perdeu a senha?</Link>
            <div className={styles.cadastro}>
               <h1 className={styles.subtitle}>Cadastra-se</h1>
                <p>Ainda não possui conta? Cadastra-se no site</p>
                <Link className={stylesbts.button} to="/login/criar">Cadastro</Link>
            </div>

        </section>


    )
}
export default LoginForm