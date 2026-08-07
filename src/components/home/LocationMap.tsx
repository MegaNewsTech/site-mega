'use client'

import { useState } from 'react'
import { Crosshair, ExternalLink, MapPin, Navigation } from 'lucide-react'
import hqImg from '@/assets/team/502098171_18406693549096469_3877790639714763953_n.jpg'
import { assetSrc } from '@/lib/asset'
import './LocationMap.scss'

const ADDRESS_LABEL = 'R. Eliéser Dourado Moitinho, 499 - Irecê'
const ADDRESS_QUERY = 'R. Eliéser Dourado Moitinho, 499, Irecê, BA'

const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&z=17&hl=pt-BR&output=embed`
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`
const MAP_OPEN = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`

export default function LocationMap() {
  const [mapKey, setMapKey] = useState(0)

  const recenterMap = () => {
    setMapKey((k) => k + 1)
  }

  return (
    <section className="location-map" id="localizacao" aria-label="Localização Mega News">
      <div className="container">
        <div className="location-map__intro">
          <p className="eyebrow">Nossa sede</p>
          <h2 className="section-title">Onde estamos</h2>
          <p className="section-subtitle">
            Venha nos visitar em Irecê. Estamos prontos para receber você e cuidar da gestão do seu
            negócio.
          </p>
        </div>

        <div className="location-map__stage">
          <div className="location-map__frame">
            <iframe
              key={mapKey}
              title="Mapa da sede Mega News em Irecê"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="location-map__fade" aria-hidden="true" />

            <button
              type="button"
              className="location-map__recenter"
              onClick={recenterMap}
              aria-label="Centralizar mapa na sede Mega News"
              title="Centralizar na Mega News"
            >
              <Crosshair size={18} aria-hidden="true" />
              <span>Centralizar</span>
            </button>
          </div>

          <article className="location-map__card">
            <div className="location-map__photo">
              <img src={assetSrc(hqImg)} alt="Sede Mega News" draggable={false} />
            </div>

            <div className="location-map__body">
              <div className="location-map__pin">
                <MapPin size={16} aria-hidden="true" />
                <span>Sede Mega News</span>
              </div>

              <h3>Mega News Informática</h3>
              <p>{ADDRESS_LABEL}</p>

              <div className="location-map__actions">
                <a
                  href={MAP_DIRECTIONS}
                  className="location-map__cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation size={16} aria-hidden="true" />
                  Como chegar
                </a>
                <a
                  href={MAP_OPEN}
                  className="location-map__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir no mapa
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
