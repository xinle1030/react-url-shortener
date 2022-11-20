import mongoose from 'mongoose';

const VisitInfoSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url'
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  location: {
    type: Object
  },
  timestamp: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model('VisitInfo', VisitInfoSchema);