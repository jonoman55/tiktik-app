import React from 'react';
import Head from 'next/head';

interface IProps {
    title: string;
    children?: React.ReactNode | JSX.Element | JSX.Element[];
};

const MetaData = (props: IProps) => (
    <Head>
        <title>{props.title}</title>
        {props.children}
    </Head>
);

export default MetaData;
