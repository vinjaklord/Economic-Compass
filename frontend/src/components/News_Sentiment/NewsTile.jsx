/* eslint-disable react/prop-types */
const NewsTile = ({ title, url, time_Published, summary }) => {
  const formattedTime = new Date(time_Published).toLocaleString(); // Format the time

  return (
    <div className="news-tile">
      <h2>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h2>
      <p>
        <strong>Published:</strong> {formattedTime}
      </p>
      <p>{summary}</p>
    </div>
  );
};

export default NewsTile;
