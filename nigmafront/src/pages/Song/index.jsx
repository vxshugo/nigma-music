import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axiosInstance from "../../redux/axiosInstance";
import styles from './styles.module.scss'
import Like from "../../components/Like";

const Song = () => {
    const [song, setSong] = useState({})
    const [artist, setArtist] = useState({})
    const [isFetching, setIsFetching] = useState(false);
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    const idArtist = location.pathname.split("/")[3];


    const getSong = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + `/songs/info/${id}`;
            const res = await axiosInstance.get(url)
            setSong(res.data)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getSong()
    }, [])

    useEffect(() => {
        const getArtist = async () => {
            try {
                const url = process.env.REACT_APP_API_URL + `/artist/${idArtist}`
                const res = await axiosInstance.get(url)
                setArtist(res.data)
            }catch (e) {
                console.log(e)
            }
        }
        getArtist()
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.headContainer}>
                <div>
                    <img src={song.data?.img} alt=""/>
                </div>
                <div>
                    <p>Трек</p>
                    <h1>{song.data?.name}</h1>
                    <img src={artist?.data?.img} alt=""/><h3>{artist?.data?.name}</h3>
                    <p>Количество прослушиваний {song.data?.listens} <Like songId={id} /></p>
                </div>
            </div>
            <h2 style={{marginBottom: 10}}>Текст</h2>
            <span>{song.data?.text}</span>
        </div>
    )
}

export default Song
