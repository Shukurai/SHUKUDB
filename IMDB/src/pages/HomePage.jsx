import { useEffect, useState, useRef, useCallback } from 'react'
import { getPopular, searchMovies } from '../api/tmdb'
import MovieCard from '../components/MovieCard'

function HomePage({ searchQuery, toggleFavorite, isFavorite }) {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef(null)

    
    useEffect(() => {
        setMovies([])
        setPage(1)
        setHasMore(true)
    }, [searchQuery])

    
    useEffect(() => {
        setLoading(true)
        const fetch = searchQuery
            ? searchMovies(searchQuery, page)
            : getPopular(page)

        fetch.then(data => {
            if (data.length === 0) {
                setHasMore(false)
            } else {
                setMovies(prev => {
                    if (page === 1) return data
                    const ids = new Set(prev.map(m => m.id))
                    return [...prev, ...data.filter(m => !ids.has(m.id))]
                })
            }
            setLoading(false)
        })
    }, [searchQuery, page])

   
    const lastCardRef = useCallback(node => {
        if (loading) return
        if (observerRef.current) observerRef.current.disconnect()

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1)
            }
        })

        if (node) observerRef.current.observe(node)
    }, [loading, hasMore])

    return (
        <div className="movie-grid">
            {movies.map((movie, index) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                    ref={index === movies.length - 1 ? lastCardRef : null}
                />
            ))}
            {loading && <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Загрузка...</p>}
        </div>
    )
}

export default HomePage