import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getDetail } from '../../services/requests';

type Detail = {
  title: string,
  description: string
}

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
  }, []);

  function renderContent() {
    return (
      <div className='detail'>
        <p className='title'>{detail.title}</p>
        <p>简介: {detail.description}</p>
      </div>
    );
  }
  return <div>{renderContent()}</div>;
}
