import express from "express";
import { getUser, login, signup } from "../controllers/authController";
import { verifyUser } from "../utils";

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.get("/get-user", verifyUser, getUser);

export { authRoute };
