import faker from "faker";
import { writeSeedsToFile } from "./utils";
import generateUsers from "./generateUser";
import generateDeviceModel from "./generateDeviceModel";
import generateFirmware from "./generateFirmware";

const CONFIG = {
  dstPath: `${__dirname}/../../fixtures`
};

// Generate users
const users = generateUsers();
const serializedUsers = JSON.stringify(users);
writeSeedsToFile(serializedUsers, CONFIG.dstPath, "users.json");

// Generate device models
const deviceModels = generateDeviceModel();
const serializedDeviceModels = JSON.stringify(deviceModels);
writeSeedsToFile(serializedDeviceModels, CONFIG.dstPath, "deviceModels.json");

// Generate firwares
const firmwares = generateFirmware();
const serializedFirmwares = JSON.stringify(firmwares);
writeSeedsToFile(serializedFirmwares, CONFIG.dstPath, "firmwares.json");
