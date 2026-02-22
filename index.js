import chalk from "chalk";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import {
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
  readFile,
  readFolder,
  statPath,
  updateFile,
} from "./fs.js";

async function fileManager() {
  console.log(`📁 ${chalk.blue("Welcome to FILE MANAGER")}\n`);

  const rl = readline.createInterface({ input, output });

  const ask = (q) => rl.question(chalk.magenta(q));

  const actions = {
    1: async () => {
      const path = await ask("folder path: ");
      await createFolder(path);
      console.log(chalk.green("folder created"));
    },
    2: async () => {
      const path = await ask("folder path: ");
      console.log(chalk.green(await readFolder(path)));
    },
    3: async () => {
      const path = await ask("folder path: ");
      await deleteFolder(path);
      console.log(chalk.green("folder deleted"));
    },
    4: async () => {
      const path = await ask("file path: ");
      const content = await ask("file content: ");
      await createFile(path, content);
      console.log(chalk.green("file created"));
    },
    5: async () => {
      const path = await ask("file path: ");
      console.log(chalk.green(await readFile(path)));
    },
    6: async () => {
      const path = await ask("file path: ");
      const content = await ask("file content: ");
      await updateFile(path, content);
      console.log(chalk.green("file updated"));
    },
    7: async () => {
      const path = await ask("file path: ");
      await deleteFile(path);
      console.log(chalk.green("file deleted"));
    },
    8: async () => {
      const path = await ask("file path: ");
      const stat = await statPath(path);
      console.log(
        chalk.green(
          `data:
  size: ${stat.size}
  createdAt: ${stat.createdAt}
  updatedAt: ${stat.updatedAt}`
        )
      );
    },
  };

  const options = [
    "createFolder",
    "readFolder",
    "deleteFolder",
    "createFile",
    "readFile",
    "updateFile",
    "deleteFile",
    "statPath",
    "exit",
  ];

  options.forEach((v, i) =>
    console.log(`😁 ${chalk.yellow(i + 1)} ${chalk.cyan(v)}`)
  );

  const answer = await ask("What do you want? ");

  if (answer === "9") {
    rl.close();
    return; // stop recursion
  }

  const action = actions[answer];

  try {
    if (action) await action();
    else console.log(chalk.red("Invalid option."));
  } catch (err) {
    console.log(chalk.red("Error:"), err.message);
  }

  rl.close();

  // 👇 THIS is the recursive call
  return fileManager();
}

fileManager();
