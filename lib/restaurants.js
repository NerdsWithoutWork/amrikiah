import * as SQLite from "expo-sqlite/next";

const DATABASE_NAME = "fatayerBase.db";

// Restaurants Table Functions

export const getAllRestaurants = async () => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getAllAsync(
    "SELECT * FROM Restaurants WHERE RestaurantDeleted = FALSE",
  );
  return result;
};

export const getRestaurantName = async (restaurantId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.getFirstAsync(
    "SELECT RestaurantName FROM Restaurants WHERE RestaurantID = ?",
    [restaurantId],
  );
  return result.RestaurantName;
};

export const addRestaurant = async (name, category, image) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "INSERT INTO Restaurants (RestaurantName, RestaurantCategory, RestaurantImage) VALUES (?, ?, ?)",
    [name, category, image],
  );
  return result;
};

export const setRestaurantFavorite = async (restaurantId, isFavorite) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "UPDATE Restaurants SET IsFavorite = ? WHERE RestaurantID = ?",
    [isFavorite, restaurantId],
  );
  return result;
};

export const deleteRestaurant = async (restaurantId) => {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  const result = await db.runAsync(
    "UPDATE Restaurants SET RestaurantDeleted = TRUE WHERE RestaurantID = ?",
    [restaurantId],
  );
  return result;
};
