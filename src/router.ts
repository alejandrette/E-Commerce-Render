import { Router } from "express";
import { createProducts, getPorducts, getProductById, updateAvailability, updateProduct } from "./handlers/products";
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
    .notEmpty().withMessage('Price is empty')
    .isNumeric().withMessage('Value not valid')
    .custom(value => value > 0).withMessage('Value not valid'),
  handleInpuErrors,
  createProducts
);

router.put("/products/:id",
  body('name')
    .notEmpty().withMessage('Name is empty')
    .isString().withMessage("Name must be a string"),
  body('price')
    .notEmpty().withMessage('Price is empty')
    .isNumeric().withMessage('Value not Valid')
    .custom(value => value > 0).withMessage('Value not valid'),
  body('availability')
    .notEmpty().withMessage('Availability is empty')
    .isBoolean().withMessage('Availability nor valid'),
  handleInpuErrors,
  updateProduct
)

router.patch("/products/:id",
  updateAvailability
)

export default router;
