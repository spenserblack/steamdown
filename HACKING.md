# Hacking

How to develop for this project.

## Testing

```shell
pnpm run -w test
```

## Formatting

```shell
pnpm run -w format
```

## Linting

```shell
pnpm run -w lint
# or
pnpm run -w lint-fix
```

## Building

```shell
pnpm run -w build
```

## Publishing

```shell
# NOTE: This should happen automatically when creating a GitHub Release
pnpm publish --recursive --access public
```
