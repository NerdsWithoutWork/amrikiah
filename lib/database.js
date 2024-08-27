import * as SQLite from "expo-sqlite/next";

const DATABASE_NAME = "fatayerBase.db";

export const initializeDatabase = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  try {
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "Members" (
        "MemberID" INTEGER,
        "MemberName" TEXT,
        "MemberDeleted" INTEGER DEFAULT FALSE,
        PRIMARY KEY(MemberID)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "Settings" (
        "UserID" INTEGER,
        "AccentColor" INTEGER DEFAULT 1,
        "Currency" INTEGER DEFAULT 1,
        PRIMARY KEY(UserID) 
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "Restaurants" (
        "RestaurantID" INTEGER,
        "RestaurantName" TEXT,
        "RestaurantCategory" TEXT,
        "IsFavorite" INTEGER DEFAULT FALSE,
        "RestaurantImage" TEXT,
        "RestaurantDeleted" INTEGER DEFAULT FALSE,
        PRIMARY KEY(RestaurantID)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "Meals" (
        "MealID" INTEGER,
        "RestaurantID" INTEGER,
        "MealName" TEXT,
        "MealPrice" INTEGER,
        "MealDeleted" INTEGER DEFAULT FALSE,
        PRIMARY KEY(MealID),
        FOREIGN KEY ("RestaurantID") REFERENCES "Restaurants" ("RestaurantID") ON UPDATE NO ACTION ON DELETE NO ACTION
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "Orders" (
        "OrderID" INTEGER NOT NULL,
        "OrderDate" TEXT NOT NULL,
        "MealID" INTEGER NOT NULL,
        "MemberID" INTEGER NOT NULL,
        "MealCount" INTEGER NOT NULL,
        PRIMARY KEY("OrderID","MealID","MemberID"),
        FOREIGN KEY ("MealID") REFERENCES "Meals" ("MealID") ON UPDATE NO ACTION ON DELETE NO ACTION,
        FOREIGN KEY ("MemberID") REFERENCES "Members" ("MemberID") ON UPDATE NO ACTION ON DELETE NO ACTION
      );
    `);
  } catch (error) {
    console.error("Error initializing database: ", error);
  }
};

export const resetDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await db.closeAsync();
    await SQLite.deleteDatabaseAsync(DATABASE_NAME);
    console.log("Database reset successfully.");
  } catch (error) {
    console.error("Error resetting database: ", error);
  }
};
