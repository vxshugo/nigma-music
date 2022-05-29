import {createSlice} from '@reduxjs/toolkit';

export const artistSlice = createSlice({
    name: "artists",
    initialState: {
        artists: null,
        createArtistProgress: false,
        getAllArtistProgress: false,
        updateArtistProgress: false,
        deleteArtistProgress: false,
        error: false,
    },
    reducers:{
        getAllArtistStart: (state)=>{
          state.getAllArtistProgress = true;
        },
        getAllArtistSuccess: (state, action) => {
          state.artists = action.payload;
          state.getAllArtistProgress = false;
        },
        getAllArtistFailure: (state) => {
            state.error = true;
            state.getAllArtistProgress = false;
        }
    }
})

export const {
    getAllArtistStart,
    getAllArtistSuccess,
    getAllArtistFailure,
} = artistSlice.actions;

export default artistSlice.reducer;