import React, { createContext, useState } from 'react';
import AuthStorage from '../utils/authStorage';

const AuthStorageContext = createContext<AuthStorage | null>(null);

const AuthStorageProvider = ({ children }: { children: React.ReactNode }) => {

    const authStorage = new AuthStorage();

    return (
        <AuthStorageContext.Provider value={authStorage}>
            {children}
        </AuthStorageContext.Provider>
    );
};


export { AuthStorageContext, AuthStorageProvider };