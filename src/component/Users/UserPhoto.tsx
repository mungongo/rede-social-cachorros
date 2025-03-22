import styles from "./UserPhotoPost.module.css";
import Input from "../form/Input.tsx";
import Button from "../form/Button.tsx";
import useForm from "../../hooks/useForm.tsx";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch.tsx";
import { PHOTO_POST } from "../../api.ts";
import {useNavigate} from "react-router-dom";
import Head from "../Helpe/Head.tsx";

const UserPhoto = () => {
    const nome = useForm("");
    const peso = useForm("numero");
    const idade = useForm("numero");
    const [img, setImg] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: null });
    const { data, error, loading, request } = useFetch();
    const navegate = useNavigate()

    useEffect(()=>{
        if(data) navegate("/conta");
    },[navegate,data])

    function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const preview = URL.createObjectURL(file);
            setImg({ file, preview });
        }
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (nome.validacao() && peso.validacao() && idade.validacao()){
            if (!img.file) {
                console.error("Nenhuma imagem selecionada.");
                return;
            }

            const formData = new FormData();
            formData.append("img", img.file);
            formData.append("nome", nome.value);
            formData.append("peso", String(peso.value));
            formData.append("idade", String(idade.value));

            const token = window.localStorage.getItem("token");

            const { url, options } = PHOTO_POST(formData, token);
            request(url, options);
        }

    }

    // Limpar a URL da prévia quando o componente for desmontado
    useEffect(() => {
        return () => {
            if (img.preview) URL.revokeObjectURL(img.preview);
        };
    }, [img.preview]);

    return (

        <section className={`${styles.photoPost} animeLeft`}>
            <Head title="poste sua foto"></Head>
            <form onSubmit={handleSubmit}>
                <Input label="Nome" type="text" name="nome" {...nome} />
                <Input label="Peso" type="number" name="peso" {...peso} />
                <Input label="Idade" type="number" name="idade" {...idade} />
                <input className={styles.file} type="file" name="img" id="img" accept="image/*" onChange={handleImgChange} />
                <Button disabled={loading}>{loading ? "Enviando..." : "Enviar"}</Button>
            </form>

            {img.preview && (
                <div className={styles.preview} style={{ backgroundImage: `url('${img.preview}')` }}></div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && <p style={{ color: "green" }}>Imagem enviada com sucesso!</p>}
        </section>
    );
};

export default UserPhoto;
