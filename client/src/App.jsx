import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import Posts from './pages/Posts'
import Update from './pages/Update'

function App() {
    return (
        <>
            <div className="app">
                <h1>Blog Forum</h1>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Posts />} />
                        <Route path="/add" element={<Add />} />
                        <Route path="/update/:id" element={<Update />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
