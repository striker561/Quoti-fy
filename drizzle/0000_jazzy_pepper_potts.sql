CREATE TABLE "tbl_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "tbl_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tbl_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "tbl_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "quotify_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"quote" text NOT NULL,
	"imageURL" text,
	"promptData" jsonb NOT NULL,
	"quotifyReq" jsonb NOT NULL,
	"details" jsonb DEFAULT 'null'::jsonb,
	"dateCreated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tbl_account" ADD CONSTRAINT "tbl_account_userId_tbl_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."tbl_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tbl_session" ADD CONSTRAINT "tbl_session_userId_tbl_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."tbl_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotify_entries" ADD CONSTRAINT "quotify_entries_userId_tbl_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."tbl_user"("id") ON DELETE cascade ON UPDATE no action;