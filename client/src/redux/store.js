import { configureStore } from '@reduxjs/toolkit';
import CartRedux from './CartRedux';

export default configureStore({
    reducer: {
        cart: CartRedux
    }
})