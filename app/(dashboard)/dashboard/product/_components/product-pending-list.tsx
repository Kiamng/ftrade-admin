'use client';

import { getAllProduct } from '@/app/api/product/product.apit';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Product, ProductList } from '@/types/product';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './column';
import { Skeleton } from '@/components/ui/skeleton';
import PaginationSection from '@/components/tables/user-tables/pagination-section';
import { City } from '@/types/city';
import { Category } from '@/types/category';
import { Genre } from '@/types/genre';
import { toast } from '@/components/ui/use-toast';
import FilterSection from './filter-section';
import { getAllCategories } from '@/app/api/category/category.api';
import { getAllCities } from '@/app/api/city/city.apit';
import { getAllGenres } from '@/app/api/genre/genre.api';

const ProductPendingList = () => {
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [sortAscending, setSortAscending] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [inputValue, setInputValue] = useState<number>(1);

  const [productListInfor, setProductListInfor] = useState<ProductList>();
  const [productList, setProductList] = useState<Product[]>([]);

  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('createdDate');

  const [city, setCity] = useState<City[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [genre, setGenre] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchPendingProducts = async () => {
      if (session.data !== null) {
        try {
          setIsLoading(true);
          const response = await getAllProduct({
            token: session.data?.user?.token as string,
            status: 'Pending',
            pageNumber: currentPageNum,
            category:
              selectedCategory !== 'none' ? selectedCategory : undefined,
            city: selectedCity !== 'none' ? selectedCity : undefined,
            genre: selectedGenre !== 'none' ? selectedGenre : undefined,
            isDisplay: 'true',
            pageSize: 10,
            sortBy: sortBy || undefined,
            sortAscending: sortAscending
          });
          setProductList(response.items);
          setProductListInfor(response);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPendingProducts();
  }, [filter]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const categoryResponse = await getAllCategories(
          session.data?.user?.token as string
        );
        setCategory(categoryResponse);
        const cityResponse = await getAllCities(
          session.data?.user?.token as string
        );
        setCity(cityResponse);
        const genreResponse = await getAllGenres(
          session.data?.user?.token as string
        );
        setGenre(genreResponse);
      } catch (error) {
        console.error('Error fetching filter data:', error);
      }
    };
    fetchFilterData();
  }, [session.data?.user?.token]);

  const handleNextPage = () => {
    setCurrentPageNum(currentPageNum + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1);
    }
  };

  const handlePageClick = () => {
    setIsEdit(true);
  };

  const addInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = parseInt(e.target.value);
    if (num < 0) {
      num = -num;
    }

    if (num === 0) {
      num = 1;
    }

    if (num > productListInfor?.totalPages!) {
      num = productListInfor?.totalPages!;
    }
    setInputValue(num);
  };

  const enterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (productListInfor !== null) {
      if (e.code === 'Enter' && inputValue <= productListInfor?.totalPages!) {
        setCurrentPageNum(inputValue);
      }
    }
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
  };

  const handleSortByChange = (Value: string) => {
    setSortBy(Value);
  };

  const handleFilter = () => {
    setCurrentPageNum(1);
    setFilter(true);
  };

  const handleRestart = () => {
    setCurrentPageNum(1);
    setSelectedCategory('');
    setSelectedCity('');
    setSelectedGenre('');
    setSortAscending(false);
    setSortBy('createdDate');
    setFilter(true);
  };

  const handleSortAscending = () => {
    if (sortBy === '') {
      toast({
        description: `You need to choose the attribue that you want to sort ! `,
        variant: 'destructive'
      });
    } else {
      setSortAscending(!sortAscending);
      setCurrentPageNum(1);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex h-14 flex-col justify-between">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      ) : (
        <Heading
          title={`Pending product (${productListInfor?.totalItem})`}
          description="Manage pending products (Client side table functionalities.)"
        />
      )}

      <Separator />
      <FilterSection
        handleCategoryChange={handleCategoryChange}
        handleCityChange={handleCityChange}
        handleGenreChange={handleGenreChange}
        handleFilter={handleFilter}
        handleRestart={handleRestart}
        handleSortAscending={handleSortAscending}
        handleSortByChange={handleSortByChange}
        sortAscending={sortAscending}
        sortBy={sortBy}
        isLoading={isLoading}
        categoryData={category}
        cityData={city}
        genreData={genre}
      />
      <DataTable
        isLoading={isLoading}
        searchKey="title"
        columns={columns}
        data={productList!}
      />
      <PaginationSection
        addInput={addInput}
        currentPageNum={currentPageNum}
        enterInput={enterInput}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        handlePreviousPage={handlePreviousPage}
        inputValue={inputValue}
        isEdit={isEdit}
        totalPages={productListInfor?.totalPages as number}
      />
    </>
  );
};
export default ProductPendingList;
