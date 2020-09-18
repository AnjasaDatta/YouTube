import React, { useState, useEffect } from 'react';
//AIzaSyAvu0KqcIbLgrbSiwv-KaiUriC1sBYZwYc
const Youtube = () => {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState(-1);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function getResult() {
    const maxResults = search;
    const finalURL = `https://www.googleapis.com/youtube/v3/search?key={}&channelId=UCXgGY0wkgOzynnHvSEVmE3A&part=snippet,id&order=date&maxResults=${maxResults}`;
    fetch(finalURL)
      .then(response => response.json())
      .then(data => {
        const resultyt = data.items.map(
          obj => 'https://www.youtube.com/embed/' + obj.id.videoId
        );
        setResult(resultyt);
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    getResult();
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    getResult();
    setSearch(0);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type='text'
          placeholder='Please give search result'
          value={search}
        />
      </form>
      {result.map((link, i) => {
        return (
          <div key={i} className='youtube'>
            <iframe
              width='560'
              height='315'
              src={link}
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        );
      })}
    </div>
  );
};
export default Youtube;
