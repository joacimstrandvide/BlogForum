import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const res = await axios.get('http://localhost:8900/blogs')
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllPosts()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('sv-SE')
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this post?'
        )
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8900/blogs/${id}`)
                window.location.reload()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <>
            <button className="addHome">
                <Link id="add-button" to="/add">
                    Add new post
                </Link>
            </button>
            <div className="posts">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.text}</p>
                        <h4>
                            <img
                                src="person-circle.svg"
                                alt="User"
                                width="17"
                                height="17"
                            ></img>{' '}
                            {post.author}
                        </h4>
                        <h5>{formatDate(post.created)}</h5>
                        <br />
                        <div className="post-buttons">
                            <button
                                className="delete"
                                onClick={() => handleDelete(post.id)}
                            >
                                Delete
                            </button>
                            <button className="update">
                                <Link to={`/update/${post.id}`}>Update</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <br />
        </>
    )
}

export default Books
