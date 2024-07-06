'use client';

import { getProductByStatus } from '@/app/api/product/product.apit';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Product, ProductList } from '@/types/product';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './column';
import { Skeleton } from '@/components/ui/skeleton';
import PaginationSection from '@/components/tables/user-tables/pagination-section';

const ProductPendingList = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [productListInfor, setProductListInfor] = useState<ProductList>();
  const [productList, setProductList] = useState<Product[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(1);
  useEffect(() => {
    const fetchPendingProducts = async () => {
      if (session.data !== null) {
        try {
          setIsLoading(true);
          const response = await getProductByStatus(
            'Pending',
            currentPageNum,
            10,
            session.data.user?.token as string
          );
          setProductList(response.items);
          setProductListInfor(response);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPendingProducts();
  }, []);

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
