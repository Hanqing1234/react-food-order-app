import React, {useState, useEffect} from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {

      const response = await fetch(
        "https://react-movie-1c00d-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok) {
        throw new Error('Something went wrong!')
      }

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

      fetchMeals().catch ((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if(isLoading) {
    return (
    <section className={classes.MealsLoading} >
    <p>Loading...</p>
    </section>
    );
  }

  if(httpError) {
    return (
      <section className={classes.MealsError}>
      <p>{httpError}</p>
      </section>
    )
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
