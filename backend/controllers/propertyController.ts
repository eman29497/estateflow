import { Response } from "express";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";
export const createProperty = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const {
      title,
      type,
      price,
      location,
      bedrooms,
      bathrooms,
      area,
      status,
      image,
      description,
    } = req.body;

    const property = await prisma.property.create({
      data: {
        title,
        type,
        price: Number(price),
        location,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        status,
        image,
        description,
      },
    });
    res.status(201).json({
      success: true,
      message: "Property Added Successfully",
      property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getAllProperties = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      success: true,
      total: properties.length,
      properties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getPropertyById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
    });
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }
    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateProperty = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const id = String(req.params.id);
    const existingProperty = await prisma.property.findUnique({
      where: {
        id,
      },
    });
    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }
    const updatedProperty = await prisma.property.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Property Updated Successfully",
      updatedProperty,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProperty = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const id = String(req.params.id);

    const existingProperty = await prisma.property.findUnique({
      where: {
        id,
      },
    });

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    await prisma.property.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Property Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};