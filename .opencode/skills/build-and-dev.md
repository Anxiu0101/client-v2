---
name: build-and-dev
description: Build, develop, lint, and format the Anxiu Online project
---

## Build, Dev & Lint Workflows

### Development

```bash
yarn dev
```
Starts Next.js dev server at `http://localhost:3000`.

### Production Build

```bash
yarn build
```
Runs Velite content generation then Next.js production build.

### Generate Content Only

```bash
yarn gen
# or
yarn content:gen
```
Runs Velite without a full build. Useful for validating content schemas.

### Clean Build Content

```bash
yarn content:build
```
Force-clean and rebuild Velite content with verbose output.

### Lint

```bash
yarn lint
```
Runs ESLint 9 with `eslint-config-next` rules.

### Auto-fix

```bash
yarn format
```
Runs `eslint --fix` to auto-correct issues.

### Start Production Server

```bash
yarn start
```
Starts the production Next.js server (after `yarn build`).
