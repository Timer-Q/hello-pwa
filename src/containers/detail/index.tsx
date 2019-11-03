import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getDetail } from '../../services/requests';

export default function Detail() {
  // const [detail, setDetail] = useState()
  const location = useLocation();

  const { id } = location.state;
  useEffect(() => {
    if (id) {
      getDetail(id).then(res => console.log(res));
    }
  });
  return <div>detail</div>;
}
