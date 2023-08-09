import Comment from "../model/comment.js";

export const addComments = async (req, res) => {
    try {
        const comment = await new Comment(req.body);
        comment.save();

        res.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id });
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        console.log(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        await comment.deleteOne();

        res.status(200).json({ msg : 'comment deleted successfully'});
    } catch (error) {
        res.status(500).json(error)
    }
}