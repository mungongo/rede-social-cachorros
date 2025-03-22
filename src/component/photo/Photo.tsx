import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.tsx";
import {useEffect} from "react";
import {FOTO_GET} from "../../api.ts";
import Error from "../Helpe/Error.tsx";
import Loading from "../Helpe/Loading.tsx";
import PhotoContent from "./PhotoContent.tsx";
import Head from "../Helpe/Head.tsx";

const Photo = ()=>{
    const { id} = useParams()
    const { data, loading, request, error } = useFetch()

    useEffect(()=>{
        const { url, options } = FOTO_GET(id)
        request(url,options)
    },[request,id])

    if (error) return <Error error={error}/>
    if (loading) return <Loading/>
    if (data) return(
        <section className="container mainContainer">
            <Head title={data.photo.title}></Head>
        <PhotoContent single={true} data={data}></PhotoContent>
        </section>
    )

}
export default Photo