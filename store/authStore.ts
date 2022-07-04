// DOCS : https://github.com/pmndrs/zustand
import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

import { BASE_URL } from '../utils';

import { IUser } from '../types';

interface IAuthState {
    userProfile: IUser | null;
    allUsers: IUser[];
    addUser: (user: IUser) => void;
    removeUser: () => void;
    fetchAllUsers: () => Promise<void>; 
};

const authStore = (set: any) => ({
    userProfile: null,
    allUsers: [],
    addUser: (user: IUser) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),
    fetchAllUsers: async () => {
        const { data } = await axios.get(`${BASE_URL}/api/users`);
        set({ allUsers: data });
    },
});

const useAuthStore = create((persist<IAuthState>(authStore, {
    name: 'auth'
})));

export default useAuthStore;
