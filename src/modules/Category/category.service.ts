import { Category, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createCategory = async (
    payload: Prisma.CategoryCreateInput
): Promise<Category> => {
    const isExist = await prisma.category.findUnique({
        where: { name: payload.name },
    });

    if (isExist) {
        throw new Error('Category already exists');
    }

    return await prisma.category.create({
        data: payload,
    });
};
const getAllCategories = async () => {
    return await prisma.category.findMany({
        include: { bookings: true },
    });
};

const getSingleCategory = async (id: string): Promise<Category> => {
    const result = await prisma.category.findUnique(
        {
            where: { id },
            include: { bookings: true },

        });

    if (!result) throw new Error('Category not found');

    return result;
};

const updateCategory = async (
  id: string,
  payload: Prisma.CategoryUpdateInput
): Promise<Category> => {

  const isExist = await prisma.category.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new Error('Category not found');
  }

  return await prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategory = async (id: string): Promise<Category> => {

  const isExist = await prisma.category.findUnique({
    where: { id },
  });

  if (!isExist) {
    throw new Error('Category not found');
  }

  return await prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
};