import React, {Fragment, useEffect, useState} from "react";
import styles from "./styles.module.scss"
import {useLocation} from "react-router-dom";
import axiosInstance from "../../redux/axiosInstance";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Song from "../../components/Song";

const Artist = () => {
    const [artist, setArtist] = useState({});
    const [songs, setSongs] = useState([]);
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const getArtist = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + `/artist/${id}`
            const { data } = await axiosInstance.get(url)
            setArtist(data.data)
            setSongs(data.songs)
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        getArtist()
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.headContainer}>
                <div className={styles.leftBlock}>
                    <img src={artist.img} alt=""/>
                </div>
                <div className={styles.right_block}>
                    <p className={styles.track}>Artist</p>
                    <h1>{artist.name}</h1>
                    <p>Number of tracks: <span style={{fontSize: 16, color: "lightgreen"}}>{artist?.songs?.length}</span></p>
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <h2 style={{marginBottom: 10}}>Tracks</h2>
                <div className={styles.textblock}>
                    <div className={styles.body}>
                        <div className={styles.body_nav}>
                            <div className={styles.left}>
                                <span>#</span>
                                <p>Title</p>
                            </div>
                            <div className={styles.center}>
                                <p>Artist</p>
                            </div>
                            <div className={styles.subright}>
                                <p>Listens</p>
                            </div>
                            <div className={styles.right}>
                                <AccessTimeIcon />
                            </div>
                        </div>
                        {songs.map((song) => (
                            <Fragment key={song._id}>
                                <Song
                                    song={song}
                                />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Artist