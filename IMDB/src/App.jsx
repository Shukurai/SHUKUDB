import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import FavoritesPage from './pages/FavoritesPage'
import { useFavorites } from './hooks/useFavorites'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={
          <HomePage
            searchQuery={searchQuery}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        } />
        <Route path="/movie/:id" element={
          <MoviePage toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
        } />
        <Route path="/favorites" element={
          <FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />
        } />
      </Routes>
    </>
  )
}

export default App