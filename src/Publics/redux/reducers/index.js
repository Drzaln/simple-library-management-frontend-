import {combineReducers} from 'redux';
import {buku} from './buku';
import { user } from "./user";
import { pinjam } from "./pinjam";


const appReducer = combineReducers({
    buku,
    user,
    pinjam,
});

export default appReducer;
