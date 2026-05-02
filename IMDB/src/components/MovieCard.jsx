import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPosterUrl } from '../api/tmdb'

const MovieCard = forwardRef(({ movie, toggleFavorite, isFavorite }, ref) => {
    const navigate = useNavigate()
    const fav = isFavorite(movie.id)

    return (
        <div className="movie-card" ref={ref} onClick={() => navigate(`/movie/${movie.id}`)}>
            <img
                src={movie.poster_path ? getPosterUrl(movie.poster_path) : '/no-poster.png'}
                alt={movie.title}
            />
            <button
                className={`fav-btn ${fav ? 'active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(movie)
                }}
            >
                {fav ? '❤️' : '🤍'}
            </button>
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average.toFixed(1)}</p>
        </div>
    )
})

export default MovieCard