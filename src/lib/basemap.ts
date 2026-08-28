// CARTO "Dark Matter" raster basemap, shared by every Leaflet map on the site.
// CARTO now requires an API key on basemaps.cartocdn.com. The key is scoped to
// the registered domain and unavoidably ends up in the client bundle; override
// it at build time with PUBLIC_CARTO_BASEMAP_KEY if you'd rather keep it out of
// source.
const CARTO_KEY =
  import.meta.env.PUBLIC_CARTO_BASEMAP_KEY ?? 'cb1_2ezr_1_10b95c022e6a7447d9b564ed';

export const CARTO_BASEMAP_URL =
  `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`;

export const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
