import { Router } from "express";
import { createProducts, getPorducts, getProductById, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInpuErrors } from "./middleware";

const router = Router();

// Rutas
router.get("/products", getPorducts);

router.get("/products/:id", 
  param('id')
    .isInt().withMessage('ID not valid'),
  handleInpuErrors,
  getProductById
);

router.post("/products", 
  body('name')
    .notEmpty().withMessage('Name is empty')
    .isString().withMessage("Name must be a string"),
  body('price')
    .notEmpty().withMessage('Name is empty')
    .isNumeric().withMessage('Value not Valid')
    .custom(value => value > 0).withMessage('Value not valid'),
  handleInpuErrors,
  createProducts
);

router.put("/products/:id",
  updateProduct
)

export default router;
