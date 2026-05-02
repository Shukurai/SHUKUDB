import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar({ onSearch }) {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!query.trim()) return
        onSearch(query)
        navigate('/')
    }

    return (
        <nav>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>ShukuMDB</span>
            <form onSubmit={handleSubmit}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                />
                <button type="submit">Search</button>
            </form>
            <button onClick={() => navigate('/favorites')}>Favorites</button>
        </nav>
    )
}

export default Navbar