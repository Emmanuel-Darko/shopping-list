import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, SET_UPDATE_ITEM, UPDATE_ITEM, ITEMS_LOADING} from './constants';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorAction';

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

export const addItem = item => (dispatch, getState) => {
    axios.post('/api/items', item, tokenConfig(getState))
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    }))
    .catch( err => returnErrors(err.response.msg, err.response.status, err.response.id))
}

export const deleteItem = id => (dispatch,getState) => {
    axios.delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
    .catch( err => returnErrors(err.response.msg, err.response.status, err.response.id))
}

export const setUpdateItem = (id, name) => dispatch => {
    dispatch({
        type: SET_UPDATE_ITEM,
        id,
        name
    })
}

export const updateItem = item => (dispatch, getState) => {
    axios.put(`/api/items/`, item, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_ITEM,
        payload: res.data
    }))
    .catch( err => returnErrors(err.response.msg, err.response.status, err.response.id))
}

export const setItemsLoading = () => ({
    type: ITEMS_LOADING
})