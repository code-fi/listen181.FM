export const fetchStationMeta = ({
  station = '181-powerexplicit_128k.mp3',
  successCallback,
}: {
  station?: string;
  successCallback: (meta: StationMeta) => void;
}) => {
  fetch(
    `https://player.181fm.com/streamdata.php?i=${station}&h=listen.181fm.com&p=7080`,
  )
    .then(response => {
      response.json().then(successCallback);
    })
    .catch(console.info);
};

export const fetchAlbum = ({
  song,
  successCallback,
}: {
  song: string;
  successCallback: (album: Album) => void;
}) => {
  fetch('https://player.181fm.com/album.php?key=' + encodeURIComponent(song))
    .then(response => {
      response.json().then(successCallback);
    })
    .catch(console.info);
};
