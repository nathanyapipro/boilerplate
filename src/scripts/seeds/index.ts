import { writeSeedsToFile } from "./utils";
import generateUsers from "./generateUser";
import faker from "faker";
import generateFirmware from "./generateFirmware";

const CONFIG = {
  dstPath: `${__dirname}/../../fixtures`
};

// Generate users
const users = generateUsers();
const serializedUsers = JSON.stringify(users);
writeSeedsToFile(serializedUsers, CONFIG.dstPath, "users.json");

// Generate submissions
const firmwares = generateFirmware();
const serializedFirmwares = JSON.stringify(firmwares);
writeSeedsToFile(serializedFirmwares, CONFIG.dstPath, "firmwares.json");

// // Generate policies
// const policies = [];
// faker.seed(1234);
// for (let i = 0; i < 30; i++) {
//   policies.push(generatePolicy());
// }
// const serializedPolicies = JSON.stringify(policies);
// writeSeedsToFile(serializedPolicies, CONFIG.dstPath, "policies.json");
