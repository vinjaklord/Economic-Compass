import { useState, useEffect } from 'react';
import { fetchAPI } from '../../utils/index.js';
import moment from 'moment-timezone';
import './News.css';

const News = ({ variant = 'dashboard' }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFullPage = variant === 'page';
  const isDashboard = variant === 'dashboard';

  // Get the user's time zone from localStorage (default to 'UTC' if not found)
  const userTimeZone = localStorage.getItem('lh_member')
    ? JSON.parse(localStorage.getItem('lh_member')).timeZone || 'UTC'
    : 'UTC';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetchAPI({
          url: '/news',
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

  // Limit news to 12 for dashboard, show all for full page
  const displayedNews = isDashboard ? news.slice(0, 12) : news;

  const containerClass = isFullPage ? 'newsPage-container' : 'news-container';
  const title = isFullPage ? 'Top News' : 'Top News - Last Hour';

  return (
    <div className={containerClass}>
      {isFullPage && <div className="page-title">{title}</div>}
      {isDashboard && <div className="news-title">{title}</div>}

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
          {displayedNews.map((newsItem, index) => (
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
