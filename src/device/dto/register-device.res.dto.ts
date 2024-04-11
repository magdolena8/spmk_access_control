export class RegisterDeviceResDto {
  id: string;
  name: string;
  login: string;
  password: string;
  is_success: boolean;
  status: DeviceRegistrationStatus;
  constructor(partial: Partial<RegisterDeviceResDto>) {
    Object.assign(this, partial);
  }
}

export enum DeviceRegistrationStatus {
  UNKNOWN = 'UNKNOWN',
  SUCCESS = 'SUCCESS',
  DEVICE_EXIST = 'DEVICE_EXIST',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  INVALID_LOGIN_OR_PASSWORD = 'INVALID_LOGIN_OR_PASSWORD',
  DEVICE_NAME_IS_EMPTY = 'DEVICE_NAME_IS_EMPTY',
}
