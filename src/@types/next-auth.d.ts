import 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

}
