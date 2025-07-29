ALTER TABLE "quotify_entries" RENAME TO "tbl_quotify_records";--> statement-breakpoint
ALTER TABLE "tbl_quotify_records" DROP CONSTRAINT "quotify_entries_userId_tbl_user_id_fk";
--> statement-breakpoint
ALTER TABLE "tbl_quotify_records" ADD COLUMN "metaHash" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tbl_quotify_records" ADD COLUMN "fullMetaData" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "tbl_quotify_records" ADD CONSTRAINT "tbl_quotify_records_userId_tbl_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."tbl_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_user_meta" ON "tbl_quotify_records" USING btree ("userId","metaHash");