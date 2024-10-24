import User from '../../../../model/User';
import connectToDatabase  from '../../../../middlewear/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';

export default async function handler(req, res) {
    connectToDatabase();
    const session = await getServerSession(req, res, authOptions);
    if(session == null) return res.status(403).json({message : "Forbiden Login First"})
    const user = await User.findOne({email: session.user.email});


    if(req.method == "GET"){
        if(user.role != "admin") return res.status(404).json({message : "User not allowed."})
        const userdata = await User.find()
        return res.status(200).json({message :"User Data Found." , data : userdata})
    }

    else if(req.method == "PATCH"){
        if(session == null) return res.status(403).json({message : "Forbiden. Login Again"}) ;
        const { email , name , role ,whatsappContact , gender , country ,joinDate,  currency, DOB} = req.body;
        if(email != session.user.email) return res.status(403).json({message : "Forbiden Data Error."}) ;
        try {
            const updateFields = {};
            if (name) updateFields.name = name.charAt(0).toUpperCase() + name.slice(1);
            if (role) updateFields.role = role;
            if (whatsappContact) updateFields.whatsappContact = whatsappContact;
            if (gender) updateFields.gender = gender;
            if (country) updateFields.country = country;
            if (currency) updateFields.currency = currency;
            if(DOB) updateFields.DOB = DOB;

            if (joinDate) updateFields.joinDate = joinDate;
            updateFields.active = true;

            if(Object.keys(updateFields).length === 0 && updateFields.constructor === Object) {
                return res.status(200).json({message : "No content for update."}) ;
            }

            const user = await User.findOneAndUpdate({email: session.user.email}, updateFields, {new: true});
            
            if(!user){
                return res.status(404).json({message : "User Not Found"}) ;
            }
            
            return res.status(201).json({message : `${user.name} Profile updated!` , data : user}) ;
        } 
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    else if(req.method === 'PUT' && user.role === 'admin') {
        if(req.body == undefined || req.body.email === undefined || req.body.value === undefined || req.body.type === undefined)  return  res.status(402).json({message : "Invalid Data."}) ;
        const {email, value , type} = req.body;
        console.log(email , value , type)
        try{
            const user = await User.findOneAndUpdate({email: email}, {active : value}, {new: true});
            if (user){
                return res.status(201).json({message : "User Updated"}) ;
            }
            else {
                return res.status(401).json({message : "User not found"}) ;
            }
        }
        catch (error) {
            console.log(error);
            return  res.status(500).json({message : "Internal Server Error."}) ;
        }
    }



}

