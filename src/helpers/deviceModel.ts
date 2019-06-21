import { DeviceModel } from "../types/models";

export function formatDeviceModel(deviceModel: DeviceModel): string {
  return `RR: ${deviceModel.hardwareRevision} | MM: ${deviceModel.modelNumber} | CCCC: ${deviceModel.colorNumber}`;
}
