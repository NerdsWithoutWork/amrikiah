import * as SQLite from "expo-sqlite/next";

const DATABASE_NAME = "fatayerBase.db";

// Member Table Functions

export const getAllMembers = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getAllAsync(
    "SELECT * FROM Members WHERE MemberDeleted = FALSE",
  );
  return result;
};

export const addMember = async (memberName) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "INSERT INTO Members (MemberName) VALUES (?)",
    [memberName],
  );
  return result;
};

export const deleteMember = async (memberId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "UPDATE Members SET MemberDeleted = TRUE WHERE MemberID = ? ",
    [memberId],
  );
  return result;
};

export const getMemberName = async (memberId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getFirstAsync(
    "SELECT MemberName FROM Members WHERE MemberID = ? AND MemberDeleted = FALSE",
    [memberId],
  );
  await db.closeAsync();
  return result["MemberName"];
};
