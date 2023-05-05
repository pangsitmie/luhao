import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('entity')
    ? JSON.parse(localStorage.getItem('entity'))
    : { entityName: 'company' };

export const entitySlice = createSlice({
    name: 'entity',
    initialState,
    reducers: {
        setCompany: (state) => {
            state.entityName = "company"
        },
        setBrand: (state) => {
            state.entityName = "brand"
        },
        setStore: (state) => {
            state.entityName = "store"
        }
    }
})

// Action creators are generated for each case reducer function
export const { setCompany, setBrand, setStore } = entitySlice.actions

export default entitySlice.reducer