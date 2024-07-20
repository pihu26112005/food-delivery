import userModel from "../models/UserModel.js"


const addToCart = async (req, res) => {
    try{
        let userData = await userModel.findOne({ _id: req.body.userID });
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemID]){
            cartData[req.body.itemID] = 1;
        }
        else{
            cartData[req.body.itemID] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userID, {cartData});
        res.status(200).json({success:true,msg:"Item added to cart"});
    }
    catch(err){
        res.status(400).json({success:false,msg:"Error in adding to cart",error:err});
    }
}

const removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findOne({ _id: req.body.userID });
        let cartData = await userData.cartData;
        if(cartData[req.body.itemID]){
            cartData[req.body.itemID] -= 1;
            if(cartData[req.body.itemID] === 0){
                delete cartData[req.body.itemID];
            }
        }
        else{
            res.status(400).json({success:false,msg:"Item not in cart"});
        }
        await userModel.findByIdAndUpdate(req.body.userID, {cartData});
        res.status(200).json({success:true,msg:"Item removed from cart"});
    }
    catch(err){
        res.status(400).json({success:false,msg:"Error in removing from cart",error:err});
    }
}


const getCart = async (req, res) => {
    try{
        let userData = await userModel.findOne({ _id: req.body.userID });
        let cartData = await userData.cartData;
        res.status(200).json({success:true,msg:"Cart data fetched",cartData});
    }
    catch(err){
        res.status(400).json({success:false,msg:"Error in fetching cart data",error:err});
    }
}



export { addToCart , removeFromCart, getCart    }