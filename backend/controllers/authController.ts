import { Request, Response } from "express";
import prisma from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json({
      success: true,
      message: "Signup Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};