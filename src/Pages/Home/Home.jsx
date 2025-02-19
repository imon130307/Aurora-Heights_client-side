import { Helmet } from "react-helmet-async";
import Carousel from "./Carousel";
import Featured from "./Featured";
import TabMeals from "./TabMeals";
import Membership from "./Membership";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Aurora Heights | Home</title>
            </Helmet>
            <Carousel></Carousel>
            <TabMeals></TabMeals>
            <Featured></Featured>
            <Membership></Membership>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;