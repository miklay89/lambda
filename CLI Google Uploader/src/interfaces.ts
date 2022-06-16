export interface CredentialsInterface {
  client_secret: string;
  client_id: string;
  redirect_uris: string;
}

export interface TokenInterface {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: Date;
}