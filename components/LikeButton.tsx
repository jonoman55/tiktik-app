import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import { MdFavorite } from 'react-icons/md';

import useAuthStore from '../store/authStore';

interface IProps {
    likes: any;
    flex: string;
    handleLike: () => void;
    handleDislike: () => void;
};

const LikeButton: NextPage<IProps> = ({ likes, flex, handleLike, handleDislike }) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    const { userProfile }: any = useAuthStore();

    const filterLikes = useMemo(() =>
        likes?.filter((item: any) =>
            item._ref === userProfile?._id
        ),
        [likes, userProfile?._id]
    );

    const fetchLikes = useCallback(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true);
        } else {
            setAlreadyLiked(false);
        }
    }, [filterLikes]);

    useEffect(() => {
        fetchLikes();
    }, [fetchLikes, likes]);

    return (
        <div className={`${flex} gap-6`}>
            <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
                {alreadyLiked ? (
                    <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]' onClick={handleDislike} >
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                ) : (
                    <div className='bg-primary rounded-full p-2 md:p-4' onClick={handleLike} >
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                )}
                <p className='text-md font-semibold'>{likes?.length || 0}</p>
            </div>
        </div>
    );
};

export default LikeButton;
