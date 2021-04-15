import { useState } from 'react';
import styles from './index.module.scss';

const Home = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const output = () => {
    fetch(`${location.href}api/app?keyword=${query}`)
      .then(response => response.json())
      .then(data => {
        setPhotos(data.results);
      }).catch(() => {
        setPhotos([]);
      });
  };

  return (
    <>
      <head>
        <title>Demo</title>
      </head>
      <body>
        <div className={styles.container}>
          <h1 className={styles.title}>Demo</h1>
          <form
            className={styles.search}
            onSubmit={e => {
              e.preventDefault();
              output();
            }}
          >
            <input
              type='text'
              placeholder={`🔍  Search for photos`}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </form>
          <div className={styles.list}>
            {photos.map((photo, index) => {
              return (
                <div key={index}>
                  <a href={photo.regular} target='_blank' rel='noopener noreferrer'>
                    <img src={photo.small} />
                  </a>
                  <div>
                    <a href={photo.profileurl} target='_blank' rel='noopener noreferrer'>
                      📸 {photo.author}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </body>
    </>
  )
};

export default Home;