import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./MapReservation.scss";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map({ sessions }) {
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

    // ---------------------------------------- popups----------------------------------------

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.current.on("mouseenter", "locations", (e) => {
      map.current.getCanvas().style.cursor = "pointer";
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;
      console.log("description", description);

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.current.on("mouseleave", "", () => {
      map.current.getCanvas().style.cursor = "default";
      popup.remove();
    });
  }, []);

  // -------------------------------- Add locations markers----------------------------------------

  useEffect(() => {
    const geojson = [];
    setTimeout(() => {
      sessions.map((element) => {
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
  }, [sessions]);

  // ---------------------------------------- RETURN----------------------------------------
  return <div ref={mapContainer} className="map" />;
}
export default Map;
Map.propTypes = {};
