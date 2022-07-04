import React from 'react';
import Head from 'next/head';

interface IProps {
    title: string;
    children?: React.ReactNode | JSX.Element | JSX.Element[];
};

/**
 * Creates the NextJS Head component for a given page
 * @param props title of the page and HTML child tags (meta and link)
 * @returns JSX Element
 */
const MetaData = (props: IProps) => (
    <Head>
        <title>{props.title}</title>
        {props.children}
    </Head>
);

export default MetaData;
