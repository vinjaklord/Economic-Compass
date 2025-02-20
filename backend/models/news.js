import mongoose from 'mongoose';

const economicsSchema = new mongoose.Schema(
  {
    title: String,
    country: String,
    date: String,
    impact: String,
    forecast: String,
    previous: String,
  },
  { strict: false }
);

const newsSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    time_published: String,
    authors: [String],
    summary: String,
    banner_image: String,
    source: String,
    category_within_source: String,
    source_domain: String,
    topics: [
      {
        topic: String,
        relevance_score: String,
      },
    ],
    overall_sentiment_score: Number,
    overall_sentiment_label: String,
    ticker_sentiment: [
      {
        ticker: String,
        relevance_score: String,
        ticker_sentiment_score: String,
        ticker_sentiment_label: String,
      },
    ],
  },
  { strict: false }
);

export const News = mongoose.model('News', newsSchema);
export const Economics = mongoose.model('Economics', economicsSchema);
