'use client';

import { getAllCategories } from '@/app/api/category/category.api';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/category';
import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { categoryColumns } from './category-columns';
import CategoryForm from './category-form';

interface CategorySettingPageProps {
  token: string;
}

const CategorySettingPage = ({ token }: CategorySettingPageProps) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCategories(token);
      setCategoryList(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = categoryColumns({ fetchCategory });
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className=" w-full">
      <Card className="w-full space-y-4">
        <CardHeader>
          <CardTitle>Category list</CardTitle>
          <CardDescription>
            List of a category, add new a category and delete a category
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex w-full space-x-4">
          <div className="w-[40%]">
            <DataTable
              columns={columns}
              data={categoryList}
              isLoading={isLoading}
              searchKey="name"
            />
          </div>
          <div className="w-[60%]">
            <CategoryForm
              token={token}
              fetchCategory={fetchCategory}
              initialData={null}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CategorySettingPage;
