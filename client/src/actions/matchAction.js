import { ADD_MATCH } from "./type";
import axios from "axios";

export const addMatch = (equipeA_id, equipeB_id, matchTitle) => {
  axios({
    method: "post",
    url: `/api/equipe/${equipeA_id}/${equipeB_id}`,
    data: {
      title: matchTitle
    }
  });
};
