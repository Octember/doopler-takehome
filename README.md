# Doopler

Doopler is a non-functioning, sort-of-look-a-like, Doppler Node application. It's used for the take-home exercise for the Growth Engineer interview process.

## Getting Started

```
npm install

cd server
npm install

cd ../frontend
npm install

cd ..
npm start
```

## Frontend

The frontend is a very simple React application, written in Typescript. It has two main pages, a Secrets page and a Members page. Neither page actually functions - you can neither add secrets, nor add members.

### Analytics

The frontend app is able to record user events via the `anlytics` module. This will make a request to server and record it in the SQLite database included. Use this to track user events in your A/B testing experiments.

```js
import analytics from '../lib/analytics';

analytics.track('Page.Viewed');
```

### Context

A context can be used in components to get information about the "request". The only thing present currently is a generated User ID.

```js
import {Context, getContext} from '../lib/context';

const ctx: Context = getContext();
ctx.userId;
```

## Backend

The backend is an Express API used to collect analytics events and nothing else. It has one endpoint:

```http
POST /events
Content-Type: application/json

{ "name": "Event.Name" }
```

### analytics.sqlite

A SQLite database is already included, with a table called `events` already created.
