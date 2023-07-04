"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// grabbing the routes for the Stripe API
const stripeRoute_1 = __importDefault(require("./routes/stripeRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const express_bearer_token_1 = __importDefault(require("express-bearer-token"));
const ordersRoute_1 = __importDefault(require("./routes/ordersRoute"));
const businessRoute_1 = __importDefault(require("./routes/businessRoute"));
const reviews_route_1 = __importDefault(require("./routes/reviews.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const console_1 = require("console");
const PORT = process.env.PORT || 4020;
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.MONGO_URI)
                // this line of code stop everything until its
                yield mongoose_1.default.connect(process.env.MONGO_URI);
            else
                throw console_1.error;
            console.log("we connected");
        }
        catch (error) {
            console.log(error);
            // add handler to deal with db connection error
        }
    });
}
// run the function to connect
connectToDb();
app.use(express_1.default.static("images"));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// Allow transfer of data
app.use((0, cors_1.default)());
app.use((0, express_bearer_token_1.default)()); // Be able to access the token in our backend
// setting routes for stripe
app.use("/", stripeRoute_1.default);
// routes for cart
app.use("/api", cartRoute_1.default);
// routes fo auth
app.use("/auth", authRoute_1.default);
// routes for orders
app.use("/orders", ordersRoute_1.default);
// routes for business side
app.use("/business", businessRoute_1.default);
// routes for the reviews
app.use("/reviews", reviews_route_1.default);
// const hostname = '192.168.1.24'
app.listen(PORT, () => console.log(`Server running at PORT`));
