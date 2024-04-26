"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStore = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const adminReducer_1 = require("../reducers/adminReducer");
exports.adminStore = (0, toolkit_1.configureStore)({
    reducer: {
        [adminReducer_1.api.reducerPath]: adminReducer_1.api.reducer,
    },
    middleware: (get) => get().concat(adminReducer_1.api.middleware)
});
//# sourceMappingURL=adminStore.js.map