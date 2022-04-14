import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axiosInstance from "../../redux/axiosInstance";
import styles from './styles.module.scss'
import Like from "../../components/Like";

const Song = () => {
    const [song, setSong] = useState({})
    const [isFetching, setIsFetching] = useState(false);
    const location = useLocation()
    const id = location.pathname.split("/")[2];


    useEffect(() => {
        const getSong = async () => {
            try {
                const url = process.env.REACT_APP_API_URL + `/songs/info/${id}`;
                const res = await axiosInstance.get(url)
                setSong(res.data)
            }catch (e) {
                console.log(e)
            }
        }
        getSong()
    }, [])

    return(
        <div className={styles.container}>
            <h1>{song.data?.name}</h1>
            <div className={styles.track_info}>
                <h3>{song.data?.artist}</h3>
                <p>Количество прослушиваний {song.data?.listens} <Like songId={id} /></p>
            </div>
            <h2 style={{marginBottom: 10}}>Текст</h2>
            <span>{song.data?.text}</span>
        </div>
    )
}

export default Song
