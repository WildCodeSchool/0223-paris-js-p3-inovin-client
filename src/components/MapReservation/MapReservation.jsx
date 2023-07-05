import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./MapReservation.scss";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map({ locations }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // ---------------------------------------- Add map----------------------------------------
  useEffect(() => {
    if (map.current) {
      map.current.remove();
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clilpddzb003y01o39zxt20nz",
      center: [2.5152007724586496, 46.60410199308436],
      zoom: 4.9,
      antialias: true,
    });

    map.current.on("load", () => {
      //  --------------create empty source markers --------------
      map.current.addSource("locations", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      map.current.addLayer({
        id: "locations",
        type: "circle",
        source: "locations",
        paint: {
          "circle-radius": 10,
          "circle-color": "#C95B5B",
          "circle-opacity": 1,
        },
      });
    });
  }, []);

  useEffect(() => {
    const geojson = [];
    setTimeout(() => {
      console.log("test passed 1 seconde later");
      locations.map((element) => {
        geojson.push({
          type: "Feature",
          properties: { id: element.id, place_name: element.place_name },
          geometry: {
            type: "Point",
            coordinates: [element.lng, element.lat],
          },
        });
      });
      map.current.getSource("locations").setData({
        type: "FeatureCollection",
        features: geojson,
      });
    }, "500");
  }, [locations]);

  // ---------------------------------------- RETURN----------------------------------------
  return <div ref={mapContainer} className="map" />;
}
export default Map;
Map.propTypes = {};
