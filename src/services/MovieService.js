const url = 'https://api.themoviedb.org/3/'
const apiKey = 'api_key=ad7d49d2451186d4ceaad4a1666371d9'

export async function getNowPlayingMovies() {
  const response = await fetch(`${url}movie/now_playing?${apiKey}`)
  const data = await response.json()
  return data.results
}

export async function getMoviesByTitle(title, totalPages = 10) {
  let allResults = []

  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(`${url}search/movie?${apiKey}&query=${title}&page=${page}`)
    const data = await response.json()

    if (data.results) {
      allResults = allResults.concat(data.results)
    }
    if (page >= data.total_pages) {
      break
    }
  }
  return allResults
}

export async function getMoviesByYear(year) {
  let allResults = []
  for (let page = 1; page <= 10; page++) {
    const response = await fetch(
      `${url}discover/movie?${apiKey}&primary_release_year=${year}&page=${page}`,
    )
    const data = await response.json()

    if (data.results) {
      allResults = allResults.concat(data.results)
    }
    if (page >= data.total_pages) {
      break
    }
  }
  return allResults
}

export async function getMovieGenres() {
  const response = await fetch(`${url}genre/movie/list?${apiKey}`)
  const data = await response.json()
  return data.genres
}

export async function getMoviesByGenre(genreId) {
  let allResults = []
  for (let page = 1; page <= 10; page++) {
    const response = await fetch(
      `${url}discover/movie?${apiKey}&with_genres=${genreId}&page=${page}`,
    )
    const data = await response.json()

    if (data.results) {
      allResults = allResults.concat(data.results)
    }
    if (page >= data.total_pages) {
      break
    }
  }
  return allResults
}

export async function getMovieDetails(movieId) {
  const response = await fetch(`${url}movie/${movieId}?${apiKey}`)
  const data = await response.json()
  return data
}
