import axios from 'axios';

import { IGoogleUser, ISanityUser } from '../types';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Create or Get User from Sanity
 * @param response HTTP Response
 * @param addUser Add User to Sanity Function
 */
export const createOrGetUser = async (response: any, addUser: any) => {
    // decode google user
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = Buffer.from(base64, 'base64').toString();
    const jsonPayload = decodeURIComponent(decoded.split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    // destructure google user props
    const { name, picture, sub }: IGoogleUser = JSON.parse(jsonPayload);
    // create sanity user object
    const user: ISanityUser = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    };
    // add user to the store
    addUser(user);
    // post user object to sanity
    await axios.post(`${BASE_URL}/api/auth`, user);
};

/**
 * Capitalize the first letter of a string
 * @param input Input String
 * @returns Capitalized String
 */
export const capitalizeFirstLetter = (input: string) =>
    input.charAt(0).toUpperCase() + input.slice(1);
