import * as SQLite from "expo-sqlite/next";

const DATABASE_NAME = "fatayerBase.db";

// Meal Table Function

export const getAllMeals = async (restaurantId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getAllAsync(
    "SELECT * FROM Meals WHERE RestaurantID = ? AND MealDeleted = FALSE",
    [restaurantId],
  );
  return result;
};

export const addMeal = async (restaurantId, mealName, mealPrice) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "INSERT INTO Meals (RestaurantID, MealName, MealPrice) VALUES (?, ?, ?)",
    [restaurantId, mealName, mealPrice],
  );
  return result;
};

export const deleteMeal = async (mealId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "UPDATE Meals SET MealDeleted = TRUE WHERE MealID = ?",
    [mealId],
  );
  return result;
};

export const getMealName = async (mealId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getFirstAsync(
    "SELECT MealName FROM Meal WHERE MealID = ? AND MealDeleted = FALSE",
    [mealId],
  );
  await db.closeAsync();
  return result["MealName"];
};
