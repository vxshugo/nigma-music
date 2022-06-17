import { Link } from "react-router-dom";
import Button from "../../components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import logo from "../../images/toplogo226.svg";
import styles from "./styles.module.scss";
import Modal from "../../components/Popup";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import "../../i18next";

const Main = () => {
	const [modalActive, setModalActive] = useState(false)

	const { t, i18n } = useTranslation();


	const changleLanguage = (lang) => {
		i18n.changeLanguage(lang)
	}

	const navLinks = [
		{ name: t("mainPage.navLinks.part1"), link: "/ekfowpekf" },
		{ name: t("mainPage.navLinks.part2"), link: "/fewkofpkwe" },
		{ name: t("mainPage.navLinks.part3"), link: "/fewkfwe" },
		{ name: t("mainPage.navLinks.part4"), link: "/signup" },
		{ name: t("mainPage.navLinks.part5"), link: "/login" },
	];

	return (
		<div className={styles.container}>
			<Modal active={modalActive} setActive={setModalActive}/>
			<nav className={styles.navbar_container}>
				<Link to="/" className={styles.nav_logo}>
					<img src={logo} alt="logo" />
				</Link>
				<div className={styles.nav_links}>
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} className={styles.links}>
							{link.name}
						</Link>
					))}
				</div>
				<div className={styles.changeLang}>
					<h3 onClick={() => changleLanguage('ru')} className={styles.buttonLang}>RU</h3>
					<h3 onClick={() => changleLanguage('en')} className={styles.buttonLang}>EN</h3>
				</div>
			</nav>
			<main className={styles.main_container}>
				<div className={styles.main}>
					<h1>{t("mainPage.mainText.firstText")}</h1>
					<p>{t("mainPage.mainText.secondText")}</p>
					<Link to="/signup">
						<Button
							label="GET NIGMA"
							style={{ color: "#fff", width: "18rem", fontSize: "1.4rem" }}
						/>
					</Link>
				</div>
			</main>
			<footer className={styles.footer_container}>
				<div className={styles.footer_1}>
					<Link to="/" className={styles.footer_logo}>
						<img src={logo} alt="logo" />
					</Link>
				</div>
				<div className={styles.footer_2}>
					<div className={styles.copy_right}>
						<CopyrightIcon />
						<span>2022 Nigma</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Main;
