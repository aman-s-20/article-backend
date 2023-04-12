const ArticleModel=  require('../models/article')

const getAllArticle = async (req, res) => {
    try {

        const article = await ArticleModel.find().populate("postedBy");
        const resultData={
            statusCode:null,
            data:{data:article }
        }

        return res.status(200).json({...resultData,statusCode :200});
    } catch (error) {
        console.log(err);
        return res.status(500).json({ statusCode:500,error:err.message })
    }
}

const createArticle = async (req, res) => {

    const { title, description } = req.body;
    const { userId } = req.params;
    try {
        const newArticle = new ArticleModel({
            title,
            description,
            postedBy: userId
        });
        const result = await newArticle.save();

        
        const resultData={
            statusCode:null,
            data:{ data:result }
        }

        return res.status(201).json({ ...resultData,statusCode:201 });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}



module.exports = {createArticle, getAllArticle}