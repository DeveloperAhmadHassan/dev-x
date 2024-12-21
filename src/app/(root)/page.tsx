import React from 'react';
import Navbar from "@/sections/Navbar";
import Hero from "./_components/sections/Hero";
import LogoTicker from "./_components/sections/LogoTicker";
import Introduction from "./_components/sections/Introduction";
import Features from "./_components/sections/Features";
import Integrations from "./_components/sections/Integrations";
import Faqs from "./_components/sections/Faqs";
import CallToAction from "./_components/sections/CallToAction";
import Footer from "./_components/sections/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <LogoTicker />
            <Introduction />
            <Features />
            <Integrations />
            <Faqs />
            <CallToAction />
            <Footer />
        </>
    );
};

export default Home;