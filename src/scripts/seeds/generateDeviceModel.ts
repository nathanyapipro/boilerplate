import faker from "faker";
import { ById } from "../../types/index";
import { DeviceModel } from "../../types/models";

export default function generateFirmware(): ById<DeviceModel> {
  return {
    "1": {
      id: 1,
      modelNumber: "01",
      hardwareRevision: "00",
      colorNumber: "0000",
      imageUrl:
        "https://elasticbeanstalk-ca-central-1-761850581753.s3.ca-central-1.amazonaws.com/device/model/animation%20for%20app_bk.2049.png",
      lastModifiedAdminId: 1,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString()
    },
    "2": {
      id: 2,
      modelNumber: "01",
      hardwareRevision: "00",
      colorNumber: "0001",
      imageUrl:
        "https://elasticbeanstalk-ca-central-1-761850581753.s3.ca-central-1.amazonaws.com/device/model/animation%20for%20app_WH.2048%20%281%29.png",
      lastModifiedAdminId: 1,
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString()
    }
  };
}
