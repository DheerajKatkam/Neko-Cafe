import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MoodShift from "../components/MoodShift";
import PawProgressTrail from "../components/PawProgressTrail";
import MenuTeaser from "../components/MenuTeaser";
import HappeningsCarousel from "../components/HappeningsCarousel";
import CuratorSpotlight from "../components/CuratorSpotlight";
import HoursLocation from "../components/HoursLocation";
import BookingForm from "../components/BookingForm";
import MarqueeBand from "../components/MarqueeBand";
import Newsletter from "../components/Newsletter";
import FollowAlong from "../components/FollowAlong";
import CatsSection from "../components/CatsSection";
import MemoriesCollage from "../components/MemoriesCollage";
import LiveCam from "../components/LiveCam";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <Navbar />
      <PawProgressTrail />

      <MoodShift>
        <main id="main-content">
          <Hero />
          <MenuTeaser />
          <HappeningsCarousel />
          <CuratorSpotlight />
          <HoursLocation />
          <BookingForm />
          <MarqueeBand />
          <Newsletter />
          <FollowAlong />
          <CatsSection />
          <MemoriesCollage />
          <LiveCam />
        </main>

        <Footer />
      </MoodShift>
    </>
  );
}
