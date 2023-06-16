import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UserState {
    member_id: string | null;
}

const initialState: UserState = {
    member_id: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMemberId: (state, action: PayloadAction<string>) => {
            state.member_id = action.payload;
        },
    },
});

export const { setMemberId } = userSlice.actions;

export const selectMemberId = (state: RootState) => state.user.member_id;

export default userSlice.reducer;
