import { useState } from "react";
import useMeals from "../../Hooks/useMeals";
import MealsByTabwise from "./mealsByTabwise";
import { Tab, TabPanel, Tabs ,TabList} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../Components/LoadingSpinner/Loading";



const TabMeals = () => {
    const [meals]=useMeals()
    const {loading}=useContext(AuthContext)
    // if(loading){
    //     return  <Loading></Loading>;
    // }
    console.log(meals)
    const [tabIndex, setTabIndex] = useState(0);
    const breakfast = meals.filter(meal => meal.category === 'Breakfast');
    const lunch = meals.filter(meal => meal.category === 'Lunch');
    const dinner = meals.filter(meal => meal.category === 'Dinner');

    return (
        <div className=" mt-10">
            <Tabs className="mt-10" defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Breakfast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                </TabList>
                <TabPanel>
                    <MealsByTabwise meals={breakfast}></MealsByTabwise>
                </TabPanel>
                <TabPanel>
                    <MealsByTabwise meals={lunch}></MealsByTabwise>
                </TabPanel>
                <TabPanel>
                    <MealsByTabwise meals={dinner}></MealsByTabwise>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TabMeals;