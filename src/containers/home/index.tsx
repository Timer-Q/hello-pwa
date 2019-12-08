import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getList } from '../../services/requests';
import '../../styles/home/index.scss';

export default function Home() {
  const [weekList, setWeekList] = useState([]);
  const [topList, setTopList] = useState([]);
  const history = useHistory();

  const setData = (sourceData: { data: Array<object> }, callback: Function) => {
    const { data } = sourceData;
    if (data && data.length) {
      callback(data);
    }
  };

  useEffect(() => {
    Promise.all([
      getList({ limit: 5 }),
      getList({ 'filter[status]': 'current', 'page[limit]': 5, sort: '-user_count' }),
    ]).then(([week, top]) => {
      setData(week, setWeekList);
      setData(top, setTopList);
    });
  }, []);

  useEffect(() => {
    let intersectionObserver: IntersectionObserver;
    if (weekList.length && topList.length) {
      // image lazyload
      const setObseerver = () => {
        intersectionObserver = new IntersectionObserver(
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
            root: document.querySelector('.home'),
          },
        );
        const ItemEls = document.querySelectorAll('.item-image');
        if (ItemEls && ItemEls.length) {
          ItemEls.forEach(el => {
            intersectionObserver.observe(el);
          });
        }
      };
      setObseerver();
    }
    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, [weekList, topList]);

  function navigateToDetail(data: {[propName: string]: any}) {
    const query = {
      id: data.id,
      coverImage: data.attributes.coverImage.original,
      title: data.attributes.titles.ja_jp,
      synopsis: data.attributes.synopsis,
    }

    const qs = new URLSearchParams(query).toString();

    history.push({
      pathname: '/detail',
      search: `${qs}`,
    });
  }

  function renderList(list: Array<object>) {
    return list.map((item: { [propName: string]: any }) => {
      const { attributes } = item;
      return (
        <div className='item' key={item.id} onClick={() => navigateToDetail(item)}>
          <img
            className='item-image'
            src={require('../../assets/images/placeholder.jpg')}
            data-src={attributes.posterImage.medium}
            alt={attributes.titles.en}
          />
          <p className='item-title'>{attributes.titles.ja_jp || attributes.titles.en}</p>
        </div>
      );
    });
  }
  return (
    <div className='home'>
      {/* 本周 */}
      <div className='section'>
        <div className='title'>Trending This Week</div>
        <div className='list'>{renderList(weekList)}</div>
      </div>
      {/* 热门 */}
      <div className='section'>
        <div className='title'>Top Airing Anime</div>
        <div className='list'>{renderList(topList)}</div>
      </div>
    </div>
  );
}
