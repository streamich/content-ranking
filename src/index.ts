/**
 * Reddit's hot content scoring function. Used for raking higher most recent and
 * highest voted content. More recent content items get higher score automatically.
 *
 * - See: https://github.com/reddit-archive/reddit/blob/d990533d0b57a499cefcec70f4c51d8c5593c497/r2/r2/lib/db/_sorts.pyx#L47-L58
 *
 * @param ups Number of up votes.
 * @param downs Number of down votes.
 * @param ts Timestamp in milliseconds when content was created.
 */
export function hotReddit (ups: number, downs: number, ts = Date.now()) {
  const s = ups - downs;
  const order = Math.log(Math.max(Math.abs(s), 1)) / Math.LN10;
  const sign = s > 0 ? 1 : (s < 0 ? -1 : 0);
  const seconds = (ts / 1e3) - 1134028003;
  return sign * order + seconds / 45000;
}

/**
 * YCombinator's hot content scoring formula. Does not require down votes.
 *
 * - See: https://moz.com/blog/reddit-stumbleupon-delicious-and-hacker-news-algorithms-exposed
 *
 * @param ups Number of up votes.
 * @param ts Timestamp when content was created in milliseconds.
 */
export function hotYCombinator (ups: number, ts: number = Date.now()) {
  const hoursSinceCreated = (Date.now() - ts) / (1000 * 60 * 60);
  return ups / Math.pow(hoursSinceCreated + 2, 1.5);
}

/**
 * Reddit's content scoring function for finding best replies regardless of time
 * when content was created. This function does not penalize old content.
 *
 * - See: https://github.com/reddit-archive/reddit/blob/d990533d0b57a499cefcec70f4c51d8c5593c497/r2/r2/lib/db/_sorts.pyx#L70-L85
 *
 * @param ups Number of up votes.
 * @param downs Number of down votes.
 */
export function bestReddit (ups: number, downs: number) {
  const n = ups + downs;
  if (!n) return 0;
  const z = 1.281551565545;
  const p = ups / n;
  const left = p + 1 / (2 * n) * z * z;
  const right = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n));
  const under = 1 + 1 / n * z * z;
  return (left - right) / under;
}

/**
 * Reddit's algorithm for scoring high controversial content.
 *
 * - See: https://github.com/reddit-archive/reddit/blob/d990533d0b57a499cefcec70f4c51d8c5593c497/r2/r2/lib/db/_sorts.pyx#L60-L68
 *
 * @param ups Number of up votes.
 * @param downs Number of down votes.
 */
export function controversialReddit (ups: number, downs: number) {
  if (!ups || !downs) return 0;
  const magnitude = ups + downs;
  const balance = ups > downs ? (downs / ups) : (ups / downs);
  return magnitude ** balance;
}
