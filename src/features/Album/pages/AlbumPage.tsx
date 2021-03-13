import React from 'react';
import AlbumList from '../components/AlbumList/AlbumList';

export default function AlbumPage() {
  const albumList = [
    {
      id: 1,
      name: 'Pop',
      thumbnailUrl:
        'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/2/b/6/f/2b6fbb21ac9d4a37e4bd90809a2cd507.jpg',
    },
    {
      id: 2,
      name: 'Balad',
      thumbnailUrl:
        'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/1/5/2/5/1525280a10e7fb3e616962761f8900a6.jpg',
    },

    {
      id: 3,
      name: 'Rap',
      thumbnailUrl:
        'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/5/d/4/f5d481d849c26f13b9f1b489b493c1ec.jpg',
    },
  ];
  return (
    <div>
      <h2>Let's practise typescript</h2>
      <AlbumList albumList={albumList} />
    </div>
  );
}
