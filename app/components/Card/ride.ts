export const rides = [
    {
        id: 1,
        departure: "Tunis",
        destination: "Sfax",
        driverName: "Ahmed Ben Ali",
        driverRating: 4.5,
        seats: 4,
        price: 25,
        departureTime: "09:30",
        departureDate: "2024-12-23", // Added departure date
        rules: [
            { type: "no_pets", description: "No pets allowed" },
            { type: "no_smoking", description: "No smoking" },
            { type: "luggage", description: "Maximum 1 suitcase per person" }
        ]
    },
    {
        id: 2,
        departure: "Sousse",
        destination: "Tunis",
        driverName: "Sami Trabelsi",
        driverRating: 4.8,
        seats: 3,
        price: 20,
        departureTime: "14:15",
        departureDate: "2024-12-23",
        rules: [
            { type: "no_smoking", description: "No smoking" },
            { type: "music", description: "Music preferences discussed before trip" }
        ]
    },
    {
        id: 3,
        departure: "Nabeul",
        destination: "Hammamet",
        driverName: "Amira Ben Said",
        driverRating: 4.2,
        seats: 2,
        price: 15,
        departureTime: "12:00",
        departureDate: "2024-12-23",
        rules: [
            { type: "pets_allowed", description: "Pets allowed" },
            { type: "luggage", description: "Small luggage only" }
        ]
    },
    {
        id: 5,
        departure: "Tunis",
        destination: "Bizerte",
        driverName: "Faten Laarbi",
        driverRating: 4.6,
        seats: 3,
        price: 18,
        departureTime: "10:00", // Added departure time
         departureDate: "2024-12-23",
        rules: [
          {
            type: "no_smoking",
            description: "No smoking"
          },
          {
            type: "music",
            description: "Driver prefers quiet rides"
          }
        ]
      },
      {
        id: 6,
        departure: "Monastir",
        destination: "Mahdia",
        driverName: "Mohamed Bouazizi",
        driverRating: 4.7,
        seats: 4,
        price: 22,
        departureTime: "07:15", // Added departure time
         departureDate: "2024-12-23",
        rules: [
          {
            type: "no_smoking",
            description: "No smoking"
          },
          {
            type: "no_pets",
            description: "No pets allowed"
          }
        ]
      },
      {
        id: 7,
        departure: "Sousse",
        destination: "Monastir",
        driverName: "Rania Mezghani",
        driverRating: 4.3,
        seats: 2,
        price: 10,
        departureTime: "18:30", // Added departure time
         departureDate: "2024-12-23",
        rules: [
          {
            type: "music",
            description: "Music preferences discussed before trip"
          },
          {
            type: "pets_allowed",
            description: "Small pets allowed"
          }
        ]
      },
      {
        id: 8,
        departure: "Gabes",
        destination: "Mednine",
        driverName: "Khaled Jaziri",
        driverRating: 4.8,
        seats: 5,
        price: 35,
        departureTime: "15:00", // Added departure time
         departureDate: "2024-08-04",
        rules: [
          {
            type: "no_pets",
            description: "No pets allowed"
          },
          {
            type: "luggage",
            description: "Maximum 2 suitcases per person"
          }
        ]
      },
      {
        id: 9,
        departure: "Tunis",
        destination: "Beja",
        driverName: "Anis Haddad",
        driverRating: 4.1,
        seats: 3,
        price: 17,
        departureTime: "11:00", // Added departure time
         departureDate: "2024-10-24",
        rules: [
          {
            type: "no_smoking",
            description: "No smoking"
          },
          {
            type: "luggage",
            description: "Limited luggage space"
          }
        ]
      },
      {
        id: 10,
        departure: "Kairouan",
        destination: "Tunis",
        driverName: "Salma Hedi",
        driverRating: 4.4,
        seats: 4,
        price: 27,
        departureTime: "08:15", // Added departure time
         departureDate: "2024-11-23",
        rules: [
          {
            type: "no_smoking",
            description: "No smoking"
          },
          {
            type: "music",
            description: "Soft music allowed during the trip"
          }
        ]
      }
];
