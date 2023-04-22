import { createContext } from 'react';
import AuthStorage from '@utils/authStorage';

export const AuthStorageContext = createContext<AuthStorage | null>(null);
