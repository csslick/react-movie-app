import React,{useState, useEffect} from 'react';

function App() {

  // state
  const [movie, setmovie] = useState([])
  const [searchQuery, setSearchQuery] = useState('star wars')

  // fetch movie - 함수는 마운트 될때 실행됨
  const api_key = '224502cedb2aea2828098f3724fd0b0c';
  const url = 'https://api.themoviedb.org/3/movie/550?api_key=224502cedb2aea2828098f3724fd0b0c';
  const movieList = 'https://api.themoviedb.org/4/list/3?page=1&api_key=224502cedb2aea2828098f3724fd0b0c'
  const imgUrl = 'https://image.tmdb.org/t/p/w300'
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=224502cedb2aea2828098f3724fd0b0c`
  const url2 = 'http://hn.algolia.com/api/v1/search?query=react'
  const trandUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`

  const fetchMovie = () => {
    fetch(searchUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        setmovie(data.results)
      })
      .catch(err => console.log(err))
  }
 
  /* 
    []파라미터: 업데이트 필요 state만 명시 빈값으로 두면 업데이트 반영안함
    []미정의시 모든 상태는 기본 업데이트 됨
  */
  useEffect(() => {
    fetchMovie();

  }, []) 

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMovie();
  }

  return (
    <>
      <h1>movie</h1>
      <h2>Movies</h2>
      <form onSubmit={handleSubmit}>
        <input type="text"  onChange={handleChange} />
        <button>Search</button>
      </form>
      {
        movie.map((item, i) => {
          return(
            <div key={i}>
              <p>{i}. {item.original_title}</p>
              <img src={imgUrl+item.poster_path} alt={item.poster_path} />
              <p>{i}. {item.overview}</p>
            </div>
          )
        })
      }
    </>
  );
}

export default App;
