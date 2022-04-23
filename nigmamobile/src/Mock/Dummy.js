/**
 * Define and export the dummy data.
 */
export const Playlists = [
    {
  id: "001",
  name: "Rec: Songs",
  songs: 20,
  img: require('../../assets/images/Rectangle 26.png')
},{
    id: "002",
    name: "Rec: Podcasts, Books",
    songs: 5,
    img: require('../../assets/images/Rectangle 20.png')
  }
]

export const Favorite = [
  {
    id: "001",
    url: "",
    title: "Лабиринт",
    artist: 'FACE',
    img: require("../../assets/images/Ellipse 5.png")
  },
  {
    id: "002",
    url: "",
    title: "Лабиринт",
    artist: 'FACE',
    img: require("../../assets/images/Ellipse 5.png")
  },
]

const dummyData = { Playlists, Favorite };

export default dummyData;
