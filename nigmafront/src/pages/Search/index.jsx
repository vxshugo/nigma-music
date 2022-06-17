import { Fragment, useState } from "react";
import axiosInstance from "../../redux/axiosInstance";
import Song from "../../components/Song";
import Playlist from "../../components/Playlist";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const Search = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const {t} = useTranslation()

	const handleSearch = async ({ currentTarget: input }) => {
		setSearch(input.value);
		setResults({});
		try {
			setIsFetching(true);
			const url = process.env.REACT_APP_API_URL + `/?search=${input.value}`;
			const { data } = await axiosInstance.get(url);
			setResults(data);
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.search_input_container}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<input
					type="text"
					placeholder={t("mainApp.search.title")}
					onChange={handleSearch}
					value={search}
				/>
				<IconButton onClick={() => setSearch("")}>
					<ClearIcon />
				</IconButton>
			</div>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}
			{Object.keys(results).length !== 0 && (
				<div className={styles.results_container}>
					{results.songs.length !== 0 && (
						<div className={styles.songs_container}>
							{results.songs.map((song) => (
								<Fragment key={song._id}>
									<Song song={song} />
								</Fragment>
							))}
						</div>
					)}
					{results.artists.length !== 0 && (
						<div className={styles.artist_container}>
							{results.artists.map((artist) => (
								<Fragment key={artist._id}>
									<div className={styles.artist_block}>
										<Link to={`/artist/${artist._id}`}>
											<div className={styles.artist_info}>
												<img src={artist.img} alt=""/>
												<h2>{artist.name}</h2>
											</div>
										</Link>
									</div>
								</Fragment>
							))}
						</div>
					)}
					{results.playlists.length !== 0 && (
						<div className={styles.playlists_container}>
							<Playlist playlists={results.playlists} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
