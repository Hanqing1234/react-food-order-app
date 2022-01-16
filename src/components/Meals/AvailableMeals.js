import React, {useState, useEffect} from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-movie-1c00d-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json(); //responseData is an object, we need an array here
      const loadedMeals = [];

      for(const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals();
  }, []);

  if(isLoading) {
    return (
    <section className={classes.MealsLoading} >
    <p>Loading...</p>
    </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem meal={meal} key={meal.id} id={meal.id} />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
