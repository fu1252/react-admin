import {createStore} from 'easy-peasy'
import user from './user'

const store = createStore({
    user:user
});

export default store