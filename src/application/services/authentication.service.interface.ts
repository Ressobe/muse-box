export interface IAuthenticationService {
  validateSession(): Promise<string>;
}
