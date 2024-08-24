import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const getUser = async (req: Request | any, res: Response) => {
  const { user } = req.user;
  try {
    const userInfo = await User.findOne({ _id: user._id });
    if (!userInfo) {
      return res.status(404).json({
        error: true,
        message: "not found User",
      });
    }
    return res.status(201).json({
      error: false,
      user: userInfo,
      message: "get user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server error",
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "invalid user data",
    });
  }

  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      const user = await User.create({
        name,
        email,
        password: hash,
      });
      if (!user) {
        return res.status(401).json({
          error: true,
          message: "did not create a user",
        });
      }
      const token = jwt.sign({ user }, process.env.SECRET_TOKEN!, {
        expiresIn: "1d",
      });

      return res.status(201).json({
        error: false,
        user,
        token,
        message: "user created successfully",
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "not found user",
      });
    }
    bcrypt.compare(password, user.password, (err, response) => {
      if (err) {
        return res.status(402).json({
          error: true,
          message: "An unexpected error occurred.",
        });
      }
      if (response) {
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN!, {
          expiresIn: "1d",
        });
        return res.status(201).json({
          error: false,
          user,
          token,
          message: "login successfully",
        });
      } else {
        return res.status(401).json({
          error: true,
          message: "password not correct",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server error",
    });
  }
};
