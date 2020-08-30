import React,{useState, useEffect} from 'react';

function App() {

  // state
  const [movie, setmovie] = useState([])
  const [searchQuery, setSearchQuery] = useState('star wars')
  const [loading, setLoading] = useState(false)

  // fetch movie - 함수는 마운트 될때 실행됨
  const api_key = '224502cedb2aea2828098f3724fd0b0c';
  const url = 'https://api.themoviedb.org/3/movie/550?api_key=224502cedb2aea2828098f3724fd0b0c';
  const movieList = 'https://api.themoviedb.org/4/list/3?page=1&api_key=224502cedb2aea2828098f3724fd0b0c'
  const imgUrl = 'https://image.tmdb.org/t/p/w300'
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=224502cedb2aea2828098f3724fd0b0c`
  const url2 = 'http://hn.algolia.com/api/v1/search?query=react'
  const trandUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`

  const fetchMovie = () => {
    // set loading false
    setLoading(true)

    fetch(searchUrl)
      .then(res => res.json())
      .then(data => {
        setmovie(data.results)
        setLoading(false)
        console.log(data.results)
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

  const showLoading = () =>  (loading ? <h2>Loading...</h2> : "")
  const searchForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="text"  onChange={handleChange} />
        <button>Search</button>
      </form>
    )
  }

  const showNews = () => {
    return (
      movie.map((item, i) => {
        return (
          <div key={i}>
            <p>{i}. {item.original_title}</p>
            <img src={imgUrl+item.poster_path} alt={item.poster_path} />
            <p>{i}. {item.overview}</p>
          </div>
        )
      })
    )
  }

  return (
    /* 
      여기까지 리액트 소스코드는 최적화 되었지만 브라우저에서 소스를 볼때 콘텐츠 파악 및 SEO가 어렵다. 
      다음에선 next.js로 이 부분을 개선할 것이다.
    */
    <>
      <h1>Movie Info</h1>
      { showLoading() }
      { searchForm() }
      { showNews() }
    </>
  );
}

export default App;
