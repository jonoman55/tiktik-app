import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { BASE_URL } from '../utils';
import MetaData from '../utils/meta';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';

import { Video } from '../types';

interface IProps {
    videos: Video[];
};

const capitalizeFirstLetter = (input: string) =>
    input.charAt(0).toUpperCase() + input.slice(1);

const MetaLink = () => (
    <>
        <meta name="description" content="TikTik is a social media site where you can create and share videos with others." />
        <link rel="icon" href="/favicon.ico" />
    </>
);

const Home = ({ videos }: IProps) => {
    const router = useRouter();
    const { topic } = router.query;
    return (
        <>
            <MetaData title={`TikTik ${topic ? `- ${capitalizeFirstLetter(`${topic}`)}` : ''}`}>
                <MetaLink />
            </MetaData>
            <div className='flex flex-col gap-10 videos h-full'>
                {videos.length
                    ? videos?.map((video: Video) =>
                        <VideoCard post={video} isShowingOnHome key={video._id} />
                    ) : (
                        <NoResults text={`No Videos`} />
                    )
                }
            </div>
        </>
    );
};

export default Home;

interface IQuery {
    query: { topic: string };
};

export const getServerSideProps = async ({ query: { topic } }: IQuery) => {
    let response = await axios.get(`${BASE_URL}/api/post`);
    if (topic) {
        response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    }
    return {
        props: {
            videos: response.data
        },
    };
};
