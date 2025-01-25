import { response } from "express";
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from '../models/product.model.js'

export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Enter Requied feilds",
        error: true,
        success: false,
      });
    }
    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return res.status(500).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Category added",
      data: saveCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find();
    // console.log(data);
    return res.json({
      message: "All categories",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { categoryId, name, image } = req.body;

    const update = await CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      {
        name,
        image,
      }
    );

    // console.log(update)

    return res.json({
      message: "Category is Updated",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const DeleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log(categoryId);
    const checkSubCategory = await SubCategoryModel.find({
      category: {
        "$in": [categoryId],
      },
    }).countDocuments()

    const checkProductCategory = await ProductModel.find({
      category:{
        "$in":[categoryId]
      }
    }).countDocuments()

    if(checkProductCategory>0 || checkSubCategory >0){
      return res.status(400).json({
        message:"Category is Already in use!",
        error:true,
        success:false,
      })
    }

    const deleteCategory = await CategoryModel.findOneAndDelete({_id:categoryId});
    
    return res.json({
      message:"Delete Category Successfully",
      error:false,
      success:true,
      // data:deleteCategory,
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
