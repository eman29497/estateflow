import { Request, Response } from "express";
import prisma from "../config/db";

export const createInquiry = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !message ||
      !propertyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    let leadScore = "Low";

    if (
      property.price >= 500000 ||
      message.length >= 100
    ) {
      leadScore = "High";
    } else if (
      property.price >= 200000 ||
      message.length >= 50
    ) {
      leadScore = "Medium";
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        message,
        propertyId,
        leadScore,
      },
    });

    res.status(201).json({
      success: true,
      message: "Inquiry Sent Successfully",
      inquiry,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllInquiries = async (
  req: Request,
  res: Response
) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      inquiries,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteInquiry = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const inquiry = await prisma.inquiry.findUnique({
      where: {
        id,
      },
    });

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry Not Found",
      });
    }

    await prisma.inquiry.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Inquiry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};