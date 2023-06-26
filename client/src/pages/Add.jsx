import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'

const Add = () => {
    const [post, setPost] = useState({
        title: '',
        text: '',
        author: ''
    })
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8900/blogs', post)
            navigate('/')
        } catch (err) {
            console.log(err)
            setError(true)
        }
    }
    return (
        <div className="form">
            <h1>Add a new post</h1>
            <Input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
            />
            <Input
                type="textarea"
                placeholder="Text"
                name="text"
                onChange={handleChange}
            />
            <Input
                type="text"
                placeholder="Author"
                name="author"
                onChange={handleChange}
            />

            <Button onClick={handleClick}>Add</Button>
            {error && 'Something is wrong'}
            <Link id="home-button" to="/">
                See all posts
            </Link>
        </div>
    )
}
export default Add

// styled-components
const Input = styled.input`
    margin: 1rem;;
    border: 2px solid #000;
    border-radius: 1rem;
    background: #fff;
    padding: 1rem;
    font-size: 1rem;
    color: #000;
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
