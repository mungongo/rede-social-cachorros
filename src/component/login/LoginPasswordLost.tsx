import Input from "../form/Input.tsx";
import Button from "../form/Button.tsx";
import useForm from "../../hooks/useForm.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import {PASSWORD_LOST} from "../../api.ts";
import Error from "../Helpe/Error.tsx";
import Head from "../Helpe/Head.tsx";

const LoginPasswordLost = ()=>{
    const login = useForm()
    const {data,loading,error,request}= useFetch()

    async function handleSubmit(event:any){
        event.preventDefault()
        if (login.validacao()){
            const { url, options }= PASSWORD_LOST({
                login: login.value,
                url: window.location.href.replace('perdeu','resetar') });
            await request(url, options)
        }

    }
    return(
        <section className="animeLeft">
            <Head title="Perdeu senha"></Head>
            <h1 className="title"> Perdeu a Senha?</h1>
            {data? <p style={{color:'#4c1'}}>{data} </p> : <form onSubmit={handleSubmit}>
                <Input label=" Email / Usuario " type="text" name="email" {...login}/>
                {loading? <Button disabled>Enviando...</Button>: <Button>Enviar email</Button>}

            </form>}

            {error && <Error error={error}/>}
        </section>
    )
}
export default LoginPasswordLost