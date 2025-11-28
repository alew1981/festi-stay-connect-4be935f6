import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MapProps {
  events?: Array<{
    event_id: string;
    event_name: string;
    event_slug: string;
    venue_latitude: number;
    venue_longitude: number;
    venue_city: string;
    image_standard_url?: string;
  }>;
}

const Map = ({ events = [] }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-3.7038, 40.4168], // Madrid
      zoom: 5,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for events
    events.forEach(event => {
      if (event.venue_latitude && event.venue_longitude) {
        const el = document.createElement('div');
        el.className = 'map-marker';
        el.style.backgroundColor = 'hsl(var(--primary))';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 4px;">${event.event_name}</h3>
            <p style="font-size: 12px; color: #666;">${event.venue_city}</p>
            <a href="/producto/${event.event_slug}" style="color: hsl(var(--primary)); text-decoration: underline; font-size: 12px;">Ver detalles</a>
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat([event.venue_longitude, event.venue_latitude])
          .setPopup(popup)
          .addTo(map.current!);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken, events]);

  if (!tokenSubmitted) {
    return (
      <div className="w-full h-[500px] rounded-lg border bg-card p-8 flex flex-col items-center justify-center gap-4">
        <h3 className="text-xl font-bold">Mapa de Eventos</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Para ver el mapa interactivo, necesitas un token público de Mapbox. 
          Obtén uno gratis en <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            placeholder="Ingresa tu Mapbox Public Token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button onClick={() => setTokenSubmitted(true)} disabled={!mapboxToken}>
            Cargar Mapa
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
