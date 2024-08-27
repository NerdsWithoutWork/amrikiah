import * as SQLite from "expo-sqlite/next";

const DATABASE_NAME = "fatayerBase.db";

// Order Table Functions

export const addToOrder = async (orderId, memberId, mealId, mealCount) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "INSERT INTO Orders (OrderID, OrderDate, MemberID, MealID, MealCount) VALUES (?, datetime(), ?, ?, ?) ON CONFLICT (OrderID, MemberID, MealID) DO UPDATE SET MealCount = ?",
    [orderId, memberId, mealId, mealCount, mealCount],
  );
  return result;
};

export const getOrderItems = async (orderId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getAllAsync(
    "SELECT * FROM Orders WHERE OrderID = ?",
    [orderId],
  );
  return result;
};

export const getOrderRestaurantId = async (orderId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getFirstAsync(
    "SELECT RestaurantID FROM Meals WHERE MealID = (SELECT MealID FROM Orders WHERE OrderID = ? LIMIT 1)",
    [orderId],
  );
  return result.RestaurantID;
};

export const getMemberMealCount = async (orderId, mealId, memberId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getFirstAsync(
    "SELECT MealCount FROM Orders WHERE OrderID = ? AND MealID = ? AND MemberID = ?",
    [orderId, mealId, memberId],
  );
  return result ? result["MealCount"] : 0;
};

export const deleteAllOrders = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getAllAsync("DELETE FROM Orders");
  return result;
};

export const getOrderMembers = async (orderId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getAllAsync(
    "SELECT Orders.MemberID, Members.MemberName FROM Orders LEFT JOIN Members ON Orders.MemberID = Members.MemberID WHERE OrderID = ? GROUP BY Orders.MemberID",
    [orderId],
  );
  return result;
};

export const getMemberOrderSummary = async (orderId, memberId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getAllAsync(
    "SELECT Meals.MealID id, Meals.MealName, Orders.MealCount, Meals.MealPrice FROM Orders LEFT JOIN Meals ON Orders.MealID = Meals.MealID LEFT JOIN Members ON Orders.MemberID = Members.MemberID WHERE Orders.OrderID = ? AND Orders.MemberID = ?",
    [orderId, memberId],
  );
  return result;
};

export const deleteMemberMealOrder = async (orderId, memberId, mealId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "DELETE FROM Orders WHERE OrderID = ? AND MemberID = ? AND MealID = ?",
    [orderId, memberId, mealId],
  );
  return result;
};

export const getLastOrderId = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getFirstAsync(
    "SELECT OrderID FROM Orders ORDER BY OrderID DESC",
  );
  return result ? result.OrderID : 0;
};

export const getAllOrders = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getAllAsync(
    "SELECT OrderID FROM Orders GROUP BY OrderID ORDER BY OrderID DESC ",
  );
  return result;
};

export const getOrderDate = async (orderId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getFirstAsync(
    "SELECT unixepoch(OrderDate) seconds FROM Orders WHERE OrderID = ?",
    [orderId],
  );
  return result.seconds;
};
