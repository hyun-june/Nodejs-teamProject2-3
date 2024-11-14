import express from "express";
import {
  deleteFood,
  getAllFood,
  getFood,
  postFood,
  updateFood,
} from "../controllers/foodController.js";

export const foodRouter = express.Router();

foodRouter.route("/").get(getAllFood).post(postFood);
foodRouter.route("/:foodId").get(getFood).put(updateFood).delete(deleteFood);
