import foodModel from "../models/foodModel.js";
import fs from "fs";


const addfood = async (req, res) => {
    let imagename = `${req.file.filename}`;

    const newfooditem = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: imagename,
        category: req.body.category
    });
    newfooditem.save()
    .then((food) => {
      res.status(201).json({ success: true, food,message:"food item added successfully" });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err, message:`Error : ${error}` });
    });
}

const listfood = async (req, res) => {
    try {
        const food = await foodModel.find();
        res.status(200).json(food);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

const removefood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        // await food.remove();
        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ message: "Food removed" });
    }
    catch (err) {
        res.status(400).json(err);
    }
}

export {addfood,listfood,removefood}