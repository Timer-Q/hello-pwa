import React, { useEffect, useState, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { getDetail } from '../../services/requests';
import '../../styles/detail/index.scss';

interface IEpisode {
  attributes: { [propName: string]: any };
  description: string;
  img: string;
  tag: string;
  id: number,
}

interface IEpisodes extends Array<IEpisode> {}

export default function Detail() {
  const [episodes, setEpisodes] = useState([] as IEpisodes);
  const [coverImage, setCoverImage] = useState('');
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    
    if (id) {
      getDetail({ 'filter[mediaType]': 'Anime', 'filter[media_id]': id, sort: 'number' }).then(
        res => {
          const { data } = res;
          if (data && data.length) {
            setEpisodes(data);
            setCoverImage(query.get('coverImage') || '');
            setTitle(query.get('title') || '');
            setSynopsis(query.get('synopsis') || '');
          }
        },
      );
    }
  }, [location]);

  const handleEpisodesClick = (event: MouseEvent<HTMLElement>): void => {
    const el = event.target as HTMLImageElement;
    const nextEl = el.nextElementSibling as HTMLDivElement;
    if (nextEl) {
      const height = nextEl.style.height;
      if (!height || height === '0px') {
        nextEl.style.height = '52px';
      } else {
        nextEl.style.height = '0';
      }
    }
  }

  const renderEpisodes = () => {
    if (episodes && episodes.length) {
      return episodes.map(item => {
        const { attributes } = item;
        return (
          <div key={item.id} className='item'>
            <img className='img' onClick={handleEpisodesClick} src={attributes.thumbnail.original} alt={attributes.titles.ja_jp} />
            <div className="item-content">
              <div className="item-content-title">
                {attributes.titles.ja_jp}
              </div>
              <div className="item-content-synopsis">
                {attributes.synopsis}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  function renderContent() {
    return (
      <div className='detail' style={{ backgroundImage: `url(${coverImage})` }}>
        <div className='container'>
          <div className='header'>
            <div className='title'>{title}</div>
            <div className='synopsis'>{synopsis}</div>
          </div>
          <div className='list'>{renderEpisodes()}</div>
        </div>
      </div>
    );
  }

  return <div>{renderContent()}</div>;
}
