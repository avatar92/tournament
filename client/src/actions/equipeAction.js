import { GET_ALL_EQUIPE } from "./type";
import axios from "axios";
export const getEquipes = () => dispatch => {
  axios
    .get("/api/equipe")
    .then(res => {
      dispatch({ type: GET_ALL_EQUIPE, payload: res.data });
      return res.data
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_ALL_EQUIPE, payload: null });
    });
};
