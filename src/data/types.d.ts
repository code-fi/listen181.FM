interface Station {
  name: string;
  code: string;
  e_rated: boolean;
}
interface Channel {
  genre: string;
  stations: Station[];
}

interface StationMeta {
  song: string;
  artist: string;
}

interface Album {
  Image: string;
}
