import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from './index';

export const getAllArtists = async (dispatch) => {
    dispatch(actions.getAllArtistStart());
    try {
        const { data } = await axiosInstance.get("/artist");
        dispatch(actions.getAllArtistSuccess(data.data));
        return true;
    }catch (error) {
        dispatch(actions.getAllArtistFailure());
        return false;
    }
}