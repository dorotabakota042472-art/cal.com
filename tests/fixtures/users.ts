const timestamp = Date.now(); // уникальное число для каждого запуска
export type User = {
  email: string;
  password: string;
  username: string;
};

export const users: Record<string, User> = {
  admin: {
    email: `janvandam${timestamp}@gmail.com`,
    password: 'Aa80502558314', 
    username: `string_${timestamp}`,
  },
  user1: {
    email: 'user1@example.com',
    password: 'Password123',
    username: `string_${timestamp}`,
  },
};
