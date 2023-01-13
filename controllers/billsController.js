import Bills from "../models/billsModel.js";

export const getBillsController = async(req, res)=>{
    try{
        const bills = await Bills.find();
        res.send(bills);
    }catch(error){
        console.log(error);
    }
}

//for add
export const addBillsController = async (req, res)=>{
    try{
        const newBills = new Bills(req.body);
        await newBills.save();
        res.send("Bill created Successfully!");

    }catch(error){
        console.log(error);
    }
}
