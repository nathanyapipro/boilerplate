import faker from "faker";
import { ById } from "../../types/index";
import { Firmware } from "../../types/models";

export default function generateFirmware(): ById<Firmware> {
  return {
    "1": {
      id: 1,
      description: "LED UI Update",
      model: "Airgraft001",
      version: "AG0.01.8",
      url: `
https://elasticbeanstalk-ca-central-1-761850581753.s3.ca-central-1.amazonaws.com/cms/app_dfu_package.zip`,
      deleted: false,
      publishedDate: new Date().toISOString(),
      lastModifiedAdminId: 1,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString()
    },
    "2": {
      id: 2,
      description: faker.lorem.words(),
      model: "Airgraft001",
      version: "AG0.01.3",
      url: `
https://s3.ca-central-1.amazonaws.com/elasticbeanstalk-ca-central-1-761850581753/airgraft_dfu_AG0.01.3.zip`,
      deleted: false,
      publishedDate: new Date().toISOString(),
      lastModifiedAdminId: 1,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString()
    }
  };
}
