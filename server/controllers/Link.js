import Link from "../models/Link.js";


const postlink =  async(req,res) => {
    const {target, slug, title} = req.body;

    const link = new Link({
        target,
        slug,
        title
    });

    const savedLink = await link.save();

    res.json({
        success : true,
        data : savedLink,
        message : "Link created Successfully!!"
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

export {postlink, getRedirectSlug}