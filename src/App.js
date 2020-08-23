import React,{useState, useEffect} from 'react';

function App() {

  // state
  const [movie, setmovie] = useState([])

  // fetch movie - 함수는 마운트 될때 실행됨
  const url = 'https://api.themoviedb.org/3/movie/550?api_key=224502cedb2aea2828098f3724fd0b0c';
  const movieList = 'https://api.themoviedb.org/4/list/3?page=1&api_key=224502cedb2aea2828098f3724fd0b0c'
  const imgUrl = 'https://image.tmdb.org/t/p/w300'
  const url2 = 'http://hn.algolia.com/api/v1/search?query=react'

  const fetchmovie = () => {
    fetch(movieList)
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
    fetchmovie();

  }, []) 

  return (
    <>
      <h1>movie</h1>
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
