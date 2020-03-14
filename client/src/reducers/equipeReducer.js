import { GET_ALL_EQUIPE } from "../actions/type";

const equipeReducer=(state=[],action)=>{
    switch(action.type){
        case GET_ALL_EQUIPE:
            return action.payload
        default:
            return state;
    }
}
export default equipeReducer;