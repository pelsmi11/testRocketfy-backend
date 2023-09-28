"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const product_route_1 = __importDefault(require("./infraestrucuture/route/product.route"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use(express_1.default.urlencoded({ limit: "50mb", parameterLimit: 50000 }));
const PORT = process.env.PORT || 3003;
exports.app.get("/", (_req, res) => {
    res.send("¡Hellow from Express and TypeScript!");
});
exports.app.use(product_route_1.default);
exports.server = exports.app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
