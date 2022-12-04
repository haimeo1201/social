const db = require('../db/config.js')

const addPost = async (req,res) => {
    const id = req.id
    try{
        await db.post.create({
            data:{
                content: req.body.content,
                authorId: id,
            }
        })
        res.sendStatus(201)
    }
    catch(e){
        console.error(e)
        res.sendStatus(400)
    }
}

const addLike = async (req,res)=>{
    const id = req.id
    const postId = req.body.postId
    try{
        await db.likes.create({
            data:{
                postId: postId,
                authorId: id
            }
        })
        res.sendStatus(201)
    }
    catch(e){
        console.error(e)
        res.sendStatus(400)
    }
}

const addComment = async (req,res) => {
    const id = req.id
    const postId = req.body.postId
    try{
        await db.comment.create({
            data:{
                authorId: id,
                content: req.body.content,
                postId: postId
            }
        })
        res.sendStatus(201)
    }
    catch(e){
        console.error(e)
        res.sendStatus(400)
    }
}


module.exports = {addPost, addLike, addComment}