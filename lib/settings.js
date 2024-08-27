import * as SQLite from "expo-sqlite/next";

const DATABASE_NAME = "fatayerBase.db";

// Member Table Functions

export const getSettings = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getFirstAsync(
    "SELECT AccentColor, Currency FROM Settings",
  );
  return result;
};

export const initSettings = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "INSERT INTO Settings (UserID, AccentColor, Currency) VALUES (0, 0 , 0) ON CONFLICT (UserID) DO NOTHING",
  );
  return result;
};

export const updateAccentColor = async (AccentColor) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "UPDATE Settings SET AccentColor = ? WHERE UserID = 0",
    [AccentColor],
  );
  return result;
};
export const updateCurrency = async (Currency) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "UPDATE Settings SET Currency = ? WHERE UserID = 0",
    [Currency],
  );
  return result;
};
