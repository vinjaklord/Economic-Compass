import { useState, useEffect } from 'react';
import { fetchAPI } from '../../utils/index.js';
import moment from 'moment-timezone';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the user's time zone from localStorage (default to 'UTC' if not found)
  const userTimeZone = localStorage.getItem('lh_member')
    ? JSON.parse(localStorage.getItem('lh_member')).timeZone || 'UTC'
    : 'UTC';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetchAPI({
          url: 'news',
          method: 'get',
        });

        const newsItems = response.data[0]?.feed;
        setNews(newsItems);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error);
        setError('Failed to fetch news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Convert news times based on user's selected time zone
  const convertToUserTimeZone = (time) => {
    return moment.utc(time).tz(userTimeZone).format('YYYY/MM/DD HH:mm');
  };

  // Limit the number of news entries to 12
  const limitedNews = news.slice(0, 12);

  return (
    <div className="news-container">
      <div className="news-title">Top News - Last Hour</div>
      {loading && <p>Loading news...</p>}
      {error && <p>{error}</p>}
      <table className="news-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Summary</th>
            <th>Published Time</th>
          </tr>
        </thead>
        <tbody>
          {limitedNews.map((newsItem, index) => (
            <tr key={index}>
              <td>
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {newsItem.title}
                </a>
              </td>
              <td>{newsItem.summary}</td>
              <td>{convertToUserTimeZone(newsItem.time_published)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default News;
