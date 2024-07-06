'use client';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import Link from 'next/link';

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <>
      <Link href={`/dashboard/product/${data.productId}`}>
        <Button>View detail</Button>
      </Link>
    </>
  );
};
