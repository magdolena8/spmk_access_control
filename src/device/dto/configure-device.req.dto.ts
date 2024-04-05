export class ConfigureDeviceReqDto {
  peripheryConfiguration: PeripheryConfigurationDTO[];
  accessPointsConfiguration: AccessPointsConfigurationDTO[];
  deviceConfiguration: DeviceConfigurationDTO;
  firmwareVersion: string;
}

interface PeripheryConfigurationDTO {
  isActive: boolean;
  deviceAdr: string;
  settings: PeripherySettingsDTO;
  type: string;
}

// As the settings object structure varies, you can define an interface that includes all possible settings properties with optional attributes.
interface PeripherySettingsDTO {
  dev_num?: number;
  in_signal_type?: string;
  pressing_duration?: number;
  access_point?: number;
  direction?: string;
  bits?: string | null;
  opening_duration?: number;
  pin_b_direction?: string;
  out_signal_type?: string;
  access_control?: string;
  unlock_time?: number;
  pin_a_direction?: string;
}

interface AccessPointsConfigurationDTO {
  isActive: boolean;
  name: string;
  peripheryConfiguration: PeripheryConfigurationDTO[];
  id: string;
}

interface DeviceConfigurationDTO {
  betweenCheckTimeout: number;
  pressingDuration: number;
  grantedTime: number;
  enrollTimeout: number;
  type: string;
  deniedTime: number;
  openingDuration: number;
}
