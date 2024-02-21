// youtubeClient.js
// This file creates a YouTube client. 
// It's not specific to any part of the application and could be used
//  by different parts of the application
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY, // Use your YouTube API key here
});
export default youtube;
