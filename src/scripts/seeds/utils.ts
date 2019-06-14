import * as path from "path";
import * as fs from "fs";

export function writeSeedsToFile(
  serializedSeed: string,
  basePath: string,
  filePath: string
) {
  const fullPath = path.normalize(`${basePath}/${filePath}`);

  fs.writeFile(fullPath, serializedSeed, err => {
    if (err) {
      return console.log(err);
    }

    console.log(`Seeded file at ${filePath}`);
  });
}
