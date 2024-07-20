'use client';

import { getAllCategories } from '@/app/api/category/category.api';
import { Button } from '@/components/ui/button';
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
import { Genre } from '@/types/genre';
import { getAllGenres } from '@/app/api/genre/genre.api';
import { genreColumns } from './genre-columns';
import GenreForm from './genre-form';
interface GenreSettingPageProps {
  token: string;
}

const GenreSettingPage = ({ token }: GenreSettingPageProps) => {
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchGenre = async () => {
    try {
      setIsLoading(true);
      const response = await getAllGenres(token);
      setGenreList(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = genreColumns({ fetchGenre });
  useEffect(() => {
    fetchGenre();
  }, []);
  return (
    <div className=" w-full">
      <Card className="w-full space-y-4">
        <CardHeader>
          <CardTitle>Genre list</CardTitle>
          <CardDescription>
            List of a genre, add new a genre and delete a genre
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex w-full space-x-4">
          <div className="w-[40%]">
            <DataTable
              columns={columns}
              data={genreList}
              isLoading={isLoading}
              searchKey="name"
            />
          </div>
          <div className="w-[60%]">
            <GenreForm
              token={token}
              fetchGenre={fetchGenre}
              initialData={null}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default GenreSettingPage;
