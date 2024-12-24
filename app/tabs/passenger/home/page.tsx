import Booking from "../../../components/Booking/Booking";
import Map from "../../../components/Map/Map";
import { BookingProvider } from "../../../components/Booking/BookingContext";
import NavBar from "@/app/components/NavBar/NavBar";

export default function Page() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        <BookingProvider>
          <div className="bg-white overflow-y-auto">
            <Booking />
          </div>
          <div className="col-span-2 bg-gray-100 order-first md:order-last overflow-hidden">
            <Map />
          </div>
        </BookingProvider>
      </div>
    </div>
  );
}