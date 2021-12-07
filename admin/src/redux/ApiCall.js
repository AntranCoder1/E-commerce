import { loginStart, loginSuccess, loginFailure } from './UseRedux';
import { publicRequest, userRequest } from '../requestMethod';
import { 
    getProductStart, 
    getProductSuccess, 
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure
} from './ProductRedux';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));   
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailure());
    }
}

export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (error) {
        dispatch(deleteProductFailure());
    }
}