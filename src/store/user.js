import { action } from "easy-peasy";



const user = {
 userRole:'admin',
 changeRole:action((state,payload)=>state.userRole=payload)
};

export default user;
