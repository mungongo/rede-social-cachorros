import Input from "../form/Input.tsx";
import Button from "../form/Button.tsx";
import useForm from "../../hooks/useForm.tsx";
import { USUARIO_POST } from "../../api.ts";
import { useUser } from "../../contexts/UserContext.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import Error from "../Helpe/Error.tsx";
import Head from "../Helpe/Head.tsx";

const LoginCreate = () => {
    const username = useForm('');
    const email = useForm('email');
    const password = useForm('');

    const { userLogin } = useUser();
    const { loading, request, error } = useFetch();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const { url, options } = USUARIO_POST({
            username: username.value,
            email: email.value,
            password: password.value
        });

        const { response } = await request(url, options);
        if (response && response.ok) userLogin(username.value, password.value);
    }

    return (
        <section className="animeLeft">
            <Head title="Criar conta"></Head>
            <h1 className="title">Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="Email" type="email" name="email" {...email} />
                <Input label="Senha" type="password" name="password" {...password} />
                {loading ? (
                    <Button disabled>Cadastrando...</Button>
                ) : (
                    <Button>Cadastrar</Button>
                )}
                <Error error={error} />
            </form>
        </section>
    );
};

export default LoginCreate;
