import {types} from 'mobx-state-tree';

export const defaultMeta: StationMeta = {
  song: 'Unlimited music',
  artist: '181.fm',
};

const StationMeta = types.model({
  song: types.string,
  artist: types.string,
});

const Album = types.model({
  Image: types.maybeNull(types.string),
  LargeImage: types.maybeNull(types.string),
});

const Station = types.model({
  name: types.string,
  code: types.string,
  e_rated: types.boolean,
});

export {Station, StationMeta, Album};
