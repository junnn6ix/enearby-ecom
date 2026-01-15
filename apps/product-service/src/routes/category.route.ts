import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controller/category.controller";
import { shouldBeAdmin } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", shouldBeAdmin, createCategory);
router.put("/:slug", shouldBeAdmin, updateCategory);
router.delete("/:slug", shouldBeAdmin, deleteCategory);
router.get("/", getCategories);
router.get("/:slug", getCategory);

export default router;
