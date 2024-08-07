import User from "../models/User.js";
import Link from "./../models/Link.js";


const postlink =  async (req,res) => {
    const {target, slug, title, user} = req.body;

    const link = new Link({
        target,
        slug,
        title,
        user
    });

    const savedLink = await link.save();

    res.json({
        success : true,
        data : savedLink,
        message : "Link created Successfully!!"
    })
}

const getLinks = async (req,res) => {
    const { userId } = req.query
    const user = await User.findById(userId)

    if(!user){
        return res.json({
            success:false,
            message:"User Not Found",
            data:null
        })
    }
    const allLinks = await Link.find({"user": userId}).sort({createdAt:-1})

    res.json({
        success: true,
        message : "All the links fetched Successfully!!",
        data : allLinks
    })
}


const getRedirectSlug = async (req, res) => {
    const {slug} = req.params; //reading the slug
    const link = await Link.findOne({slug});

    if (!link){
        return res.json({
            success : false,
            message : "link not found!"
        });
    }

    link.views = link.views + 1; 
    await link.save();
    res.redirect(link.target);
}

const deleteLink = async (req, res) => {
  const {id} = req.params; //query mein quesmark ata hai, yaha hum ne id pass ki hai jo req ke param se hjo humne id mein dala hai

  const response = await Link.deleteOne({_id : id});
  res.json({
    success: true,
    message:"Link deleted Successfully!",
    data:null,
  })
}

export {postlink, getRedirectSlug, getLinks, deleteLink}