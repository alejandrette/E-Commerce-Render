import { Router } from "express";
import { createProducts, deleteProduct, getPorducts, getProductById, updateAvailability, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInpuErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The product ID 
 *            example: 1
 *          name:
 *            type: string
 *            description: The product name 
 *            example: Monitor Curvo
 *          price:
 *            type: integer
 *            description: The product price 
 *            example: 300
 *          availability:
 *            type: boolean
 *            description: The product availability 
 *            example: true
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Get a list of products
 *      tags:
 *        - Products
 *      description: Return a list of products
 *      responses: 
 *        200:
 *            description: Successful response
 *            content:
 *                application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Product'
 */
router.get("/", getPorducts);

/**
* @swagger
* /api/products/{id}:
*    get:
*      summary: Get a product by ID
*      tags:
*        - Products
*      description: Return a product based on its unique ID
*      parameters: 
*        - in: path
*          name: id
*          description: The ID of the product to retrieve
*          required: true
*          schema:
*              type: integer
*      responses:
*          200:
*              description: Successful response
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/Product'
*          404:
*              description: Not found
*          400:
*              description: Bad Request - Invalid ID
*/

router.get("/:id", 
  param('id')
    .isInt().withMessage('ID not valid'),
  handleInpuErrors,
  getProductById
);

router.post("/", 
  body('name')
    .trim()
    .notEmpty().withMessage("Name is empty")
    .isString().withMessage("Name must be a string"),

  body('price')
    .notEmpty().withMessage('Price is empty')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

  handleInpuErrors,
  createProducts
);

router.put("/:id",
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

router.patch("/:id",
  param('id')
    .isInt().withMessage('ID not valid'),
  handleInpuErrors,
  updateAvailability
)

router.delete("/:id",
  param('id')
    .isInt().withMessage('ID not valid'),
  handleInpuErrors,
  deleteProduct
)

export default router;
