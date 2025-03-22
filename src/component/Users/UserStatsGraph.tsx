import {useEffect, useState} from "react";
import styles from './UserStatsGraph.module.css'
import {VictoryPie, VictoryChart, VictoryBar} from "victory"


const UserStatsGraph = ({data}:any)=>{
    const [graph, setGraph]= useState([])
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        const graphData = data.map((item:any) =>{
            return{
                x: item.title,
                y: Number(item.acessos)
            }
        })
        console.log(data)
        setTotal(data.map(({acessos}:any )=> Number(acessos)).reduce((a:any,b:any)=> a+b)
        )
        setGraph(graphData);
    },[data])
    return(
        <section className={`${styles.graph} animeLeft`}>
            <div className={`${styles.total} ${styles.graphItem}`}>
                <p>Acessos: {total}</p>
            </div>
            <div className={styles.graphItem}>
                <VictoryPie
                    data={graph}
                    innerRadius={50}
                padding={{top: 20,bottom:20, left:80, right:80}}
                style={{
                    data:{
                        fillOpacity: 0.9,
                        stroke: '#fff',
                        strokeWidth:2,
                },
                    labels: {
                        fontSize: 14,
                        fill: '#333'
                    },
                }}>

                </VictoryPie>
            </div>
            <div className={styles.graphItem}>
                <VictoryChart>
                    <VictoryBar alignment="start" data={graph}></VictoryBar>
                </VictoryChart>
            </div>
        </section>
    );
}
export default UserStatsGraph