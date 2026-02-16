import axios from 'axios';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed?.length === 0)
    return <h1 className="text-center text-2xl">No new users found!</h1>;
  return (
    feed && (
    <div className='flex justify-center'>
      <UserCard user={feed[0]} />
    </div>
  )
  )
}

export default Feed
