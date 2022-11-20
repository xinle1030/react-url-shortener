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
    required: false,
  },
  // data associations using references
  // each url has an array of visit info
  visits: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "VisitInfo"
    }]
});

export default mongoose.model('Url', UrlSchema);