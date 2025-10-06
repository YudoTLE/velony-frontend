declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      email?: string;
      phoneNumber?: string;
      profilePictureUrl?: string;
    };
    expiresAt: Date;
  }

  interface User {
    id: string;
    name: string;
    username: string;
    email?: string;
    phoneNumber?: string;
    profilePictureUrl?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub?: string;
  }
}

export {};
