import { configureStore } from '@reduxjs/toolkit'
import entityReducer from './entity'

export default configureStore({
    reducer: {
        entity: entityReducer
    }
});