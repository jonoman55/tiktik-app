import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

import { footerList1, footerList2 } from '../utils/constants';

interface IProps {
    items: string[];
    mt: Boolean;
};

const List = ({ items, mt }: IProps) => (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
        {items.map((item: string, index: number) => (
            <p key={index} className='text-gray-400 text-sm hover:underline cursor-pointer'>
                {item}
            </p>
        ))}
    </div>
);

const Footer: NextPage = () => (
    <div className='mt-6 hidden xl:block'>
        <List items={footerList1} mt={false} />
        <List items={footerList2} mt />
        <Link href='https://github.com/jonoman55'>
            <a className='flex mt-5 text-gray-400 text-sm hover:underline cursor-pointer' target='_blank' rel='noreferrer'>
                © {new Date().getFullYear()} TikTik - JC Dev
            </a>
        </Link>
    </div>
);

export default Footer;
