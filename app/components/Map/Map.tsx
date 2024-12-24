"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Loader, MapPin, Navigation } from "lucide-react";
import { useBookingContext } from "../Booking/BookingContext";

const MapComponent = ({ apiKey }: { apiKey: string }) => {
  const { destination, departure, setDeparture, setDestination } = useBookingContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const originAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const destinationAutocompleteRef =
    useRef<google.maps.places.Autocomplete | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null
  );
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );

  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [originAddress, setOriginAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);

          // Reverse geocode to get address
          try {
            const geocoder = new google.maps.Geocoder();
            const result = await geocoder.geocode({ location: pos });
            if (result.results[0]) {
              setOriginAddress(result.results[0].formatted_address);
              if (originInputRef.current) {
                originInputRef.current.value =
                  result.results[0].formatted_address;
              }
            }
          } catch (error) {
            console.error("Geocoding error:", error);
          }

          setupMap(pos);
          setIsLoading(false);
          setLocationError(null);
        },
        (error) => {
          setLocationError(
            "Unable to get your location. Please enter it manually."
          );
          const defaultPos = { lat: 40.7128, lng: -74.006 };
          setCurrentPosition(defaultPos);
          setupMap(defaultPos);
          setIsLoading(false);
        }
      );
    }
  };

  const initializeMap = () => {
    if (
      !mapRef.current ||
      !originInputRef.current ||
      !destinationInputRef.current
    )
      return;
    getCurrentLocation();
  };

  const extractCityName = (place: google.maps.places.PlaceResult): string => {
    if (!place.address_components) return "";

    // First try to find locality (city)
    const cityComponent = place.address_components.find((component) =>
      component.types.includes("locality")
    );

    // If no locality found, try administrative_area_level_1
    if (!cityComponent) {
      const regionComponent = place.address_components.find((component) =>
        component.types.includes("administrative_area_level_1")
      );
      return regionComponent ? regionComponent.long_name : "";
    }

    return cityComponent.long_name;
  };

  const setupMap = (position: google.maps.LatLngLiteral) => {
    if (
      !mapRef.current ||
      !originInputRef.current ||
      !destinationInputRef.current
    )
      return;

    const mapOptions: google.maps.MapOptions = {
      center: position,
      zoom: 15,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    };

    mapInstanceRef.current = new window.google.maps.Map(
      mapRef.current,
      mapOptions
    );


    // @ts-ignore
    new window.google.maps.Marker({
      position: position,
      map: mapInstanceRef.current,
      title: "Your Location",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      },
    });

    mapInstanceRef.current = new window.google.maps.Map(
      mapRef.current,
      mapOptions
    );
    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      map: mapInstanceRef.current,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: "#2563eb",
        strokeWeight: 5,
      },
    });

    // Setup origin autocomplete
    originAutocompleteRef.current = new window.google.maps.places.Autocomplete(
      originInputRef.current,
      {
        fields: ["formatted_address", "geometry", "name"],
        componentRestrictions: { country: "TN" }, // Restrict to Tunisia
        types: ["locality", "sublocality"],
      }
    );

    // Setup destination autocomplete
    destinationAutocompleteRef.current =
      new window.google.maps.places.Autocomplete(destinationInputRef.current, {
        fields: ["formatted_address", "geometry", "name"],
        componentRestrictions: { country: "TN" }, // Restrict to Tunisia
        types: ["locality", "sublocality"],
      });

    // Add listeners for both autocompletes
    originAutocompleteRef.current.addListener(
      "place_changed",
      calculateAndDisplayRoute
    );
    destinationAutocompleteRef.current.addListener(
      "place_changed",
      calculateAndDisplayRoute
    );
  };

  const calculateAndDisplayRoute = () => {
    if (
      !originInputRef.current ||
      !destinationInputRef.current ||
      !directionsServiceRef.current ||
      !directionsRendererRef.current
    )
      return;

    const origin = originInputRef.current.value;
    const destination = destinationInputRef.current.value;
    setDestination(destination);
    setDeparture(origin);

    if (!origin || !destination) return;

    directionsServiceRef.current.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRendererRef.current?.setDirections(result);

          // Update route info
          const route = result.routes[0];
          if (route && route.legs[0]) {
            setRouteInfo({
              distance: route.legs[0].distance?.text || "",
              duration: route.legs[0].duration?.text || "",
            });
          }
        }
      }
    );
  };

  const useCurrentLocation = () => {
    getCurrentLocation();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {locationError && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
          {locationError}
        </div>
      )}

      <div className="space-y-4 mb-4">
        <div className="relative">
          <div className="flex items-center space-x-2">
            <input
              ref={originInputRef}
              type="text"
              placeholder="Enter starting point..."
              className="flex-1 px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={useCurrentLocation}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Use current location"
            >
              <MapPin size={20} />
            </button>
          </div>
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>

        <div className="relative">
          <input
            ref={destinationInputRef}
            type="text"
            placeholder="Enter destination..."
            className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>

        {routeInfo && (
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
            Distance: {routeInfo.distance} • Duration: {routeInfo.duration}
          </div>
        )}
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 z-10">
            <Loader className="animate-spin text-blue-500" size={32} />
          </div>
        )}
        <div
          ref={mapRef}
          className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-200"
        />
      </div>
    </div>
  );
};

// Wrapper component that handles the API key from environment variables
const GoogleMapsWrapper = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-red-600 font-semibold mb-2">Configuration Error</h3>
        <p className="text-red-700">
          Google Maps API key is missing. Please add
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.
        </p>
      </div>
    );
  }

  return <MapComponent apiKey={apiKey} />;
};

export default GoogleMapsWrapper;
