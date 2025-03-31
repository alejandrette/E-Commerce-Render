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

/**
 * @swagger
 * /api/products:
 *    post:
 *      summary: Create a new product
 *      tags:
 *        - Products
 *      description: Adds a new product to the database
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - price
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the product
 *                  example: "Iphone 14"
 *                price:
 *                  type: number
 *                  description: The price of the product
 *                  example: 800
 *      responses:
 *        201:
 *          description: Product created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - Invalid input data
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *      summary: Update an existing product
 *      tags:
 *        - Products
 *      description: Updates the details of an existing product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the product to update
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - price
 *                - availability
 *              properties:
 *                name:
 *                  type: string
 *                  description: The updated name of the product
 *                  example: "Iphone 15"
 *                price:
 *                  type: number
 *                  description: The updated price of the product
 *                  example: 900
 *                availability:
 *                  type: boolean
 *                  description: Whether the product is available
 *                  example: true
 *      responses:
 *        200:
 *          description: Product updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - Invalid input data
 *        404:
 *          description: Product not found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *      summary: Update product availability
 *      tags:
 *        - Products
 *      description: Updates only the availability status of a product by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the product to update
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - availability
 *              properties:
 *                availability:
 *                  type: boolean
 *                  description: New availability status
 *                  example: false
 *      responses:
 *        200:
 *          description: Product availability updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - Invalid input data
 *        404:
 *          description: Product not found
 */
router.patch("/:id",
  param('id')
    .isInt().withMessage('ID not valid'),
  handleInpuErrors,
  updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *      summary: Delete a product by ID
 *      tags:
 *        - Products
 *      description: Removes a product from the database based on its ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the product to delete
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Product deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Product deleted successfully"
 *        400:
 *          description: Bad request - Invalid ID
 *        404:
 *          description: Product not found
 */
router.delete("/:id",
  param('id')
    .isInt().withMessage('ID not valid'),
  handleInpuErrors,
  deleteProduct
)

export default router;
