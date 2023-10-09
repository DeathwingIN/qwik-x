import {
  boolean,
  json,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations, type InferModel } from "drizzle-orm";
import { profile } from "./profile";
import { posts } from "./posts";
import { postsLikes } from "./posts-likes";
import { followers } from "./followers";
import { followings } from "./followings";
import { bookmarks } from "./bookmarks";
import { lists } from "./lists";
import {
  usersListsFollowers,
  usersListsMembers,
  usersListsPinned,
} from "./users-to-lists";
export const usersRole = pgEnum("users_role", ["User", "Admin"]);
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  username: varchar("username", { length: 15 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  avatar: json("avatar").notNull(),
  role: usersRole("role").default("User").notNull(),
  online: boolean("online").default(false).notNull(),
  lastSeen: timestamp("last_seen").defaultNow(),
  theme: json("theme").notNull().default({ variant: "light" }),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profile, {
    fields: [users.id],
    references: [profile.userId],
    relationName: "usersToProfile",
  }),
  posts: many(posts, {
    relationName: "authorToPosts",
  }),
  postsLikes: many(postsLikes),
  followers: many(followers, {
    relationName: "usersToFollowers",
  }),
  followings: many(followings, {
    relationName: "usersToFollowings",
  }),
  bookmarks: many(bookmarks, {
    relationName: "usersToBookmarks",
  }),
  lists: many(lists, {
    relationName: "listsOwner",
  }),
  pinnedLists: many(usersListsPinned),
  listsMembers: many(usersListsMembers),
  followingLists: many(usersListsFollowers),
}));

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;
