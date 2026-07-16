import Navbar from "../components/Navbar";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import SearchBar from "../components/Searchbar";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <main>
   <Navbar/>
      <Hero />
      
      <SearchBar/>
      <FeaturedProperties/>
      <WhyChooseUs/>
      <Testimonials/>
      <Footer/>
    </main>
  );
}