import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovie, getPosterUrl } from '../api/tmdb'

function MoviePage({ toggleFavorite, isFavorite }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMovie(id).then(data => {
            setMovie(data)
            setLoading(false)
        })
    }, [id])

    if (loading) return <p style={{ padding: '32px' }}>Loading...</p>

    const fav = isFavorite(movie.id)

    return (
        <div className="movie-page">
            <button onClick={() => navigate(-1)}>← Back</button>
            <div className="movie-details">
                <img
                    src={movie.poster_path ? getPosterUrl(movie.poster_path) : '/no-poster.png'}
                    alt={movie.title}
                />
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>
                    <p className="year">{movie.release_date?.slice(0, 4)}</p>
                    <button
                        className={`fav-btn ${fav ? 'active' : ''}`}
                        onClick={() => toggleFavorite(movie)}
                    >
                        {fav ? '❤️ In Favorites' : '🤍 Add to Favorites'}
                    </button>
                    <p className="overview">{movie.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default MoviePage