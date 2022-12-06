import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  urlId: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
  title: {
    type: String,
    default: "",
  },
  // data associations using references
  // each url has an array of metrics
  metrics: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Metric"
    }]
});

export default mongoose.model('Url', UrlSchema);