import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import RecentOpportunities from "./components/RecentOpportunities";
import Testimonial from "./components/Testimonial";
import Companies from "./components/Companies";
import Contact from "./components/Contact";
import CommunityTools from "./components/CommunityTools";

export default function Home() {
  return (
    <main>
      <Hero />

      <CommunityTools />

      <Stats />

      <RecentOpportunities />

      <Features />

      <Testimonial />
      
      <Companies />

      <Contact />
    </main>
  );
}
