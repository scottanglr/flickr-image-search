/**
 * Middleware which sets headers on the response so that it is not cached
 */
module.exports = {
  noCache: () => {
    return (req, res, next) => {
      res.header(
        "Cache-Control",
        "private, no-cache, no-store, must-revalidate"
      );
      res.header("Expires", "-1");
      res.header("Pragma", "no-cache");
      next();
    };
  },
};
