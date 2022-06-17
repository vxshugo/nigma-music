import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Playlist from "../../components/Playlist";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";

const Library = () => {
	const {t} = useTranslation()

	const { playlists } = useSelector((state) => state.playlists);
	const { user } = useSelector((state) => state.user);
	return (
		<div className={styles.container}>
			<h1>{t("mainApp.library.title")}</h1>
			<div className={styles.playlists_container}>
				<Link to="/collection/tracks">
					<div className={styles.liked_songs}>
						<h1>{t("mainApp.library.likedSong")}</h1>
						<p>{user?.likedSongs.length} {t("mainApp.library.likedSong")}</p>
					</div>
				</Link>
				<Playlist playlists={playlists} />
			</div>
		</div>
	);
};

export default Library;
