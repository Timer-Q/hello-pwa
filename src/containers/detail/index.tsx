import React, { useEffect, useState } from 'react';
import { getDetail } from '../../services/requests';

export default function Detail() {
    // const [detail, setDetail] = useState()
  useEffect(() => {
    getDetail().then(res => console.log(res))
  });
  return <div>detail</div>
}
