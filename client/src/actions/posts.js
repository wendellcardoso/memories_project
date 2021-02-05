import * as api from "../api";

//Action Creators
export const getPost = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: "CREAT", payload: data });
    } catch (error) {
        console.log(error);
    }
}