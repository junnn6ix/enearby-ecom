import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

// create category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const data: Prisma.CategoryCreateInput = req.body;

    const category = await prisma.category.create({ data });

    res.status(201).json(category);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 is the error code for unique constraint violation
      if (error.code === "P2002") {
        return res.status(409).json({
          error: "A category with this slug already exists",
          field: error.meta?.target,
        });
      }
    }

    // For other errors, return a generic 500 error
    return res.status(500).json({
      error: "Failed to create category",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// update category
export const updateCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const data: Prisma.CategoryUpdateInput = req.body;

  const updatedCategory = await prisma.category.update({
    where: { slug },
    data,
  });

  return res.status(200).json(updatedCategory);
};

// delete category
export const deleteCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const deleteCategory = await prisma.category.delete({
    where: { slug },
  });

  return res.status(200).json(deleteCategory);
};

// get all categories
export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  res.status(200).json(categories);
};

// get single category
export const getCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  return res.status(200).json(category);
};
