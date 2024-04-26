"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.setUser = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    user: localStorage.getItem('user') ? JSON.stringify(localStorage.getItem('user')) : null
};
const authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    }
});
_a = authSlice.actions, exports.setUser = _a.setUser, exports.logout = _a.logout;
exports.default = authSlice.reducer;
//# sourceMappingURL=userAuthReducer.js.map