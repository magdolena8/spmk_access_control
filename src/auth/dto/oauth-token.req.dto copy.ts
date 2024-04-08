export class OAuthTokenReqDto {
  grant_type: GrantType;
  username?: string;
  password?: string;
  refresh_token?: string;
}

export enum GrantType {
  password = 'password',
  refresh_token = 'refresh_token',
}
