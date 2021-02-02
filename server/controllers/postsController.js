import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        //console.log(posts);

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = (req, res) => {
    res.send('creating posts!');
};