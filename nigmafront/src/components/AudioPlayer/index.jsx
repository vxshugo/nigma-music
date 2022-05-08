import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong } from "../../redux/audioPlayer";
import Like from "../Like";
import { IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import styles from "./styles.module.scss";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import axiosInstance from "../../redux/axiosInstance";
momentDurationFormatSetup(moment);

const AudioPlayer = () => {
	const [trackProgress, setTrackProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const { currentSong } = useSelector((state) => state.audioPlayer);
	const dispatch = useDispatch();
	const [artist, setArtist] = useState({})

	const data = {
		listens: currentSong.song.listens + 1
	}
	const audioRef = useRef();
	const intervalRef = useRef();

	const addListens = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + `/songs/cursong/${currentSong.song._id}`;
			const res = await axiosInstance.put(url, data)
		}catch (e) {
			console.log(e)
		}
	}

	const getArtist = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/artist/" + currentSong.song.artist
			const res = await axiosInstance.get(url)
			setArtist(res.data)
		}catch (e){
			console.log(e)
		}
	}

	const startTimer = () => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef && audioRef.current.ended) {
				dispatch(setCurrentSong({ ...currentSong, action: "play" }));
				addListens()
			} else if (audioRef) {
				setTrackProgress(audioRef.current.currentTime);
				audioRef.current.duration && setDuration(audioRef.current.duration);
			} else {
				setTrackProgress(0);
			}
		}, [1000]);
	};

	const currentPercentage = duration
		? `${(trackProgress / duration) * 100}%`
		: "0%";
	const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

	useEffect(() => {
		if (currentSong.action === "play") {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [currentSong]);

	useEffect(() => {
		currentSong.action === "play" && startTimer();
	});

	useEffect(() => {
		getArtist()
	},[])

	const onScrub = (value) => {
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};
	const onVolum = (value) => {
		audioRef.current.volume = value / 100
	}

	const handleActions = () => {
		currentSong.action === "play"
			? dispatch(setCurrentSong({ ...currentSong, action: "pause" }))
			: dispatch(setCurrentSong({ ...currentSong, action: "play" }));


	};

	return (
		<div className={styles.audio_player}>
			<div className={styles.left}>
				<img src={currentSong.song.img} alt="song_img" />
				<div className={styles.song_info}>
					<p className={styles.song_name}>{currentSong.song.name}</p>
					<p className={styles.song_artist}>{artist.data?.name}</p>
				</div>
			</div>
			<div className={styles.center}>
				<div className={styles.audio_controls}>
					<IconButton className={styles.prev}>
						<SkipPreviousIcon />
					</IconButton>
					<IconButton className={styles.play} onClick={handleActions}>
						{currentSong.action === "play" ? <PauseIcon /> : <PlayArrowIcon />}
					</IconButton>
					<IconButton className={styles.next}>
						<SkipNextIcon />
					</IconButton>
				</div>
				<div className={styles.progress_container}>
					<p>{moment.duration(trackProgress, "second").format("mm:ss", { trim: false })}</p>
					<input
						type="range"
						value={trackProgress}
						step="1"
						min="0"
						onChange={(e) => onScrub(e.target.value)}
						max={duration ? duration : 0}
						className={styles.progress}
						style={{ background: trackStyling }}
					/>
					<audio src={currentSong.song.song} ref={audioRef}></audio>
					<p>{moment.duration(duration, "second").format("mm:ss", { trim: false })}</p>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.controllers}>
					<Like songId={currentSong.song._id} />
					<input
						type="range"
						onChange={(e) => onVolum(e.target.value)}
						defaultValue="100"
						className={styles.progress}
					/>
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
