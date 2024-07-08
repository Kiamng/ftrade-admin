'use client';
import { getProductById } from '@/app/api/product/product.apit';
import { getUserById } from '@/app/api/user/user.api';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Account } from '@/types/account';
import { Product } from '@/types/product';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ProductDetail from '../_components/product-detail';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ReviewSection from '../_components/review-section';

interface PendingDetailPageProps {
  params: { productId: string };
}

const PendingDetailPage = ({ params }: PendingDetailPageProps) => {
  const [product, setProduct] = useState<Product>();
  const [creator, setCreator] = useState<Account>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  useEffect(() => {
    const fetchPendingProducts = async () => {
      if (session.data !== null) {
        try {
          setIsLoading(true);
          const response = await getProductById(
            params.productId,
            session.data.user?.token as string
          );
          setProduct(response);
          const creator = await getUserById(
            response.creatorId,
            session.data.user?.token as string
          );
          setCreator(creator);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPendingProducts();
  }, [params.productId, session.data]);
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Heading
        title={`Pending product detail`}
        description="Manage pending products (Client side table functionalities.)"
      />
      <Separator />
      <ProductDetail creator={creator} product={product} />
      <ReviewSection
        isDisplay={product?.isDisplay}
        token={session.data!.user?.token as string}
        productId={params.productId}
      />
    </div>
  );
};

export default PendingDetailPage;
