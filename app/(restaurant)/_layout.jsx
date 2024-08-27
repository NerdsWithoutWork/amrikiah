import React from "react";
import {  Stack } from "expo-router";


const RestaurantLayout = () => {

  return (
    <Stack>
      <Stack.Screen name="restaurantPage" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RestaurantLayout;
