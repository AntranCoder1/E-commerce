import { configureStore } from '@reduxjs/toolkit';
import CartRedux from './CartRedux';
import UserRedux from './UserRedux';

export default configureStore({
    reducer: {
        cart: CartRedux,
        user: UserRedux,
    }
})