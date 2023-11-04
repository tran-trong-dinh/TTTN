import React from "react";
import GoogleMapReact from "google-map-react";

import { MdLocationPin } from "react-icons/md";

const Map = () => {
  const coords = { lat: 10.865493759487848, lng: 106.61824046822349 };

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
    <div className="map-container">
      <div style={{ height: "500px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.KEY_MAP }}
          defaultCenter={coords}
          defaultZoom={17}
          center={coords}
        >
          {coords && (
            <AnyReactComponent
              lat={coords.lat}
              lng={coords.lng}
              text={
                <div>
                  <MdLocationPin style={{ fontSize: "30px", color: "red" }} />
                  <span style={{ fontSize: "20px", fontWeight: "700" }}>
                    Double2Đ Store
                  </span>
                </div>
              }
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
