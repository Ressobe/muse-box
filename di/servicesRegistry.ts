import { AuthenticationService } from "@/src/infrastructure/services/authentication.service";
import { MailService } from "@/src/infrastructure/services/mail.service";

export const servicesRegistry = {
  IAuthenticationService: AuthenticationService,
  IMailService: MailService,
};
