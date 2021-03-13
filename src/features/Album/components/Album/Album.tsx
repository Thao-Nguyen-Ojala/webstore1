import './Album.scss';

type AlbumProps = { album: { id: number; name: string; thumbnailUrl: string } };

export default function Album({ album }: AlbumProps) {
  return (
    <div className="album">
      <div className="album__thumbnail">
        <img src={album.thumbnailUrl} alt={album.name} />
      </div>
      <p>{album.name}</p>
    </div>
  );
}
