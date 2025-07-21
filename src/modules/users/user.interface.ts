export interface User {
  id: number;
  name: string;
  email: string;
  state: 'available' | 'unavailable';
  password: string;
}
