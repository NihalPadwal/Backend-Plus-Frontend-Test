// Define a type for a single provider
interface CustomProvider {
  id: string;
  name: string;
  type: string;
  // Add other properties based on the providers you expect
}

// Define a type for the providers returned by getProviders
export interface CustomProviders {
  [key: string]: CustomProvider;
}
