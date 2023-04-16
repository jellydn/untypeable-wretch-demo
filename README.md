<h1 align="center">Welcome to untypeable-wretch-demo 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
</p>

## 🏠 [Homepage](https://github.com/jellydn/next-app-starter)

### ✨ [Demo](https://untypeable-demo.productsway.com/)

In this demo project, we demonstrate how to use Untypeable in conjunction with the Wretch library to make API requests to JsonPlaceholder and display the retrieved data on a webpage.

![https://gyazo.com/7c47e1e4e0fb1851f737c33d0bb09b6b.gif](https://gyazo.com/7c47e1e4e0fb1851f737c33d0bb09b6b.gif)

## Why Untypeable

> One of the key benefits of Untypeable is that it provides a zero-bundle size option. This means that you can use Untypeable to generate type-safe API clients without adding any additional bundle size to your application. This can help to improve the performance and load times of your application.

```typescript
import { createTypeLevelClient, initUntypeable } from "untypeable";
import wretch from "wretch";

const u = initUntypeable();

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// Create a router
const fetcherRouter = u.router({
  "/posts": u
    .input<{
      userId?: number;
    }>()
    .output<Post[]>(),
});

const BASE_URL = "https://jsonplaceholder.typicode.com";

const externalApi = wretch(BASE_URL, { mode: "cors" }).errorType("json");

export const fetcher = createTypeLevelClient<typeof fetcherRouter>(
  async (path, input) => {
    const res = externalApi.get(`${path}?${new URLSearchParams(input)}`);
    return res.json();
  }
);
```

## Why Wretch

Write something like this

```typescript
wretch("anything")
  .get()
  .notFound(error => { /* ... */ })
  .unauthorized(error => { /* ... */ })
  .error(418, error => { /* ... */ })
  .res(response => /* ... */)
  .catch(error => { /* uncaught errors */ })
```

instead of

```typescript
fetch("anything")
  .then(response => {
    if(!response.ok) {
      if(response.status === 404) throw new Error("Not found")
      else if(response.status === 401) throw new Error("Unauthorized")
      else if(response.status === 418) throw new Error("I'm a teapot !")
      else throw new Error("Other error")
    }
    else // ...
  })
  .then(data => /* ... */)
  .catch(error => { /* ... */ })
```

Pretty neat,right? 😍

## Built with

- [jellydn/new-web-app: Frontend app generator, built on top vitejs](https://github.com/jellydn/new-web-app)
- [preactjs/signals: Manage state with style in every framework](https://github.com/preactjs/signals)
- [elbywan/wretch: A tiny wrapper built around fetch with an intuitive syntax.](https://github.com/elbywan/wretch)
- [emilkowalski/sonner: An opinionated toast component for React.](https://github.com/emilkowalski/sonner)
- [total-typescript/untypeable: Get type-safe access to any API, with a zero-bundle size option.](https://github.com/total-typescript/untypeable)
- [total-typescript/ts-reset: A 'CSS reset' for TypeScript, improving types for common JavaScript API's](https://github.com/total-typescript/ts-reset)

## Install

```sh
yarn install
```

## Usage

```sh
yarn dev
```

## Author

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Show your support

[![kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/dunghd)
[![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/dunghd)
[![buymeacoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/dunghd)

Give a ⭐️ if this project helped you!
