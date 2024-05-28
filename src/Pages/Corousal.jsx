import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Youtubelogo from './YoutubeLogo.png';

const Carousel = ({isLogin, setLogIn}) => {
    const router = useNavigate();
    const [shows, setShows] = useState({
    Movies: [],
    Tvshows: [],
    Documentary: [],
    Webseries: [],
    Shortfilm: [],
    Videosong: [],
    Trailer: [],
  });
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    fetch('https://academics.newtonschool.co/api/v1/ottx/show?limit=1000', {
      headers: {
        'accept': 'application/json',
        'projectID': 'dnra3ujpc0u2'
      }
    })
      .then(response => response.json())
      .then(data => {
        const Movies = [];
        const Tvshows = [];
        const Documentary = [];
        const Webseries = [];
        const Shortfilm = [];
        const Videosong = [];
        const Trailer = [];

        data.data.forEach(show => {
          if (show.type === "movie") {
            Movies.push(show);
          }
          if (show.type === "tv show") {
            Tvshows.push(show);
          }
          if (show.type === "documentary") {
            Documentary.push(show);
          }
          if (show.type === "web series") {
            Webseries.push(show);
          }
          if (show.type === "short film") {
            Shortfilm.push(show);
          }
          if (show.type === "video song") {
            Videosong.push(show);
          }
          if (show.type === "trailer") {
            Trailer.push(show);
          }
        });

        setShows({
          Movies,
          Tvshows,
          Documentary,
          Webseries,
          Shortfilm,
          Videosong,
          Trailer,
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const openModal = (show) => {
    setSelectedShow(show);
  };

  const closeModal = () => {
    setSelectedShow(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  const renderCategory = (title, shows) => (
    <div className="mb-8">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
        {shows.map((show, idx) => (
          <div key={idx} className="min-w-[200px] " onClick={() => openModal(show)}>
            <img
              src={show.thumbnail}
              alt={show.title}
              className="w-[300px] h-[250px] "
            />
            <p className="mt-2 text-center">{show.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
    <nav className="bg-black text-white py-3 px-5 flex justify-between items-center">
        <img src={Youtubelogo} className="h-12 cursor-pointer" alt="YouTube Logo" onClick={() => { router("/") }} />
        <div className="right">
            <button className="py-2 px-4 bg-red-600 text-white cursor-pointer hover:bg-white hover:text-black" onClick={() => { 
              if(isLogin){
                setLogIn();
              }
              router("/signup");
            }}>{isLogin ? "Sign Out" : "Sign in"}</button>
        </div>
    </nav>
    <div className="bg-black text-white p-4 ">
      {shows.Movies.length > 0 || shows.Tvshows.length > 0 || shows.Documentary.length > 0 || shows.Webseries.length > 0 || shows.Shortfilm.length > 0 || shows.Videosong.length > 0 || shows.Trailer.length > 0 ? (
        <>
          {renderCategory('Movies', shows.Movies)}
          {renderCategory('TVShows', shows.Tvshows)}
          {renderCategory('Documentary', shows.Documentary)}
          {renderCategory('Webseries', shows.Webseries)}
          {renderCategory('Shortfilm', shows.Shortfilm)}
          {renderCategory('Videosong', shows.Videosong)}
          {renderCategory('Trailer', shows.Trailer)}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      {selectedShow && !isLogin && router('/signup')}

      {selectedShow && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center modal-overlay" onClick={handleOutsideClick}>
          <div className="bg-black w-[400px] p-8 rounded-lg">

            <img
              src={selectedShow.thumbnail}
              alt={selectedShow.title}
              className="w-[300px] h-[250px] "
            />
            {/* <button onClick={}></button> */}
            <button onClick={closeModal} className="text-white p-3">
                <i className="fas fa-play-circle fa-lg"></i>
            </button>

            <p className="mt-2">{selectedShow.keywords.join('. ')}</p>
            <p className="mt-2">{selectedShow.description}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Carousel;