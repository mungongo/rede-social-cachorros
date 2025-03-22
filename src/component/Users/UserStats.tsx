import Head from "../Helpe/Head.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import {lazy, Suspense, useEffect} from "react";
import {STATS_GET} from "../../api.ts";
import Loading from "../Helpe/Loading.tsx";
import Error from "../Helpe/Error.tsx";
const UserStatsGraph = lazy(()=> import('./UserStatsGraph'))

const UserStats = ()=>{
    const { data, loading, request, error} = useFetch()

    useEffect(()=>{
        async function getData(){
            const {url, options} = STATS_GET()
            await request(url, options)
        }
        getData()
    },[request])

    if (loading) return <Loading/>
    if (error) return <Error error={error}></Error>
    if (data && data)
    return(
        <Suspense fallback={<div></div>}>
            <Head title="estatistica"></Head>
            <UserStatsGraph data={data}></UserStatsGraph>
        </Suspense>
    );
    else return null;
}
export default UserStats