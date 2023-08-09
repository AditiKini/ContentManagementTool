import Post from "../model/post.js";

export const savingPost = async (req, res) => {
    try {
        const post = await new Post(req.body);
        post.save();

        res.status(200).json('Post successfully saved');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllPosts = async (req, res) => {
    //let username = req.query.username;
    let category = req.query.category;
    let posts;
    try {
        // if(username) 
        //     posts = await Post.find({ username: username });
        if (category) 
            posts = await Post.find({ category : category });
        else 
            posts = await Post.find({});
        return res.status(200).json(posts);

    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}


export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg : error.message})
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( req.params.id, { $set: req.body })
        //$set :- it is used when we want to replace the text inside array object

        res.status(200).json('Update successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}


export const deleteBlog = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post)
            return res.status(404).json({msg : 'page not found'});
         
        await post.deleteOne();

        res.status(200).json('post deleted successfully');
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}