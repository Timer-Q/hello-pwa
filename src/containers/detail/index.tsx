import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getDetail } from '../../services/requests';
import '../../styles/detail/index.scss';

type Detail = {
  title: string;
  description: string;
  img: string;
  tag: string;
};

export default function Detail() {
  const [detail, setDetail] = useState({} as Detail);
  const location = useLocation();

  useEffect(() => {
    const { id } = location.state;
    if (id) {
      getDetail(id).then(res => {
        if (res.flag) {
          setDetail(res.data);
        }
      });
    }
  }, [location]);

  function renderContent() {
    return (
      <div className='detail' style={{ backgroundImage: `url(${detail.img})` }}>
        <div className='container'>
          <div className='header-img' style={{ backgroundImage: `url(${detail.img})` }}></div>
          <div className='content'>
            <p className='title'>{detail.title}</p>
            <p className='description'>简介: {detail.description}</p>
            <p className='description'>{detail.tag}</p>
          </div>
        </div>
      </div>
    );
  }
  return <div>{renderContent()}</div>;
}
