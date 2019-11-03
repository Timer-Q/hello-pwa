import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getList } from '../../services/requests';
import '../../styles/home/index.scss';

export default function Home() {
  const [list, setList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getList().then(res => {
      if (res && res.flag) {
        setList(res.data.animeDataEntityList);
        setObseerver();
      }
    });
  }, []);

  function setObseerver() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          const { target } = entry;
          if (target) {
            if (entry.intersectionRatio) {
              (target as HTMLImageElement).src = (target as HTMLImageElement).dataset.src || '';
              observer.unobserve(target);
            }
          }
        });
      },
      {
        root: document.querySelector('.list'),
      }
    );
    const ItemEls = document.querySelectorAll('.item-image');
    if (ItemEls) {
      ItemEls.forEach(el => {
        observer.observe(el);
      });
    }
  }

  function navigateToDetail(id: number) {
    history.push('/detail', {
      id,
    });
  }

  function renderList() {
    return list.map((item: { [propName: string]: any }) => {
      return (
        <div className='item' key={item.id} onClick={() => navigateToDetail(item.id)}>
          <img
            className='item-image'
            src={require('../../assets/images/placeholder.jpg')}
            data-src={item.img}
            alt={item.title}
          />
          <p className='item-title'>{item.title}</p>
        </div>
      );
    });
  }
  return (
    <div className='home'>
      <div className='list'>{renderList()}</div>
    </div>
  );
}
