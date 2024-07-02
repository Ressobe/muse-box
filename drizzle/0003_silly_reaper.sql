ALTER TABLE "verificationToken" RENAME COLUMN "identifier" TO "id";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_identifier_token_email_pk";--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_id_token_email_pk" PRIMARY KEY("id","token","email");