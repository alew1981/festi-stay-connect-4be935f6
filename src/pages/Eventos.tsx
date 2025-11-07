import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, ArrowUpDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Eventos = () => {
  const [sortBy, setSortBy] = useState("date");
  const [filterCity, setFilterCity] = useState("all");

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_list_page_view")
        .select("event_id, event_name, venue_city, venue_name, event_date, image_standard_url, min_price, venue_country, main_attraction_name")
        .gt("event_date", new Date().toISOString())
        .order("event_date", { ascending: true })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
  });

  const cities = [...new Set(events?.map(e => e.venue_city).filter(Boolean))];

  const filteredEvents = events?.filter(event => 
    filterCity === "all" || event.venue_city === filterCity
  );

  const sortedEvents = filteredEvents?.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
    }
    if (sortBy === "price-asc" && a.min_price && b.min_price) {
      return Number(a.min_price) - Number(b.min_price);
    }
    if (sortBy === "price-desc" && a.min_price && b.min_price) {
      return Number(b.min_price) - Number(a.min_price);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <Breadcrumbs />
        
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Todos los Eventos</h1>
          <p className="text-muted-foreground text-lg">
            Descubre los mejores eventos y conciertos en España
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Fecha</SelectItem>
                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ciudades</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city!}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Cargando eventos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents?.map((event) => {
              const eventDate = new Date(event.event_date);
              const formattedDate = eventDate.toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'short',
                year: 'numeric'
              });

              return (
                <Card key={event.event_id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.image_standard_url || "/placeholder.svg"}
                      alt={event.event_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.event_name}</h3>
                    {event.main_attraction_name && (
                      <p className="text-sm text-muted-foreground mb-2">{event.main_attraction_name}</p>
                    )}
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span>{event.venue_city}</span>
                      </div>
                    </div>
                    {event.min_price && (
                      <div className="mt-3">
                        <Badge variant="secondary">Desde €{Number(event.min_price).toFixed(2)}</Badge>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link to={`/producto/${event.event_id}`}>Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Eventos;
