module.exports = {
  packagerConfig: {
    asar: true,
    icon: "assets/RecipeLibraryIcon",
    executableName: "recipe-library",
    ignore: [
      /node_modules$/,
      /src$/,
      /\.angular$/,
      /\.git$/,
      /\.github$/,
      /\.idea$/,
      /\.vscode$/,
      /coverage$/,
      /cypress$/,
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: "assets/RecipeLibraryIcon.ico",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "assets/RecipeLibraryIcon.png",
          homepage: "https://newception.dev",
          name: "recipe-library",
          productName: "Recipe Library",
          maintainer: "Julius Schmidt",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "assets/RecipeLibraryIcon.icns",
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "newceptiondev",
          name: "recipelibrary",
        },
      },
      draft: true,
    },
  ],
}
