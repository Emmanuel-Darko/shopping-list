import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './constants';
import axios from 'axios';

export const getItems = () => dispatch => {
    // set items loading
    dispatch(setItemsLoading());

    // fetch items
    axios.get('/api/items')
    .then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data
    }))

    // fetch items
    // fetch('/api/items')
    // .then(data => data.json())
    // .then(res => dispatch({
    //     type: GET_ITEMS,
    //     payload: res
    // }))
}

export const addItem = item => dispatch => {
    axios.post('/api/items',item)
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    }))
}

export const deleteItem = id => dispatch => {
    axios.delete(`/api/items/${id}`)
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
}


export const setItemsLoading = () => ({
    type: ITEMS_LOADING
})