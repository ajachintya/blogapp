import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk';
import {AuthReducer} from './reducers/AuthReducer';
import {PostReducer,fetchPosts,fetchPost,updatePost,updateImage} from './reducers/PostReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    fetchPosts,
    fetchPost,
    updatePost,
    updateImage
});

const middlewares = [thunkMiddleware];

const Store = createStore(rootReducers,composeWithDevTools
    (applyMiddleware(...middlewares)), 
   )
export default Store;