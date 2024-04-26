"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const redux_logger_1 = __importDefault(require("redux-logger"));
const userAuthReducer_1 = __importDefault(require("../reducers/userAuthReducer"));
const store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: userAuthReducer_1.default
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redux_logger_1.default),
    devTools: true
});
exports.default = store;
//# sourceMappingURL=store.js.map