"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const calls_route_1 = __importDefault(require("./src/routes/calls.route"));
dotenv_1.default.config();
var app = (0, express_1.default)();
// Connect to MongoDB
(0, database_1.default)();
// Express configuration
app.set("port", process.env.PORT || 8000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/call", calls_route_1.default);
const port = app.get("port");
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
exports.default = server;
