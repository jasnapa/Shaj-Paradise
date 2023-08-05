import resortModel from "../models/resortModel.js";
import vendorModel from "../models/vendorModel.js";






export async function viewResort(req,res){
    try {
        const resorts=await resortModel.find({})
        console.log( resorts);
        res.json({success:true,resorts})

    } catch (error) {
        console.log(error);
    }

}


// Controller function to handle resort search
export async function search(req, res) {
  try {
    const { search } = req.query;
    let query = {};

    // If search query is provided, create a case-insensitive regex to match resort names
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search, "i");
      query.resortName = searchRegex;
    }

    // Fetch resorts based on the search query (or all resorts if no search query provided)
    const resorts = await vendorModel .find(query);
    res.json({ success: true, vendors: resorts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// export async function viewPackage(req,res){
//    try {
//   const id= req.params.id
//   const packages = await packageModel.find({resort:id}).populate('resort')
//   if(packages){
//    res.json({success:true,packages}) 
//   }else{
//     res.json({error:true})
//   }
//    } catch (error) {
//     console.log(error)
//    }

// }
