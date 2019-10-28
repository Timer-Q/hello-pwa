import React, { useEffect } from 'react';
import { getMoviesList } from '../../services/requests';

export default function Home() {
  useEffect(() => {
    getMoviesList().then(res => console.log(res));
  });
  return <div>Home</div>;
}
