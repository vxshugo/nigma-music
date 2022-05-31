import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { getAllSongs } from "./redux/songsSlice/apiCalls";
import { getAllUsers } from "./redux/usersSlice/apiCalls";
import {getAllArtists} from "./redux/artist/apiCalls";
import { getAllPlaylists } from "./redux/playlistSlice/apiCalls";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Songs from "./pages/Songs";
import SongForm from "./components/Forms/SongForm";
import UserForm from "./components/Forms/UserForm";
import Artist from "./pages/Artist";
import ArtistForm from "./components/Forms/ArtistForm";

function App() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}

		if (user && token) {
			getAllSongs(dispatch);
			getAllArtists(dispatch);
			getAllUsers(dispatch);
			getAllPlaylists(dispatch);
		}
	}, [dispatch, user]);

	return (
		<Switch>
			<Route path="/login" component={Login} />
			{user && user.isAdmin && (
				<Fragment>
					<Navbar />
					<Sidebar />
					<main className="main">
						<Route exact path="/" component={Dashboard} />
						<Route path="/songs/:id" component={SongForm} />
						<Route path="/users/:id" component={UserForm} />
						<Route path="/artist/:id" component={ArtistForm} />
						<Route exact path="/users" component={Users} />
						<Route exact path="/songs" component={Songs} />
						<Route exact path="/artist" component={Artist} />
					</main>
				</Fragment>
			)}
			{!user && <Redirect to="/login" />}
		</Switch>
	);
}

export default App;
