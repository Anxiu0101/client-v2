import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../features/userSlice';
import counterReducer from '@/features/counter/counterSlice';
import store from '@/app/store';

export default configureStore({
    reducer: {
        // user: userReducer,
        counter: counterReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;