import { useState, useEffect } from "react";
import { fetchAPI } from "../../utils/index.js";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetchAPI({
          url: "news",
          method: "get",
        });

        const newsItems = response.data[0]?.feed;
        setNews(newsItems);
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setError("Failed to fetch news. Please try again later.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
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
          {news.map((newsItem, index) => (
            <tr key={index}>
              <td>
                <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                  {newsItem.title}
                </a>
              </td>
              <td>{newsItem.summary}</td>
              <td>{new Date(newsItem.time_published.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6")).toLocaleString()}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default News;
