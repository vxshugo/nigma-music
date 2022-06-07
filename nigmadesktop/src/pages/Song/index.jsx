import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
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
        getArtist();
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.headContainer}>
                <div className={styles.leftBlock}>
                    <img src={song.data?.img} alt=""/>
                </div>
                <div className={styles.right_block}>
                    <p className={styles.track}>Track</p>
                    <h1>{song.data?.name}</h1>
                    <Link to={`/artist/${artist?.data?._id}`}>
                        <div className={styles.artist_block}>
                            <img src={artist?.data?.img} alt=""/>
                            <h3>{artist?.data?.name}</h3>
                        </div>
                    </Link>
                    <p>Number of auditions: <span style={{fontSize: 16, color: "lightgreen"}}>{song.data?.listens}</span> <Like songId={id} /></p>
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <h2 style={{marginBottom: 10}}>Text</h2>
                <div className={styles.textblock}>
                    <span>{song.data?.text}</span>
                </div>
            </div>
        </div>
    )
}

export default Song
