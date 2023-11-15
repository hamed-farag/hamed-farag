import fs from "fs";
import path from "path";

export function findFilesWithExtension(
  directoryPath: string,
  fileExtension: string
) {
  try {
    const files = fs.readdirSync(directoryPath);

    const filePaths: Array<string> = files.reduce<Array<string>>(
      (accumulator, file) => {
        const filePath = path.join(directoryPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
          const subDirectoryFiles = findFilesWithExtension(
            filePath,
            fileExtension
          );
          return accumulator.concat(subDirectoryFiles);
        }

        if (path.extname(file) === fileExtension) {
          accumulator.push(filePath);
        }

        return accumulator;
      },
      []
    );

    return filePaths;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export function findFilesByName(directoryPath: string, fileName: string) {
  try {
    const files = fs.readdirSync(directoryPath);

    const filePaths: Array<string> = files.reduce<Array<string>>(
      (accumulator, file) => {
        const filePath = path.join(directoryPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
          const subDirectoryFiles = findFilesByName(filePath, fileName);
          return accumulator.concat(subDirectoryFiles);
        }

        if (file === fileName) {
          accumulator.push(filePath);
        }

        return accumulator;
      },
      []
    );

    return filePaths;
  } catch (err) {
    console.log(err);
    return [];
  }
}
