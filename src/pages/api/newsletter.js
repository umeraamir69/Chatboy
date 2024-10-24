import connectToDatabase  from '../../../middlewear/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import User from '../../../model/User';
import Newsletter from '../../../model/Newsletter';


export default async function handler(req, res) {
    connectToDatabase();
    const session = await getServerSession(req, res, authOptions);
    const user = await  User.findOne({"email" : session.user.email}) ;
    //check expiry

    if(req.method == "GET"){
        const user = await User.findOne({email: session.user.email});
        if(user.role != "admin") return res.status(404).json({message : "User not allowed."})
        const requestdata = await Newsletter.find()
        return res.status(200).json({message :"Newsletter Data Found." , data : requestdata})
    }

    else if (req.method === "POST"){    
       try{
         const data = req.body.email
         data.clientId = user._id;
         data.expectedStartDate = new Date(req.body.expectedStartDate)
         const orderRequest = new OrderRequest(data);
        const resuelt  =  await  orderRequest.save();
        if(!resuelt)   return res.status(301).json({message : "Record not saved."}) ;

         return res.status(201).json({message : `Request Created. Our Manager will contact you soon` }) ;
        }
        catch (err) {
          console.log(err);
          return res.status(500).json({ error: "Server Error OCcur"});

        }
    }





    else if (req.method == "PATCH"){
        const user = await User.findOne({email: session.user.email});
        if(user.role != "admin") return res.status(404).json({message : "User not allowed."})
        const {id , userResponse , stautus , message, eventID} = req.body;
        console.log(id , userResponse , stautus , message , eventID);
    
        try {
            const updateFields = {};
            if (stautus) updateFields.stautus = stautus;
            if (eventID) updateFields.$push = { eventID: eventID }; // Use $push to append eventId
            if (userResponse && message) updateFields.userResponse = message + " " +  user.name + " time : " + new Date().toLocaleTimeString() + " "+ userResponse + ".";
          
    
            if(Object.keys(updateFields).length === 0 && updateFields.constructor === Object) {
                return res.status(200).json({message : "No content for update."}) ;
            }
    
            const request = await OrderRequest.findOneAndUpdate({_id: id}, updateFields, {new: true});
            
            if(!request){
                return res.status(404).json({message : "Request Not Found"}) ;
            }
            
            return res.status(201).json({message : `${request.projectName} Order request updated!` , data : request}) ;
        } 
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
}


let jsonObject = {};
