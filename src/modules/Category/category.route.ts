import express from 'express';
import { CategoryController } from './category.controller';
import auth, { userRole } from '../../middlewares/auth';

const router = express.Router();

// Create Category
router.post('/',auth(userRole.admin),CategoryController.createCategory);

// Get All Categories
router.get('/', CategoryController.getAllCategories);

// Get Single Category
router.get('/:id', CategoryController.getSingleCategory);

// Update Category
router.patch('/:id',auth(userRole.admin), CategoryController.updateCategory);

// Delete Category
router.delete('/:id',auth(userRole.admin), CategoryController.deleteCategory);

export const CategoryRoutes = router;