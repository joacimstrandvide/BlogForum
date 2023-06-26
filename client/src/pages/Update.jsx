import axios from "axios"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from 'styled-components'


const Update = () => {
    const [post, setPost] = useState({
        title: "",
        text: "",
        author: ""
    })
    const [error, setError]= useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];

    //Tar in allt som skrivs i varje input
    const handleChange = (e) => {
        setPost((prev) => ({...prev, [e.target.name]: e.target.value}));

    }
     //Tar all information som skrivits in och skapar en POST
     const handleClick = async (e) => {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8900/blogs/${postId}`, post);
            navigate("/");
        }catch (err) {
            console.log(err)
            setError(true)
        }
    }

  return (
    <div className="form">
    <h1>Update post</h1>
    <Input type="text" placeholder="Title" name="title" onChange={handleChange}/>
    <Input rows={5} type="textarea" placeholder="Text" name="text" onChange={handleChange}/>
    <Input type="text" placeholder="Author" name="author" onChange={handleChange}/>
    <Button onClick={handleClick}>Update</Button>
    {error && "Something is wrong"}
    <Link id="home-button" to="/">See all posts</Link>
</div>
  )
}

export default Update

// styled-components
const Input = styled.input`
    border-style: none;
    border-radius: 10px;
    margin: 1.5rem;
    padding: 0.6rem;
`

const Button = styled.button`
    border-radius: 8px;
    border: 0;
    padding: 1rem;
    margin: 0.6rem;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    color: #fff;
    background-color: green;
    cursor: pointer;
`
