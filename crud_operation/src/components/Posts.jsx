import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../../api/PostApi'
import "../App.css";
import { Form } from './Form';

const Posts = () => {

    const [data, setData] = useState([])

    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data);
        setData(res.data)
    };

    // function for delete the item
    const handledeletepost  = async(id) =>{

        try{
            const res = await deletePost(id);
            if(res.status === 200){
                const newUpdatedPost = data.filter((curPost) => {
                    return curPost.id != id;
                })
                setData(newUpdatedPost)
            }
            else{
                console.log("Failed to delete the post" , res.status)
            }
        } catch(error){
            console.log(error)
        }
    }

    const handleEditPost = async(id) =>{

    }

    useEffect(() => {
        getPostData();
    }, [])

    return (
        <>
            <section className="section-form">
                <Form data = {data} setData={setData}/>
            </section>

            <section className="section-post">
                <ol>
                    {data.map((curElem) => {
                        const { id, body, title } = curElem;
                        return (
                            <li key={id}>
                                <p>{title}</p>
                                <p> {body}</p>
                                <button onClick={() => handleEditPost(id)}>Edit</button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handledeletepost(id)}
                                >Delete</button>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </>
    )
}

export default Posts
