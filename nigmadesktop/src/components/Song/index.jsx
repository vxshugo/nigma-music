import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../../redux/audioPlayer";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import {Link} from "react-router-dom";
import axiosInstance from "../../redux/axiosInstance";
momentDurationFormatSetup(moment);


const Song = ({ song, playlist, handleRemoveSong }) => {
	const [menu, setMenu] = useState(false);
	const [artist, setArtist] = useState({})
	const { currentSong } = useSelector((state) => state.audioPlayer);
	const dispatch = useDispatch();

	const getArtist = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + `/artist/${song.artist}`
			const res = await axiosInstance.get(url)
			setArtist(res.data)
		}catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		getArtist()
	},[])

	const handleChange = () => {
		if (currentSong && currentSong.action === "play") {
			const payload = {
				song: song,
				action: "pause",
			};
			dispatch(setCurrentSong(payload));
		} else {
			const payload = {
				song: song,
				action: "play",
			};
			dispatch(setCurrentSong(payload));
		}
	};

	return (
		<div className={styles.song_container}>
			<div className={styles.left}>
				<IconButton onClick={handleChange} className={styles.play_btn}>
					{currentSong &&
					currentSong.action === "play" &&
					currentSong.song._id === song._id ? (
						<PauseIcon />
					) : (
						<PlayArrowIcon />
					)}
				</IconButton>
				<img src={song.img} alt="song_img" />
				<p>
					<Link to={`/song/${currentSong?.song?._id}/${artist?.data?._id}`}>
						{song?.name}
					</Link>
				</p>
			</div>
			<div className={styles.center}>
				<p>{artist?.data?.name}</p>
			</div>
			<div className={styles.subright}>
				<p>{song.listens}</p>
			</div>
			<div className={styles.right}>
				<Like songId={song._id} />
				<p>{moment.duration(song.duration, "second").format("mm:ss", { trim: false })}</p>
				<IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
					<MoreHorizIcon />
				</IconButton>
				{menu && (
					<PlaylistMenu
						playlist={playlist}
						song={song}
						handleRemoveSong={handleRemoveSong}
						closeMenu={() => setMenu(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default Song;
