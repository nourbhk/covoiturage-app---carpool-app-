// app/layout.tsx
import './globals.css'
import { AuthProvider } from "./AuthProvider";
import { BookingProvider } from "./components/Booking/BookingContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <BookingProvider>
          {children}
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}