import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SongTable from "../../components/Tables/SongTable";
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import styles from "./styles.module.scss";
import styled from "styled-components";
import React,{useState} from "react";

const Songs = () => {
	const { songs } = useSelector((state) => state.songs);
	const [value, setValue] = useState('');

	const filteredProducts = songs.filter(product => {
		return product.name.includes(value)
	})

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					songs <MusicNoteIcon />
				</h1>
				<ContainerS>
					<SearchContainer>
						<Input
							placeholder="Search"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</SearchContainer>
					<Auto>
						{
							value ?
								filteredProducts.map(pru)
						}
					</Auto>
				</ContainerS>
				<Link to="/songs/new">
					<Button startIcon={<AddIcon />} label="Add New Song" />
				</Link>
			</div>
			<SongTable songs={songs} />
		</div>
	);
};
export default Songs;

const ContainerS = styled.div`
    position: relative;
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
	width: 400px;
	height: 30px;
`
const Input = styled.input`
	width: 400px;
	height: 30px;
  border: none;
`
const Auto = styled.ul`
  position: absolute;
  left: 25px;
  top: 40px;
  width: 100%;
  background-color: white;
  z-index: 99999;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.15);
  max-height: 240px;
  height: auto;
  overflow: auto;
`