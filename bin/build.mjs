#!/usr/bin/env zx

import { editPackageJson } from "daproj/node/package-json/edit.mjs";
import { defaultBuild } from "daproj/zx/build.mjs";

const { outDir } = await defaultBuild();

echo`Editing package.json ...`;
await editPackageJson(
  {
    scripts: null,
    devDependencies: null,
    main: "index.js",
    files: [
      "*",
    ],
    types: `${outDir}/index.d.ts`,
    exports: async () => {
      const exports = {};
      const files = await glob(`${outDir}/**/index.js`);

      for (const file of files) {
        const folder = file
          .split("/")
          .slice(2, -1)
          .join("/");
        const begin = folder
          ? "./"
          : ".";
        let key = begin + folder;
        let value = begin + folder + "/index.js";

        exports[key] = value;
      }

      exports["./*"] = "./*.js";

      return exports;
    },
  },
  `${outDir}/package.json`,
);
