enum IdentifierType {
  RFID = 'RFID',
}

enum FingerprintType {
  UNKNOWN = 'UNKNOWN',
}

enum Direction {
  IN = 'IN',
  OUT = 'OUT',
}

enum AccessType {
  DENIED = 'DENIED',
  GRANTED = 'GRANTED',
}

enum AccessReason {
  EMPLOYEE_ID_NOT_FIND = 'EMPLOYEE_ID_NOT_FIND',
}

export class AccessRequestDto {
  measuredWeight: number;
  alcoholTestValue: number;
  identifierType: IdentifierType;
  dateTime: string;
  reason: AccessReason[];
  measuredWeightDelta: number;
  fingerprintType: FingerprintType;
  direction: Direction;
  accessPointId: string;
  accessRuleId?: string | null;
  rfidId: string;
  id: string;
  employeeId?: string | null;
  type: AccessType;
  accessReasonValues: string[];
  documentValues: string[];
  access_data_exist: boolean;
}
