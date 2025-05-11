import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import Layout from '@/components/layout/Layout';

const Home = () => (
  <Layout>
    <HeroSection />
    <FeaturesSection />
  </Layout>
);

export default Home;
