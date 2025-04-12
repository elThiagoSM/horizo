import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaGlobe,
  FaWhatsapp,
} from "react-icons/fa";

// Arreglar icono por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const BusinessLocationSection = ({
  ref,
  address,
  phone,
  email,
  whatsapp,
  website,
  instagram,
  position,
}) => {
  return (
    <section className="py-12" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 h-full rounded-2xl overflow-hidden">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> & contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                {address}
                <br /> ¡Te esperamos!
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="md:col-span-1 bg-white rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Contacto</h3>
          <ul className="text-gray-700 space-y-4">
            <li>
              <strong>Dirección:</strong>
              <br />
              {address}
            </li>
            {phone && (
              <li className="flex items-center gap-2">
                <FaPhone className="text-blue-600" />
                <a
                  href={`tel:${phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-600" />
                <a
                  href={`mailto:${email}`}
                  className="text-blue-600 hover:underline"
                >
                  {email}
                </a>
              </li>
            )}
            {whatsapp && (
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-green-600" />
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 hover:underline"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {website && (
              <li className="flex items-center gap-2">
                <FaGlobe className="text-blue-600" />
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {website.replace(/^https?:\/\//, "")}
                </a>
              </li>
            )}
            {instagram && (
              <li className="flex items-center gap-2">
                <FaInstagram className="text-pink-600" />
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-600 hover:underline"
                >
                  @{instagram}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BusinessLocationSection;
