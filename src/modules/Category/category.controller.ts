import { Request, Response } from 'express';
import { CategoryService } from './category.service'; 

const createCategory = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await CategoryService.createCategory(data);
        res.status(201).json({
            success: true,
            message: 'Category created successfully!',
            data: result,
        });
    } catch (error: any) {
     
        res.status(400).json({
            success: false,
            message: error.message || 'Something went wrong!',
        });
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await CategoryService.getAllCategories();
        res.status(200).json({
            success: true,
            message: 'Categories fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await CategoryService.getSingleCategory(id as string);

    res.status(200).json({
      success: true,
      message: 'Category fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong!',
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; 
        const updatedData = req.body;

        const result = await CategoryService.updateCategory(id as string, updatedData);

        res.status(200).json({
            success: true,
            message: 'Category updated successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Update failed!',
        });
    }
};


const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id; 

        const result = await CategoryService.deleteCategory(id as string);

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Delete failed!',
        });
    }
};

export const CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
  
};