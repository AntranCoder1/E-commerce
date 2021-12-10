import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isFetching: false,
        error: false
    },
    reducers: {
        // GET ALL
        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // ADD USER
        
    }
});

export const { 
    getUserStart,
    getUserSuccess,
    getUserFailure,
} = usersSlice.actions;

export default usersSlice.reducer;