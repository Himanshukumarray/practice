import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

//get Method 

export const getPost = () => {
    return api.get("/posts")
}

// delete Method

export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
};

// Post Method

export const postData = (post) => {
    return api.post("/posts", post);
  };