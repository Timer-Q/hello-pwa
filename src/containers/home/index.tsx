import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getList } from '../../services/requests';
import '../../styles/home/index.scss';

export default function Home() {
  const [list, setList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getList().then(res => {
      console.log(res)
      if (res && res.flag) {
        setList(res.data.animeDataEntityList);
      }
    });
  }, []);

  function navigateToDetail(id: number) {
    console.log(id, history);
    history.push('/detail')
  }

  function renderList() {
    return list.map((item: { [propName: string]: any }) => {
      return (
        <div className='item' key={item.id} onClick={() => navigateToDetail(item.id)}>
          <img src={item.img} alt={item.title} />
          <p>{item.title}</p>
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
