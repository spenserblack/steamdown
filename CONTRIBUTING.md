# Contributing

First, you will need to install [yarn].

## Updating steamdown

Go into [`packages/steamdown`](./packages/steamdown) to updating parsing and
outputs.

After making your changes, make sure to run tests with `yarn test`. This project
uses Jest snapshots, which can be read about
[here](https://jestjs.io/docs/snapshot-testing). You can update snapshots with
`yarn test -u`.

[yarn]: https://yarnpkg.com/
