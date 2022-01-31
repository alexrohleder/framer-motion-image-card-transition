module.exports = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/post/lost-in-tokyo",
        permanent: true,
      },
    ];
  },
};
