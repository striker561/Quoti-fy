ALTER TABLE "tbl_quotify_records" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "tbl_quotify_records" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tbl_quotify_records" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "tbl_quotify_records_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);