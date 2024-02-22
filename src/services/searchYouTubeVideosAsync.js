import youtube from './youtubeClient.js';

async function searchYouTubeVideosAsync(query) {
  const response = await youtube.search.list({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: 5,
  }).catch(err => console.error('error retrieving a list of videos', err));

  const videos = response.data.items.map(item => ({
    title: item.snippet.title,
    videoId: item.id.videoId,
    likeCount: item.statistics ? item.statistics.likeCount : 0,
  }));

  const mostLikedVideo = videos.reduce((prev, curr) => (
    prev.likeCount > curr.likeCount ? prev : curr
  ));

  const videoUrl = `https://www.youtube.com/watch?v=${mostLikedVideo.videoId}`;

  return videoUrl;
}

export default searchYouTubeVideosAsync;