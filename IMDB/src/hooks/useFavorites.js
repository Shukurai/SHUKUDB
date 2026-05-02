import { useState } from 'react'

export function useFavorites() {
    const [favorites, setFavorites] = useState(
        () => JSON.parse(localStorage.getItem('favorites') || '[]')
    )

    const toggleFavorite = (movie) => {
        setFavorites(prev => {
            const exists = prev.find(m => m.id === movie.id)
            const updated = exists
                ? prev.filter(m => m.id !== movie.id)
                : [...prev, movie]

            localStorage.setItem('favorites', JSON.stringify(updated))
            return updated
        })
    }

    const isFavorite = (id) => favorites.some(m => m.id === id)

    return { favorites, toggleFavorite, isFavorite }
}