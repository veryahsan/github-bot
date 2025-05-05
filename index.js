import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const git = simpleGit();
const FILE_PATH = "./data.json";

const makeCommit = async (n) => {
  if (n === 0) {
    console.log("All commits done. Pushing to GitHub...");
    await git.push();
    return;
  }

  const yearOffset = Math.random() < 0.5 ? 1 : 2; // Randomly pick 2023 or 2024
  const x = Math.floor(Math.random() * 55); // Weeks
  const y = Math.floor(Math.random() * 7); // Days

  const DATE = moment()
    .subtract(yearOffset, "years")
    .add(x, "weeks")
    .add(y, "days")
    .format();

  const data = { date: DATE };
  console.log(`Committing: ${DATE}`);

  jsonfile.writeFile(FILE_PATH, data, async () => {
    await git.add([FILE_PATH]);
    await git.commit(DATE, { "--date": DATE });
    makeCommit(n - 1);
  });
};

makeCommit(100);
