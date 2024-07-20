'use client';
import { Heading } from '@/components/ui/heading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import CategorySettingPage from './category/category-setting';
import CitySettingPage from './city/city-setting';
import GenreSettingPage from './genre/genre-setting';
import { useSession } from 'next-auth/react';
const SettingSection = () => {
  const session = useSession();
  const section = {
    city: 'City',
    genre: 'Genre',
    category: 'Category'
  };
  const [currentSection, setCurrentSection] = useState<string>(
    section.category
  );
  const hanldeSelectSection = (sectionName: string) => {
    setCurrentSection(sectionName);
  };
  return (
    <div className="w-full space-y-4">
      <Heading title={`Settings`} description="Manage setting " />
      <Tabs defaultValue={currentSection}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            onClick={() => hanldeSelectSection(section.category)}
            value={section.category}
          >
            {section.category}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => hanldeSelectSection(section.city)}
            value={section.city}
          >
            {section.city}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => hanldeSelectSection(section.genre)}
            value={section.genre}
          >
            {section.genre}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {currentSection === section.category ? (
        <CategorySettingPage token={session.data?.user?.token as string} />
      ) : currentSection === section.city ? (
        <CitySettingPage token={session.data?.user?.token as string} />
      ) : (
        <GenreSettingPage token={session.data?.user?.token as string} />
      )}
    </div>
  );
};
export default SettingSection;
