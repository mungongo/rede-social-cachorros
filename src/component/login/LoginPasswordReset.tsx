import {useEffect, useState} from "react";
import Input from "../form/Input.tsx";
import useForm from "../../hooks/useForm.tsx";
import Button from "../form/Button.tsx";
import {PASSWORD_RESET} from "../../api.ts";
import useFetch from "../../hooks/useFetch.tsx";
import Error from "../Helpe/Error.tsx";
import {useNavigate} from "react-router-dom";
import Head from "../Helpe/Head.tsx";

const LoginPasswordReset = ()=>{
    const [ login , setLogin] = useState('')
    const [ key , setKey] = useState('')
    const password = useForm()
    const { request, error, loading} = useFetch()
    const navegate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const keyParam = params.get("key");
        const loginParam = params.get("login");

        console.log("Parâmetros da URL:", { keyParam, loginParam });

        if (keyParam) setKey(keyParam);
        if (loginParam) setLogin(loginParam);
    }, []);

    async function handleSubmit(event:any) {
        event.preventDefault();
        if (!login || !key) {
            console.error("Erro: Key ou login estão vazios!");
            return;
        }

        if (password.validacao()) {
            const { url, options } = PASSWORD_RESET({
                login,
                key,
                password: password.value
            });
            const { response } = await request(url, options);
            if (response?.ok) navegate('/login');
        }
    }



    return(
        <section className="animeLeft">
            <h1 className="title">Reset Senha</h1>
            <Head title="Resetar senha"></Head>
            <form onSubmit={handleSubmit}>
                <Input type="password" label="Nova Senha" name="password" {...password}/>
                {loading?   <Button disabled>Resetando...</Button>: <Button> Resetar </Button>}

            </form>
            <Error error={error}></Error>
        </section>
    )
}
export default LoginPasswordReset