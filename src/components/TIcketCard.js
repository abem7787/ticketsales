import { CalendarIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TicketCard() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2" // replace with your own
        alt="Festival"
        className="w-full h-48 object-cover"
      />

      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Electric Dreams Festival</h2>

        <div className="flex items-center space-x-6 text-gray-600 text-sm">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>June 15–17, 2023</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>Downtown Arena</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm">
          The biggest electronic music festival of the year featuring top DJs from around the world.
          Three days of non-stop music, art installations, and unforgettable experiences.
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Starting at</p>
            <p className="text-xl font-bold">0.05 ETH</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Get Tickets
          </Button>
        </div>
      </div>
    </div>
  );
}
