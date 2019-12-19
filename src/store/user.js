import { action } from "easy-peasy";

const user = {
 changeRole:action((state,payload)=>state.userRole=payload)
};

export default user;
