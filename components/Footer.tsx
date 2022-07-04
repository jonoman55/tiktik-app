import React from 'react';
import type { NextPage } from 'next';

import { footerList1, footerList2, footerList3 } from '../utils/constants';

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
        <List items={footerList3} mt />
        <p className='text-gray-400 text-sm mt-5'>© 2022 TikTik</p>
    </div>
);

export default Footer;
