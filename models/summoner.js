var mongoose = require('mongoose');

var summonerSchema = new mongoose.Schema({
  userId: { type: String, unique: true, index: true },
  summonerName: String,
  summonerId: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  reports: { type: Number, default: 0 }});

module.exports = mongoose.model('Summoner', summonerSchema);