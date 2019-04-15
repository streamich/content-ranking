# content-ranking

Content ranking formulas.

- `hotReddit` &mdash; Reddit's *"hot"* content ranking formula.
- `hotYCombinator` &mdash; YCombinator's *"hot"* content ranking formula.
- `bestReddit` &mdash; Reddit's *"best"* content ranking formula.
- `controversialReddit` &mdash; Reddit's *"controversial"* content ranking formula.


## Usage

```shell
npm i content-ranking
```

then

```js
import {hotReddit, hotYCombinator, bestReddit, controversialReddit} from 'content-ranking';

hotReddit(ups, dows, createdTimeInMilliseconds);
hotYCombinator(ups, createdTimeInMilliseconds);
bestReddit(ups, dows);
controversialReddit(ups, dows);
```


## License

[Unlicense](LICENSE) &mdash; public domain.
