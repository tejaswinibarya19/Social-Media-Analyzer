
// text ko sentences mein break karta hai.
function tokenizeSentences(text) {
  // very basic sentence split
  return text
    .replace(/\r\n/g, '\n')
    .split(/[.?!\n]+/)
    .map(s => s.trim())
    .filter(Boolean);
}

//sentence me words count than computes avg
function avgSentenceLength(sentences) {
  if (!sentences.length) return 0;
  const wordCounts = sentences.map(s => s.split(/\s+/).filter(Boolean).length);
  return wordCounts.reduce((a,b) => a+b, 0) / wordCounts.length;
}

function extractHashtagsCandidates(text) {
  //  words length>3 and frequency
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const freq = {};
  words.forEach(w => freq[w] = (freq[w] || 0) + 1);
  const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,10); //top 10 frequent words
  return sorted.map(([w]) => '#' + w);
}

//checks call to action 
function containsCTA(text) {
  const ctas = ['buy', 'subscribe', 'click', 'learn', 'download', 'sign up', 'join', 'follow', 'shop'];
  const lower = text.toLowerCase();
  return ctas.some(c => lower.includes(c));
}

function analyzeText(text) {
  const trimmed = (text || '').trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const sentences = tokenizeSentences(trimmed);

  const wordCount = words.length;
  const sentenceCount = sentences.length;
  const avgSentLen = Math.round(avgSentenceLength(sentences) * 10) / 10;

  const suggestions = [];
  if (avgSentLen > 20) suggestions.push('Average sentence length is high — consider splitting long sentences.');
  if (!containsCTA(trimmed)) suggestions.push('No strong call-to-action detected — consider adding "subscribe", "learn", "click", etc.');
  if (wordCount < 20) suggestions.push('Post is short — consider adding more context for higher engagement.');
  if (wordCount > 400) suggestions.push('Post is very long — consider shortening for social platforms.');

  const hashtagCandidates = extractHashtagsCandidates(trimmed).slice(0,5);

  return {
    wordCount,
    sentenceCount,
    avgSentenceLength: avgSentLen,
    hasCTA: containsCTA(trimmed),
    hashtagSuggestions: hashtagCandidates,
    suggestions
  };
}

module.exports = { analyzeText };
