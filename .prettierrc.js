module.exports = {
  ...require("@newceptiondev/prettier-config"),
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
      },
    },
  ],
}
