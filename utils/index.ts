import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { IGoogleUser, ISanityUser } from '../types';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Create or Get User from Sanity
 * @param response Credential Response
 * @param addUser Add User to Sanity Function
 */
export const createOrGetUser = async (response: any, addUser: any) => {
    // decode google user
    const decoded: IGoogleUser = jwtDecode(response.credential);
    // destructure google user props
    const { name, picture, sub } = decoded;
    // create sanity user to store
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
export const capitalizeFirstLetter = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
};
