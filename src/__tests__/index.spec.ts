import {hotReddit, bestReddit, hotYCombinator} from '..';

describe('hotReddit', () => {
  it('gives higher rating to never content', async () => {
    const ts = Date.now();
    const score1 = hotReddit(10, 2, ts - 10000);
    const score2 = hotReddit(10, 2, ts);

    expect(score2).toBeGreaterThan(score1);
  });

  it('gives higher rating to content with more up votes', async () => {
    const ts = Date.now();
    const score1 = hotReddit(12, 2, ts);
    const score2 = hotReddit(10, 2, ts);

    expect(score1).toBeGreaterThan(score2);
  });

  it('gives higher rating to content with less down votes', async () => {
    const ts = Date.now();
    const score1 = hotReddit(12, 2, ts);
    const score2 = hotReddit(12, 1, ts);

    expect(score2).toBeGreaterThan(score1);
  });

  it('gives higher rating to content with more up votes - 2', async () => {
    const ts = Date.now();
    const score1 = hotReddit(1, 0, ts);
    const score2 = hotReddit(2, 0, ts);

    expect(score2).toBeGreaterThan(score1);
  });
});

describe('bestReddit', () => {
  it('gives higher score to content with more up votes', async () => {
    const score1 = bestReddit(11, 2);
    const score2 = bestReddit(10, 2);

    expect(score1).toBeGreaterThan(score2);
  });

  it('gives higher score to content with less down votes', async () => {
    const score1 = bestReddit(1000, 10);
    const score2 = bestReddit(1000, 11);

    expect(score1).toBeGreaterThan(score2);
  });
});

describe('hotYCombinator', () => {
  it('gives higher score to more recent content', async () => {
    const ts = Date.now();
    const score1 = hotYCombinator(10, ts);
    const score2 = hotYCombinator(10, ts - 10000);

    expect(score1).toBeGreaterThan(score2);
  });

  it('gives higher score to content with more up votes', async () => {
    const ts = Date.now();
    const score1 = hotYCombinator(110, ts);
    const score2 = hotYCombinator(111, ts);

    expect(score2).toBeGreaterThan(score1);
  });

  it('gives higher score to content with more up votes - 2', async () => {
    const ts = Date.now();
    const score1 = hotYCombinator(0, ts);
    const score2 = hotYCombinator(111, ts);

    expect(score2).toBeGreaterThan(score1);
  });

  it('gives higher score to content with more up votes - 3', async () => {
    const ts = Date.now();
    const score1 = hotYCombinator(1, ts);
    const score2 = hotYCombinator(111, ts);

    expect(score2).toBeGreaterThan(score1);
  });
});
