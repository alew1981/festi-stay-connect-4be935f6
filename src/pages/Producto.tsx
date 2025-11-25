import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink, Heart, Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useFavorites } from "@/hooks/useFavorites";

const Producto = () => {
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Get event details
  const { data: eventDetails, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tm_tbl_events")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando evento...</p>
        </div>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-20">
          <p className="text-center text-muted-foreground">Evento no encontrado</p>
        </main>
        <Footer />
      </div>
    );
  }

  const eventDate = eventDetails.event_date ? new Date(eventDetails.event_date) : new Date();
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 mt-20">
        <Breadcrumbs />

        {/* Event Image and Details */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-[500px]">
          <img
            src={eventDetails.image_large_url || eventDetails.image_standard_url || "/placeholder.svg"}
            alt={eventDetails.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {!eventDetails.sold_out && (
              <Badge className="bg-[#00FF8F] text-[#121212] px-4 py-2 text-sm font-bold uppercase">
                Disponible
              </Badge>
            )}
            {eventDetails.sold_out && (
              <Badge className="bg-[#121212] text-white px-4 py-2 text-sm font-bold uppercase">
                Agotado
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 left-6 bg-background/50 hover:bg-background/80"
            onClick={() => toggleFavorite({
              event_id: id!,
              event_name: eventDetails.name,
              event_date: eventDetails.event_date || '',
              venue_city: eventDetails.venue_city || '',
              image_url: eventDetails.image_standard_url || ''
            })}
          >
            <Heart className={`h-5 w-5 ${isFavorite(id!) ? 'fill-[#00FF8F] text-[#00FF8F]' : 'text-white'}`} />
          </Button>

          {/* Event Info */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {eventDetails.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/90 font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <div>
                  <div className="text-sm capitalize">{formattedDate}</div>
                  <div className="text-sm">{formattedTime}</div>
                </div>
              </div>
              
              {eventDetails.venue_name && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <div className="text-sm">{eventDetails.venue_name}</div>
                    {eventDetails.venue_address && (
                      <div className="text-xs opacity-80">{eventDetails.venue_address}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Artists */}
            {eventDetails.attraction_names && eventDetails.attraction_names.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5" />
                    Artistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {eventDetails.attraction_names.map((artist: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                        {artist}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pricing Info */}
            {(eventDetails.price_min_excl_fees || eventDetails.price_max_excl_fees) && (
              <Card>
                <CardHeader>
                  <CardTitle>Rango de Precios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {eventDetails.price_min_excl_fees && (
                      <div>
                        <p className="text-sm text-muted-foreground">Desde</p>
                        <p className="text-2xl font-bold text-[#00FF8F]">
                          €{Number(eventDetails.price_min_excl_fees).toFixed(2)}
                        </p>
                      </div>
                    )}
                    {eventDetails.price_max_excl_fees && eventDetails.price_max_excl_fees !== eventDetails.price_min_excl_fees && (
                      <div>
                        <p className="text-sm text-muted-foreground">Hasta</p>
                        <p className="text-2xl font-bold">
                          €{Number(eventDetails.price_max_excl_fees).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Precios sin tasas</p>
                </CardContent>
              </Card>
            )}

            {/* Venue Details */}
            <Card>
              <CardHeader>
                <CardTitle>Ubicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventDetails.venue_name && (
                  <div>
                    <p className="font-semibold">{eventDetails.venue_name}</p>
                    {eventDetails.venue_address && (
                      <p className="text-sm text-muted-foreground">{eventDetails.venue_address}</p>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{eventDetails.venue_city}, {eventDetails.venue_country}</span>
                </div>
                {eventDetails.venue_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={eventDetails.venue_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Venue
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Booking CTA */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Reserva tu Experiencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Evento</p>
                  <p className="font-semibold">{eventDetails.name}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Fecha</p>
                  <p className="font-medium">{formattedDate}</p>
                  <p className="text-sm">{formattedTime}</p>
                </div>

                {eventDetails.price_min_excl_fees && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Desde</p>
                    <p className="text-3xl font-bold text-[#00FF8F]">
                      €{Number(eventDetails.price_min_excl_fees).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">+ tasas aplicables</p>
                  </div>
                )}

                <div className="pt-4 space-y-3">
                  {eventDetails.url && !eventDetails.external_url && (
                    <Button className="w-full bg-[#00FF8F] hover:bg-[#00FF8F]/90 text-[#121212] font-bold py-6 text-base" asChild>
                      <a href={eventDetails.url} target="_blank" rel="noopener noreferrer">
                        Comprar Entradas
                      </a>
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full border-[#00FF8F] text-[#00FF8F] hover:bg-[#00FF8F]/10">
                    Buscar Hoteles Cercanos
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Reserva tu alojamiento y asegura tu lugar
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Producto;
