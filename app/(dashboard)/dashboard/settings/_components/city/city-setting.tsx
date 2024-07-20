'use client';

import { getAllCategories } from '@/app/api/category/category.api';
import { Category } from '@/types/category';
import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { getAllCities } from '@/app/api/city/city.apit';
import { City } from '@/types/city';
import { cityColumns } from './city-columns';
import CityForm from './city-form';

interface CategorySettingPageProps {
  token: string;
}

const CategorySettingPage = ({ token }: CategorySettingPageProps) => {
  const [cityList, setCitygoryList] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchCity = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCities(token);
      setCitygoryList(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = cityColumns({ fetchCity });
  useEffect(() => {
    fetchCity();
  }, []);
  return (
    <div className=" w-full">
      <Card className="w-full space-y-4">
        <CardHeader>
          <CardTitle>City list</CardTitle>
          <CardDescription>
            List of a city, add new a city and delete a city
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex w-full space-x-4">
          <div className="w-[40%]">
            <DataTable
              columns={columns}
              data={cityList}
              isLoading={isLoading}
              searchKey="name"
            />
          </div>
          <div className="w-[60%]">
            <CityForm token={token} fetchCity={fetchCity} initialData={null} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CategorySettingPage;
