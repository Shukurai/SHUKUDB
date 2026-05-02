import MovieCard from '../components/MovieCard'

function FavoritesPage({ favorites, toggleFavorite, isFavorite }) {
    if (favorites.length === 0) {
        return <p style={{ padding: '32px' }}>No favorite movies found.</p>
    }

    return (
        <div className="movie-grid">
            {favorites.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    toggleFavorite={toggleFavorite}
                    isFavorite={() => true}
                />
            ))}
        </div>
    )
}

export default FavoritesPage