ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_id_token_email_pk";--> statement-breakpoint
ALTER TABLE "verificationToken" ADD PRIMARY KEY ("id");