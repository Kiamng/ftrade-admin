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

const ProductPendingList = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [productListInfor, setProductListInfor] = useState<ProductList>();
  const [productList, setProductList] = useState<Product[]>([]);

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
    </>
  );
};
export default ProductPendingList;
