// TODO : Update BASE_URL env var or create hook/helper function to create base api url
// NOTE : Doc => https://stackoverflow.com/questions/65199051/how-to-get-page-url-or-hostname-in-nextjs-project
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IGoogleUser {
    name: string;
    picture: string;
    sub: string;
};

interface ISanityUser {
    _id: string;
    _type: string;
    userName: string;
    image: string; 
};

export const createOrGetUser = async (response: any, addUser: any) => {
    // decode google user
    const decoded: IGoogleUser = jwtDecode(response.credential);

    // destructure props
    const { name, picture, sub } = decoded;

    // create sanity user object
    const user: ISanityUser = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
    };

    // add user to the store
    addUser(user);

    // post user object to sanity
    await axios.post(`${BASE_URL}/api/auth`, user);
};

// import axios from 'axios';

// export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// interface IGoogleUser {
//     name: string;
//     picture: string;
//     sub: string;
// };

// interface ISanityUser {
//     _id: string;
//     _type: string;
//     userName: string;
//     image: string; 
// };

// export const createOrGetUser = async (response: any, addUser: any) => {
//     // decode google user
//     const base64Url = response.credential.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const decoded = Buffer.from(base64, 'base64').toString();
//     const jsonPayload = decodeURIComponent(decoded.split('').map((c) => {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     // destructure google user props
//     const { name, picture, sub }: IGoogleUser = JSON.parse(jsonPayload);
//     // create sanity user object
//     const user: ISanityUser = {
//         _id: sub,
//         _type: 'user',
//         userName: name,
//         image: picture,
//     };
//     // add user to the store
//     addUser(user);
//     // post user object to sanity
//     await axios.post(`${BASE_URL}/api/auth`, user);
// };
