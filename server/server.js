// Scott Angelinetta
const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const noCache = require("./middleware/noCache").noCache;
const nodeFetch = require("node-fetch");

const main = (serverStartedCallback) => {
  const ENVIRONMENT = process.env.NODE_ENV;

  console.log("Running as " + ENVIRONMENT);

  if (ENVIRONMENT !== "development" && ENVIRONMENT !== "production") {
    throw new Error("ENV must be development OR production.");
  }

  const PORT = process.env.PORT || "3001";

  // const RELATIVE_BUILD_DIRECTORY = ENVIRONMENT === "development" ? "../client/" : "../client";
  const RELATIVE_BUILD_DIRECTORY = "../build";
  const CLIENT_DIRECTORY = path.join(__dirname, RELATIVE_BUILD_DIRECTORY);

  let app = express();
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // Compresses payloads with gzip before sending
  app.use(compression());

  // build directory the root
  // build/picture.jpg -> /picture.jpg
  app.use("", express.static(CLIENT_DIRECTORY));

  // Default url serves index.html
  app.get("/", (req, res, next) => {
    res.sendFile(path.join(CLIENT_DIRECTORY, "index.html"));
  });

  // Using headers tell browser not to cache API results
  app.use("/api/*", noCache());

  // Get flickr images using query
  app.get("/api/search", async (req, res) => {
    const { query: queryArg } = req.query;
    if (typeof queryArg !== "string" || queryArg.length > 100) {
      res.status(400).send();
      return;
    }
    try {
      // The API ignores spaces and concatenates words together
      // For example, "cat dog" becomes "catdog"
      // For this reason spaces are replaced with commas to indicate separate tags
      // An image must have all tags to show as per the default rule for the tagmode parameter
      const query = queryArg.replace(/ /g, ",");
      const response = await nodeFetch(
        `https://www.flickr.com/services/feeds/photos_public.gne?nojsoncallback=1&format=json&tags=${encodeURIComponent(
          query
        )}`,
        {
          method: "get",
        }
      );
      if (!response.ok) {
        throw new Error("Request failed: " + response.status);
      }
      const results = await response.json();
      res.send(results);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  });

  app.use("/api/alive", (req, res) => {
    res.status(200).send("alive");
  });

  // Open the server
  app.listen(PORT, function () {
    console.log("HTTP Server up and listening on " + PORT);
    if (serverStartedCallback) {
      serverStartedCallback();
    }
  });
};
try {
  main();
} catch (e) {
  // Log the error before exiting
  console.error(e);
  process.exit(1);
}
