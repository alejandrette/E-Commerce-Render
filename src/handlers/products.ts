import { Request, Response } from "express"
import Products from "../models/Product.model"

export const getPorducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Products.findAll({
      order: [["id", 'ASC']]
    })
    res.json({ data: products})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
} 

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const product = await Products.findByPk(id)

    if(!product){
      res.status(404).json({ error: "Product not found"})
      return
    }

    res.json({ data: product})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
} 

export const createProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Products.create(req.body)
    res.json({ data: product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const product = await Products.findByPk(id)

    if(!product){
      res.status(404).json({ error: "Product not found"})
      return
    }

    await product.update(req.body)
    await product.save()

    res.json({ data: product})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const updateAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const product = await Products.findByPk(id)

    if(!product){
      res.status(404).json({ error: "Product not found"})
      return
    }

    product.availability = !product.dataValues.availability
    await product.save()

    res.json({ data: product})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const product = await Products.findByPk(id)

    if(!product){
      res.status(404).json({ error: "Product not found"})
      return
    }

    await product.destroy()
    res.json({ data: product})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
}