import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getDetail } from '../../services/requests';
import '../../styles/detail/index.scss';
import { url } from 'inspector';

interface IEpisode {
  attributes: { [propName: string]: any };
  description: string;
  img: string;
  tag: string;
}

interface IEpisodes extends Array<IEpisode>{}

export default function Detail() {
  const [episodes, setEpisodes] = useState([] as IEpisodes);
  const [coverImage, setCoverImage] = useState('')
  const location = useLocation();

  useEffect(() => {
    const { id, coverImage } = location.state;
    if (id) {
      getDetail({ 'filter[mediaType]': 'Anime', 'filter[media_id]': id, sort: 'number' }).then(
        res => {
          const { data } = res;
          if (data && data.length) {
            setEpisodes(data);
            setCoverImage(coverImage);
          }
        },
      );
    }
  }, [location]);

  const renderEpisodes = () => {
    if (episodes && episodes.length) {
      return episodes.map(item => {
        return <div>
          <img src={item.attributes.thumbnail.original}/>
        </div>
      })
    }
  };

  function renderContent() {
    return (
      <div className='detail' style={{ backgroundImage: `url(${coverImage})` }}>
        <div className='container'>
          <div className='header-img' style={{ backgroundImage: `url(${coverImage})` }}></div>
          <div>
            {renderEpisodes()}
          </div>
        </div>
      </div>
    );
  }

  return <div>{renderContent()}</div>;
}
