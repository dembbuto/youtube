import React from 'react'
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

export default function RelatedVideos() {
  const { youtube } = useYoutubeApi();
  const queryKey = ['videos'];
  const queryFn = () => {
    return youtube.search();
  };
  const { isLoading, error, data: videos } = useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😖</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} type='list' />
          ))}
        </ul>
      )}
    </>
  )
}
