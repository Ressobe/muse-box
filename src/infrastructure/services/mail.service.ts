import { APP_NAME } from "@/config";
import { IMailService } from "@/src/application/services/mail.service.interface";
import { Resend } from "resend";

export class MailService implements IMailService {
  private resend: Resend;
  private domain: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.domain = process.env.NEXT_PUBLIC_APP_URL!;
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const confirmLink = `${this.domain}/auth/new-verification?token=${token}`;

    await this.resend.emails.send({
      from: "confirm@bartoszsobina.xyz",
      to: email,
      subject: "Confirm your account",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm account in ${APP_NAME}</p>`,
    });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const confirmLink = `${this.domain}/auth/new-password?token=${token}`;

    await this.resend.emails.send({
      from: "reset@bartoszsobina.xyz",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${confirmLink}">here</a> to reset your password in ${APP_NAME}</p>`,
    });
  }
}
