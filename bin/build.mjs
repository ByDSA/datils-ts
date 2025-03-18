#!/usr/bin/env zx

$.verbose = true;

const outDir = "./build";

await $`rm -rf ${outDir}`;
await $`tsc -p tsconfig-build.json`;
await $`cp package.json pnpm-lock.yaml ${outDir}`;

echo`Editing package.json ...`;
await editPackageJson( {
  scripts: null,
  devDependencies: null,
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
} );

async function editPackageJson(obj) {
  const pkg = JSON.parse(await fs.readFile(`./${outDir}/package.json`, "utf8"));

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null)
      delete pkg[key];

    if (typeof value === "function")
      pkg[key] = await value(pkg.key);
  }

  await fs.writeFile(`./${outDir}/package.json`, JSON.stringify(pkg, null, 2));
}
