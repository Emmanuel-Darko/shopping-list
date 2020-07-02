import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, SET_UPDATE_ITEM, UPDATE_ITEM, ITEMS_LOADING} from '../actions/constants';

const initialState = {
    items: [],
    loading: false,
    update: {
        id: '',
        name: ''
    }
}

const itemReducer = (state=initialState, action={})  => {
    // console.log(action.payload)
    switch(action.type){
        case GET_ITEMS:
            // console.log(state)
            return {
                ...state,
                items: action.payload,
                loading: false // set loading to false after loading
            }

        case ADD_ITEM:
            return{
                ...state,
                items: [action.payload, ...state.items]
            }
        
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter((item) => item._id !== action.payload)
            }

        case SET_UPDATE_ITEM:
            return{
                ...state,
                update: {id: action.id, name: action.name}
        }

        case UPDATE_ITEM:
            return{
                ...state,
                items: action.payload
        }

        case ITEMS_LOADING:
            return{
                ...state,
                loading: true
            }
        
        default:
            return state
    }
}

export default itemReducer;