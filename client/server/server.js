import express from "express";
import fs from "fs"
import path from "path";
import React from "react";
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from "../src/App";

const app = express();

const routes = ["^/$", "/login", "/register"]

app.get(routes, (req, res) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if(err) {
      console.err(err)
      return res.status(500).send("Internal Server Error")
    }

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    )

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    )
  })
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});