CREATE TABLE "datarooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"owner" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "datarooms" ADD CONSTRAINT "datarooms_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;