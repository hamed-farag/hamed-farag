import fs from "fs";
import path from "path";

export function fromDir(startPath: string, filter: string) {
  const postNames: Array<string> = [];

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.endsWith(filter)) {
      postNames.push(filename);
    }
  }

  return postNames;
}
