import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Ticket, Hotel, ExternalLink, ShoppingCart } from "lucide-react";
import electronicImg from "@/assets/festival-electronic.jpg";

// Mock data - en producción vendría de la API
const festivalData = {
  id: 1,
  title: "Summer Electronic Festival",
  location: "Barcelona, España",
  date: "15-17 Julio 2024",
  image: electronicImg,
  description: "El festival de música electrónica más grande de Europa. Tres días de música ininterrumpida con los mejores DJs del mundo.",
  tickets: [
    { id: 1, name: "Entrada General", price: 149, features: ["Acceso 3 días", "Acceso a zona general"] },
    { id: 2, name: "VIP", price: 299, features: ["Acceso 3 días", "Zona VIP", "Bebidas incluidas"] },
    { id: 3, name: "Premium", price: 499, features: ["Acceso 3 días", "Zona Premium", "Bebidas premium", "Meet & Greet"] },
  ],
  hotels: [
    {
      id: 1,
      name: "Hotel Barceló Raval",
      distance: "1.5 km del festival",
      stars: 4,
      pricePerNight: 120,
      image: electronicImg,
      partnerUrl: "https://booking.com",
    },
    {
      id: 2,
      name: "W Barcelona",
      distance: "2 km del festival",
      stars: 5,
      pricePerNight: 250,
      image: electronicImg,
      partnerUrl: "https://booking.com",
    },
    {
      id: 3,
      name: "Hotel Arts Barcelona",
      distance: "1.8 km del festival",
      stars: 5,
      pricePerNight: 280,
      image: electronicImg,
      partnerUrl: "https://booking.com",
    },
    {
      id: 4,
      name: "NH Collection Barcelona",
      distance: "3 km del festival",
      stars: 4,
      pricePerNight: 150,
      image: electronicImg,
      partnerUrl: "https://booking.com",
    },
  ],
};

const Producto = () => {
  const { id } = useParams();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [attendees, setAttendees] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
  const [hotelNights, setHotelNights] = useState(3);

  const festival = festivalData;
  const ticketPrice = selectedTicket ? festival.tickets.find(t => t.id === selectedTicket)?.price || 0 : 0;
  const hotelPrice = selectedHotel ? (festival.hotels.find(h => h.id === selectedHotel)?.pricePerNight || 0) * hotelNights : 0;
  const totalPackage = (ticketPrice * attendees) + hotelPrice;
  const totalPerPerson = attendees > 0 ? totalPackage / attendees : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Festival Info */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={festival.image}
                alt={festival.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end">
                <div className="p-8 w-full">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{festival.title}</h1>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{festival.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-secondary" />
                      <span>{festival.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{festival.description}</p>
              </CardContent>
            </Card>

            {/* Tipos de Entradas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Ticket className="h-6 w-6" />
                  Tipos de Entradas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {festival.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTicket === ticket.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{ticket.name}</h3>
                          <p className="text-2xl font-bold text-primary mt-1">€{ticket.price}</p>
                        </div>
                        {selectedTicket === ticket.id && (
                          <Badge variant="default">Seleccionado</Badge>
                        )}
                      </div>
                      <ul className="space-y-1 mt-3">
                        {ticket.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Users className="h-4 w-4" />
                    Número de asistentes
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAttendees(Math.max(1, attendees - 1))}
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold w-12 text-center">{attendees}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAttendees(attendees + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hoteles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Hotel className="h-6 w-6" />
                  Hoteles Recomendados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {festival.hotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className={`rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
                        selectedHotel === hotel.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedHotel(hotel.id)}
                    >
                      <div className="h-32 overflow-hidden">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{hotel.name}</h4>
                          {selectedHotel === hotel.id && (
                            <Badge variant="default" className="text-xs">✓</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {"⭐".repeat(hotel.stars)}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">{hotel.distance}</p>
                        <p className="text-lg font-bold text-primary">
                          €{hotel.pricePerNight}/noche
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedHotel && (
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <label className="text-sm font-medium mb-2 block">
                      Número de noches
                    </label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setHotelNights(Math.max(1, hotelNights - 1))}
                      >
                        -
                      </Button>
                      <span className="text-lg font-semibold w-12 text-center">{hotelNights}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setHotelNights(hotelNights + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Cesta lateral */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Tu Paquete
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTicket ? (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">Entradas</p>
                          <p className="text-xs text-muted-foreground">
                            {festival.tickets.find(t => t.id === selectedTicket)?.name}
                          </p>
                        </div>
                        <Badge variant="secondary">{attendees}x</Badge>
                      </div>
                      <p className="text-right font-bold">€{ticketPrice * attendees}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => window.open("https://ticketmaster.com", "_blank")}
                      >
                        Comprar entradas
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground">
                      Selecciona un tipo de entrada
                    </div>
                  )}

                  {selectedHotel ? (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">Hotel</p>
                          <p className="text-xs text-muted-foreground">
                            {festival.hotels.find(h => h.id === selectedHotel)?.name}
                          </p>
                        </div>
                        <Badge variant="secondary">{hotelNights} noches</Badge>
                      </div>
                      <p className="text-right font-bold">€{hotelPrice}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => window.open(festival.hotels.find(h => h.id === selectedHotel)?.partnerUrl, "_blank")}
                      >
                        Reservar hotel
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground">
                      Selecciona un hotel
                    </div>
                  )}

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total paquete:</span>
                      <span className="text-2xl font-bold text-primary">€{totalPackage}</span>
                    </div>
                    {attendees > 1 && (
                      <div className="flex justify-between items-center text-muted-foreground">
                        <span className="text-xs">Por persona:</span>
                        <span className="text-lg font-semibold">€{totalPerPerson.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Producto;
