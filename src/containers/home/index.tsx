import React, { useEffect, useState } from 'react';
import { getList } from '../../services/requests';
import '../../styles/home/index.scss';

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList().then(res => {
      if (res.code === 0) {
        setList(res.result);
      }
    });
  });

  function navigateToDetail(id: number) {
    console.log(id);
  }

  function renderList() {
    return list.map((item: { [propName: string]: any }) => {
      return (
        <div className='item' key={item.ep_id} onClick={() => navigateToDetail(item.ep_id)}>
          {item.title}
          <img src={item.square_cover} alt={item.title} />
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
