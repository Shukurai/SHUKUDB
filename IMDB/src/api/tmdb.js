const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE = 'https://api.themoviedb.org/3'

export const getPopular = async (page = 1) => {
  const res = await fetch(
    `${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  )
  const data = await res.json()
  return data.results
}

export const searchMovies = async (query, page = 1) => {
  const res = await fetch(
    `${BASE}/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=${page}`
  )
  const data = await res.json()
  return data.results
}

export const getMovie = async (id) => {
    const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`)
    return res.json()
}

export const getPosterUrl = (path) =>
    `https://image.tmdb.org/t/p/w500${path}`