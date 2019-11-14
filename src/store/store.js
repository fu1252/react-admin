import {createStore} from 'easy-peasy'
import user from './user'
import layout from './layout'

const store = createStore({
    user:user,
    layout:layout
});

export default store