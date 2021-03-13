import React from 'react';
import Album from '../Album/Album';
import './AlbumList.scss';

type albumListProps = {
  albumList: { id: number; name: string; thumbnailUrl: string }[];
};
export default function AlbumList({ albumList }: albumListProps) {
  return (
    <div>
      {albumList && (
        <ul className="album-list">
          {albumList.map((album) => (
            <li key={album.id}>
              <Album album={album} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
