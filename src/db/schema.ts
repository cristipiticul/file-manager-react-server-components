import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique()
});

export const datarooms = pgTable('datarooms', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  owner: integer('owner').notNull().references(() => users.id)
});
