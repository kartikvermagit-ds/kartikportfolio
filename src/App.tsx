import React, { useState } from 'react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useGitHubData } from './hooks/useGitHubData';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/common/Navbar';
import { LoadingScreen } from './components/common/LoadingScreen';
import { HeroSection } from './components/sections/HeroSection';
import { BrainTransitionSection } from './components/sections/BrainTransitionSection';
import { AboutSection } from './components/sections/AboutSection';
import { WhatIBuildSection } from './components/sections/WhatIBuildSection';
import { TechUniverseSection } from './components/sections/TechUniverseSection';
import { FlagshipProjectsSection } from './components/sections/FlagshipProjectsSection';
import { ProjectExplorerSection } from './components/sections/ProjectExplorerSection';
import { GitHubLiveSection } from './components/sections/GitHubLiveSection';
import { HackathonJourneySection } from './components/sections/HackathonJourneySection';
import { CodingJourneySection } from './components/sections/CodingJourneySection';
import { CurrentlyBuildingSection } from './components/sections/CurrentlyBuildingSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { BackgroundMusic } from './components/common/BackgroundMusic';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollProgress, scrollY } = useScrollProgress();
  const { repos, userProfile, isLoading: isGitLoading } = useGitHubData();

  return (
    <div className="relative min-h-screen bg-[#05070B] text-[#F8FAFC] selection:bg-blue-600/30 selection:text-blue-200">
      {/* Loading Sequence */}
      <LoadingScreen onLoaded={() => setIsLoaded(true)} />

      {/* Custom Mouse Cursor with contextual hover states */}
      <CustomCursor />

      {/* Floating Ambient Background Music Controller */}
      <BackgroundMusic />

      {/* Top Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-75 ease-out shadow-sm shadow-blue-500"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating Responsive Navbar */}
      <Navbar scrollY={scrollY} />

      {/* Scrollytelling Sections Flow */}
      <main className="relative z-10 flex flex-col w-full">
        {/* 1. Hero: Enter My World */}
        <HeroSection scrollY={scrollY} />

        {/* 2. 3D Digital Brain / Systems Transition */}
        <BrainTransitionSection scrollProgress={scrollProgress} />

        {/* 3. About: Building by Doing */}
        <AboutSection />

        {/* 4. What I Build: 4 Interactive 3D Tilt Cards */}
        <WhatIBuildSection />

        {/* 5. Tech Universe: Interactive Node Network */}
        <TechUniverseSection />

        {/* 6. Flagship Projects Showcase (PYRAVEX, VERIDEXA, NUDGEKAVACH, CHRONOSAT, HOSTELHUB) */}
        <FlagshipProjectsSection />

        {/* 7. Secondary Projects Explorer (Searchable Registry) */}
        <ProjectExplorerSection repos={repos} />

        {/* 8. Live GitHub Ecosystem Telemetry */}
        <GitHubLiveSection
          repos={repos}
          userProfile={userProfile}
          isLoading={isGitLoading}
        />

        {/* 9. Hackathon Journey: Built Under Pressure */}
        <HackathonJourneySection />

        {/* 10. Coding Journey: Beyond Projects & 3D DSA Graph */}
        <CodingJourneySection />

        {/* 11. Currently Building Terminal Dashboard */}
        <CurrentlyBuildingSection />

        {/* 12. Cinematic Contact Finale */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
