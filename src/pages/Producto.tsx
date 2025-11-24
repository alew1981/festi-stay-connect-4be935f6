import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket, Hotel, ExternalLink, ShoppingCart, Star, Heart, Clock, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useFavorites } from "@/hooks/useFavorites";
import electronicImg from "@/assets/festival-electronic.jpg";

interface CartTicket {
  priceId: string;
  name: string;
  code: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartHotel {
  hotelId: string;
  name: string;
  pricePerNight: number;
  nights: number;
  image?: string;
  bookingUrl?: string;
}

const Producto = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const domainId = searchParams.get('domain');
  const { toggleFavorite, isFavorite } = useFavorites();
  const [cartTickets, setCartTickets] = useState<CartTicket[]>([]);
  const [cartHotel, setCartHotel] = useState<CartHotel | null>(null);
  const [sortBy, setSortBy] = useState("rating");
  const [expandedHotels, setExpandedHotels] = useState<{ [key: string]: boolean }>({});
  const [filterStars, setFilterStars] = useState("all");
  const [showAllTickets, setShowAllTickets] = useState(false);

  // Obtener detalles del evento
  const { data: eventDetails, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["event", id, domainId],
    queryFn: async () => {
      let query = supabase
        .from("tm_tbl_events")
        .select("*")
        .eq("event_id", id);
      
      if (domainId) {
        query = query.eq("domain_id", domainId);
      }
      
      const { data, error } = await query.maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  // Obtener precios de tickets
  const { data: ticketPrices, isLoading: isLoadingTickets } = useQuery({
    queryKey: ["tickets", id, domainId],
    queryFn: async () => {
      let query = supabase
        .from("tm_tbl_event_prices")
        .select("*")
        .eq("event_id", id);
      
      if (domainId) {
        query = query.eq("domain_id", domainId);
      }
      
      const { data, error } = await query.order("total_price", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Obtener hoteles desde la tabla de paquetes
  const { data: packages, isLoading: isLoadingHotels } = useQuery({
    queryKey: ["packages", id, domainId],
    queryFn: async () => {
      let query = supabase
        .from("lovable_tbl_packages")
        .select(`
          *,
          lite_tbl_hotels (*)
        `)
        .eq("event_id", id);
      
      if (domainId) {
        query = query.eq("domain_id", domainId);
      }
      
      const { data, error } = await query.limit(20);
      
      if (error) throw error;
      return data;
    },
  });

  // Extraer hoteles únicos de los paquetes
  const hotels = packages?.reduce((acc: any[], pkg: any) => {
    if (pkg.lite_tbl_hotels && !acc.find(h => h.id === pkg.lite_tbl_hotels.id)) {
      acc.push({
        ...pkg.lite_tbl_hotels,
        package_price: pkg.price,
        suggested_selling_price: pkg.suggested_selling_price,
        nights: pkg.nights,
        checkin_date: pkg.checkin_date,
        checkout_date: pkg.checkout_date
      });
    }
    return acc;
  }, []);

  // Seleccionar por defecto 2 entradas del primer tipo disponible al cargar
  useEffect(() => {
    if (ticketPrices && ticketPrices.length > 0 && cartTickets.length === 0) {
      const firstAvailableTicket = ticketPrices[0];
      if (firstAvailableTicket) {
        setCartTickets([{
          priceId: firstAvailableTicket.id.toString(),
          name: firstAvailableTicket.price_type_name || 'Entrada',
          code: firstAvailableTicket.price_type_code || '',
          description: firstAvailableTicket.price_type_description || '',
          price: Number(firstAvailableTicket.total_price),
          quantity: 2,
          image: eventDetails?.image_standard_url || electronicImg,
        }]);
      }
    }
  }, [ticketPrices, cartTickets.length, eventDetails]);

  const updateTicketInCart = (priceId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartTickets(prev => prev.filter(t => t.priceId !== priceId));
      return;
    }

    const ticket = ticketPrices?.find(t => t.id.toString() === priceId);
    if (!ticket) return;

    setCartTickets(prev => {
      const existing = prev.find(t => t.priceId === priceId);
      if (existing) {
        return prev.map(t => t.priceId === priceId ? { ...t, quantity } : t);
      } else {
        return [...prev, {
          priceId,
          name: ticket.price_type_name || 'Entrada',
          code: ticket.price_type_code || '',
          description: ticket.price_type_description || '',
          price: Number(ticket.total_price),
          quantity,
          image: eventDetails?.image_standard_url || electronicImg,
        }];
      }
    });
  };

  const addHotelToCart = (hotel: any) => {
    setCartHotel({
      hotelId: hotel.id,
      name: hotel.name,
      pricePerNight: Number(hotel.package_price || hotel.suggested_selling_price || 0),
      nights: hotel.nights || 1,
      image: hotel.thumbnail || hotel.main_photo,
      bookingUrl: `https://www.booking.com/hotel/${hotel.id}.html`,
    });
  };

  const updateHotelNights = (nights: number) => {
    if (cartHotel) {
      setCartHotel({ ...cartHotel, nights: Math.max(1, nights) });
    }
  };

  const removeTicketFromCart = (priceId: string) => {
    setCartTickets(prev => prev.filter(t => t.priceId !== priceId));
  };

  const removeHotelFromCart = () => {
    setCartHotel(null);
  };

  const getTotalAttendees = () => {
    return cartTickets.reduce((sum, t) => sum + t.quantity, 0);
  };

  const getTicketsTotal = () => {
    return cartTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
  };

  const hotelTotal = cartHotel ? cartHotel.pricePerNight * cartHotel.nights : 0;
  const totalPackage = getTicketsTotal() + hotelTotal;
  const totalAttendees = getTotalAttendees();
  const totalPerPerson = totalAttendees > 0 ? totalPackage / totalAttendees : 0;

  const filteredHotels = (hotels || [])
    .filter((hotel: any) => filterStars === "all" || hotel.stars === Number(filterStars));

  const sortedHotels = [...filteredHotels].sort((a: any, b: any) => {
    const priceA = Number(a.package_price || a.suggested_selling_price || 0);
    const priceB = Number(b.package_price || b.suggested_selling_price || 0);
    
    if (sortBy === "price-asc") return priceA - priceB;
    if (sortBy === "price-desc") return priceB - priceA;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "stars") return (b.stars || 0) - (a.stars || 0);
    return 0;
  });

  const toggleDescription = (hotelId: string) => {
    setExpandedHotels(prev => ({ ...prev, [hotelId]: !prev[hotelId] }));
  };

  const truncateText = (text: string, limit: number) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const stripHtml = (html: string) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (isLoadingEvent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
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
            src={eventDetails.image_standard_url || electronicImg}
            alt={eventDetails.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Entradas Disponibles Badge */}
          <div className="absolute top-6 right-6">
            <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
              Entradas Disponibles
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-20 right-6 bg-background/50 hover:bg-background/80"
            onClick={() => toggleFavorite({
              event_id: id!,
              event_name: eventDetails.name,
              event_date: eventDetails.event_date || '',
              venue_city: eventDetails.venue_city || '',
              image_url: eventDetails.image_standard_url || ''
            })}
          >
            <Heart className={`h-5 w-5 ${isFavorite(id!) ? 'fill-primary text-primary' : ''}`} />
          </Button>

          {/* Event Info */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground drop-shadow-lg">
              {eventDetails.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-foreground/90 font-medium">
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
              
              {eventDetails.venue_city && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <div className="text-sm">{eventDetails.venue_city}</div>
                    {eventDetails.venue_country && (
                      <div className="text-xs opacity-80">{eventDetails.venue_country}</div>
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
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {eventDetails.main_attraction_name && `Evento de ${eventDetails.main_attraction_name}. `}
                  Disfruta de este increíble evento en {eventDetails.venue_city}.
                </p>
              </CardContent>
            </Card>

            {/* Tickets Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Entradas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingTickets ? (
                  <div className="text-center py-8 text-muted-foreground">Cargando entradas...</div>
                ) : ticketPrices && ticketPrices.length > 0 ? (
                  <>
                    {(showAllTickets ? ticketPrices : ticketPrices.slice(0, 5)).map((ticket) => {
                      const currentTicket = cartTickets.find(t => t.priceId === ticket.id.toString());
                      const quantity = currentTicket?.quantity || 0;
                      
                      return (
                        <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{ticket.price_type_name || 'Entrada'}</h4>
                              {ticket.price_type_code && (
                                <Badge variant="outline" className="text-xs">
                                  {ticket.price_type_code}
                                </Badge>
                              )}
                            </div>
                            {ticket.price_type_description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {ticket.price_type_description}
                              </p>
                            )}
                            <p className="text-lg font-bold mt-2">
                              €{Number(ticket.total_price).toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Select
                              value={quantity.toString()}
                              onValueChange={(value) => updateTicketInCart(ticket.id.toString(), parseInt(value))}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      );
                    })}
                    
                    {ticketPrices.length > 5 && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowAllTickets(!showAllTickets)}
                      >
                        {showAllTickets ? 'Ver menos' : `Ver más (${ticketPrices.length - 5} más)`}
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay entradas disponibles en este momento
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hotels Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Hotel className="h-5 w-5" />
                    Hoteles Cercanos
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select value={filterStars} onValueChange={setFilterStars}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Estrellas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="3">3 ⭐</SelectItem>
                        <SelectItem value="4">4 ⭐</SelectItem>
                        <SelectItem value="5">5 ⭐</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Mejor valorados</SelectItem>
                        <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                        <SelectItem value="stars">Estrellas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingHotels ? (
                  <div className="text-center py-8 text-muted-foreground">Cargando hoteles...</div>
                ) : sortedHotels && sortedHotels.length > 0 ? (
                  sortedHotels.map((hotel: any) => {
                    const price = Number(hotel.package_price || hotel.suggested_selling_price || 0);
                    const description = stripHtml(hotel.hotel_description || '');
                    const isExpanded = expandedHotels[hotel.id];
                    
                    return (
                      <div key={hotel.id} className="p-4 rounded-lg border space-y-3">
                        <div className="flex gap-4">
                          {hotel.thumbnail && (
                            <img
                              src={hotel.thumbnail}
                              alt={hotel.name}
                              className="w-32 h-24 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{hotel.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  {hotel.stars && (
                                    <div className="flex items-center text-yellow-500">
                                      {Array.from({ length: hotel.stars }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-current" />
                                      ))}
                                    </div>
                                  )}
                                  {hotel.rating && (
                                    <Badge variant="secondary">{hotel.rating}/10</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {hotel.city}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">€{price.toFixed(2)}</p>
                                <p className="text-xs text-muted-foreground">por noche</p>
                              </div>
                            </div>

                            {description && (
                              <div className="mt-3">
                                <p className="text-sm text-muted-foreground">
                                  {isExpanded ? description : truncateText(description, 50)}
                                </p>
                                {description.length > 50 && (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="h-auto p-0 mt-1"
                                    onClick={() => toggleDescription(hotel.id)}
                                  >
                                    {isExpanded ? 'Ver menos' : 'Ver más'}
                                  </Button>
                                )}
                              </div>
                            )}

                            <div className="flex items-center gap-2 mt-3">
                              <Select defaultValue="1" onValueChange={(value) => {
                                // This would be used when adding to cart
                              }}>
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num} {num === 1 ? 'noche' : 'noches'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addHotelToCart(hotel)}
                              >
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay hoteles disponibles para este evento
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  {eventDetails.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tickets in Cart */}
                {cartTickets.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Ticket className="h-4 w-4" />
                      Entradas
                    </h4>
                    {cartTickets.map((ticket) => (
                      <div key={ticket.priceId} className="flex items-center gap-2 p-2 rounded border bg-muted/30">
                        {ticket.image && (
                          <img src={ticket.image} alt={ticket.name} className="w-12 h-12 object-cover rounded" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{ticket.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.quantity}x €{ticket.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeTicketFromCart(ticket.priceId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hotel in Cart */}
                {cartHotel && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      Hotel
                    </h4>
                    <div className="flex items-center gap-2 p-2 rounded border bg-muted/30">
                      {cartHotel.image && (
                        <img src={cartHotel.image} alt={cartHotel.name} className="w-12 h-12 object-cover rounded" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{cartHotel.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {cartHotel.nights} {cartHotel.nights === 1 ? 'noche' : 'noches'} x €{cartHotel.pricePerNight.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={removeHotelFromCart}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {cartTickets.length === 0 && !cartHotel && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Tu carrito está vacío
                  </p>
                )}

                {(cartTickets.length > 0 || cartHotel) && (
                  <>
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Entradas</span>
                        <span>€{getTicketsTotal().toFixed(2)}</span>
                      </div>
                      {cartHotel && (
                        <div className="flex justify-between text-sm">
                          <span>Hotel</span>
                          <span>€{hotelTotal.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>€{totalPackage.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-primary font-bold bg-primary/10 p-2 rounded">
                        <span>Total por persona</span>
                        <span>€{totalPerPerson.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      {cartTickets.length > 0 && (
                        <Button className="w-full" size="lg">
                          Reservar entradas
                        </Button>
                      )}
                      {cartHotel && (
                        <Button variant="outline" className="w-full" size="lg" asChild>
                          <a href={cartHotel.bookingUrl} target="_blank" rel="noopener noreferrer">
                            Reservar hoteles
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </>
                )}
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
