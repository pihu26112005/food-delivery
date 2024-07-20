import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";

const placeOrder = async (req, res) => {
    try{
        const neworder = new orderModel({
            userID: req.body.userID,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await neworder.save();
        await userModel.findByIdAndUpdate(req.body.userID, {cartData:{}});

        res.status(200).json({success:true,message:"Order Placed Successfully"});
    }

    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

const listUserOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userID:req.body.userID});
        res.status(200).json({success:true,data:orders});
    }

    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"cannot find orders Internal server error"});
    }
}

const listAllOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({});
        res.status(200).json({success:true,data:orders});
    }

    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"cannot find orders Internal server error"});
    }
}

const updateStatus = async (req, res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderID, {status:req.body.status});
        res.status(200).json({success:true,message:"Order status updated successfully"});
    }
    
        catch(error){
            console.log(error);
            res.status(500).json({success:false,message:"Internal server error"});
        }
}


export { placeOrder , listUserOrders , listAllOrders , updateStatus};