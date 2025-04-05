// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import { Calendar, Ticket, Star, Users, Percent } from 'lucide-react';
import { Card, CardContent } from './card';  // Import from the same folder
import { Button } from './button';  // Import from the same folder
import SearchBar from './SearchBar';  // Import SearchBar component


const eventsData = [
  { id: 1, title: 'Concert - The Weekend', description: 'Enjoy live music from The Weekend!', image: 'https://example.com/image1.jpg' },
  { id: 2, title: 'Theater Show - Hamilton', description: 'A broadway show about American history', image: 'https://example.com/image2.jpg' },
  { id: 3, title: 'Sports - Basketball Finals', description: 'Watch the live finals!', image: 'https://example.com/image3.jpg' },
  { id: 4, title: 'Comedy Night', description: 'Get ready for a night of laughter!', image: 'https://example.com/image4.jpg' },
];


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  // Search handler
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
    useEffect(() => {
    // Filter events based on search query
    const results = eventsData.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchQuery]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Tickets</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Seamlessly browse, purchase, and manage tickets for concerts, sports, theater shows, and more.
          </p>
            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
          <div className="mt-6">
            <Button>Explore Events</Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Event Card 1 */}
          <Card>
            <CardContent>
              <Calendar className="w-8 h-8 text-indigo-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Post or Create Events</h2>
              <p className="text-slate-300">
                Organizers can list events or you can create one for them with approval before it goes live.
              </p>
            </CardContent>
          </Card>

          {/* Event Card 2 */}
          <Card>
            <CardContent>
              <Ticket className="w-8 h-8 text-green-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Secure Ticketing</h2>
              <p className="text-slate-300">
                One-scan ticket security, seat maps with drag & drop tools, and crypto/VISA checkout.
              </p>
            </CardContent>
          </Card>

          {/* Event Card 3 */}
          <Card>
            <CardContent>
              <Users className="w-8 h-8 text-pink-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Attendee Features</h2>
              <p className="text-slate-300">
                Personalized recommendations, social sharing, live event updates, and reward points.
              </p>
            </CardContent>
          </Card>

          {/* Event Card 4 */}
          <Card>
            <CardContent>
              <Star className="w-8 h-8 text-yellow-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Admin Control</h2>
              <p className="text-slate-300">
                Live chat support, refund handling, commission tracking, and client flyer uploads.
              </p>
            </CardContent>
          </Card>

          {/* Event Card 5 */}
          <Card>
            <CardContent>
              <Percent className="w-8 h-8 text-cyan-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Discounts & Promos</h2>
              <p className="text-slate-300">
                Apply promo codes and manage percentage splits between organizers and the platform.
              </p>
            </CardContent>
          </Card>
        </section>

        <footer className="text-center mt-24 text-slate-500">
          <p>&copy; 2025 EventVerse. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
