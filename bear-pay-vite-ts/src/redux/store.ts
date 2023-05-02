import { configureStore } from '@reduxjs/toolkit';
import entityReducer from './entity';

const store = configureStore({
    reducer: {
        entity: entityReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
