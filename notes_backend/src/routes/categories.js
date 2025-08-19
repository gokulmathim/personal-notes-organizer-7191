import { Router } from 'express';
import { listCategoriesWithCounts } from '../store.js';

export const categoriesRouter = Router();

/**
 * GET /categories
 */
categoriesRouter.get('/', (req, res) => {
  const cats = listCategoriesWithCounts();
  res.json(cats);
});
