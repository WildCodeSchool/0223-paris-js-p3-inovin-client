import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./MapReservation.scss";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map({ filteredSessions, setClickedLocation }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popupRef = useRef(
    new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })
  );
  const [isMounted, setIsMounted] = useState(false);

  // ---------------------------------------- Add map----------------------------------------
  useEffect(() => {
    if (map.current) {
      map.current.remove();
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clilpddzb003y01o39zxt20nz",
      center: [3.516986262712662, 44.51521711882075],
      zoom: 8.5,
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
          "circle-radius": 8,
          "circle-color": "#C95B5B",
          "circle-opacity": 1,
        },
      });
      setIsMounted(true);
    });

    // ---------------------------------------- popups----------------------------------------

    map.current.on("mouseenter", "locations", (e) => {
      map.current.getCanvas().style.cursor = "pointer";
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.place_name;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      const popupContent = document.createElement("div");
      popupContent.innerHTML = description;

      // Populate the popup and set its coordinates
      // based on the feature found.
      popupRef.current.setLngLat(coordinates).setDOMContent(popupContent).addTo(map.current);
    });

    map.current.on("mouseleave", "locations", () => {
      map.current.getCanvas().style.cursor = "default";
      popupRef.current.remove();
    });

    map.current.on("click", "locations", (e) => {
      const id = e.features[0].properties.location_id;
      const name = e.features[0].properties.place_name;
      const image = e.features[0].properties.image;
      setClickedLocation({ id: parseInt(id), name: name, image: image });
    });
  }, []);

  // -------------------------------- Add locations markers----------------------------------------

  const getData = () => {
    const geojson = [];
    filteredSessions.map((element) => {
      geojson.push({
        type: "Feature",
        properties: {
          id: element.id,
          place_name: element.place_name,
          location_id: element.location_id,
          image: element.image,
        },
        geometry: {
          type: "Point",
          coordinates: [element.lng, element.lat, element.image],
        },
      });
    });
    map.current.getSource("locations").setData({
      type: "FeatureCollection",
      features: geojson,
    });
  };

  useEffect(() => {
    if (isMounted) {
      getData();
    }
  }, [filteredSessions, isMounted]);

  // ---------------------------------------- RETURN----------------------------------------
  return <div ref={mapContainer} className="map" />;
}
export default Map;
Map.propTypes = {};
