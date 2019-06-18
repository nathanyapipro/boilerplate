interface ModelBase {
  id: number;
  createdDate: any;
  modifiedDate: any;
}

export interface Pagination {
  endRow?: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatePages?: number;
  navigatePageNums?: number[];
  nextPage: number;
  prePage: number;
  pageNum: number;
  pageSize: number;
  pages: number;
  size: number;
  startRow?: number;
  total: number;
}

export interface Paginated<T> extends Pagination {
  list: T[];
}

export interface UserBase extends ModelBase {
  appToken: string;
  email: string;
}

export interface UserProfile {
  id: number;
  name: string;
  profileType: string;
}

export interface UserRole extends ModelBase {
  name: string;
}

export interface User extends ModelBase {
  appToken: string;
  email: string;
  disabled: boolean;
  lastModifiedAdminId: number;
  parentId?: number;
  profiles: UserProfile[];
  roles: UserRole[];
  name: string;
  isAdmin: boolean;
  createdDate: string;
}

export interface DeviceManufacturer extends ModelBase {
  name: string;
  description: string;
  imageUrl: string;
  lastModifiedAdmin: string;
}

export interface DeviceModel extends ModelBase {
  modelNumber: string;
  hardwareRevision: string;
  colorNumber: string;
  imageUrl: string;
  lastModifiedAdminId: number;
}

export interface Firmware extends ModelBase {
  description: string;
  model: string;
  publishedDate: string;
  url: string;
  version: string;
  deleted: boolean;
  lastModifiedAdminId: number;
}

export interface PodManufacturer extends ModelBase {
  name: string;
  description: string;
  imageUrl: string;
  lastModifiedAdmin: string;
}

export interface Stage extends ModelBase {
  name: string;
  description: string;
  productionId: number;
  active: string;
  requirePrevious: boolean;
}

export interface Production extends ModelBase {
  name: string;
  description: string;
  stages: Stage[];
}

export interface DeviceProduction extends ModelBase {
  adcValue: string;
  chargingCurrent: string;
  comment: string;
  deviceManufacturerId: number;
  deviceModelId: number;
  deviceUniqueId: string;
  lastModifiedAdminId: number;
  ledCurrent: string;
  ledStatus: string;
  macAddress: string;
  pEndingCurrent: string;
  pairedCurrent: string;
  podInfo: string;
  productionFwDownloadStatus: string;
  productionFwVersion: string;
  rssiValue: string;
  sensorValue: string;
  sn: string;
  stageId: number;
  stageResult: string;
  standbyCurrent: string;
  systemVoltage: string;
  userFwDownloadStatus: string;
  userFwVersion: string;
  utcTimeInfo: string;
  vacuumTest: string;
  vapingCurrent: string;
}

export interface PodProduction extends ModelBase {
  chipId: string;
  comment: string;
  lastModifiedAdminId: number;
  podManufacturerId: number;
  rValue: string;
  sn: string;
  stageId: number;
  stageResult: string;
  utcTimeInfo: string;
  vacuumTest: string;
}
