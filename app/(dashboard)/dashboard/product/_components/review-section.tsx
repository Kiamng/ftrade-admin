'use client';

import { updateProductStatus } from '@/app/api/product/product.apit';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReviewSectionProps {
  isDisplay: string | undefined;
  token: string | undefined;
  productId: string | undefined;
}

const ReviewSection = ({ isDisplay, token, productId }: ReviewSectionProps) => {
  const router = useRouter();
  const [review, setReview] = useState<string>('');
  const [denyReason, setDenyReason] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(!isLoading);
      if (review === 'Deny') {
        if (denyReason.length === 0) {
          toast({
            description: `If you deny this pending product post, please select a reason`,
            variant: 'destructive'
          });
          return;
        } else {
          const updateResponse = await updateProductStatus(
            productId as string,
            review,
            denyReason,
            isDisplay as string,
            token as string
          );
          if (updateResponse === 200) {
            toast({
              description: `You have denied this pending product post !`
            });
            router.push(`/dashboard/product`);
          } else {
            toast({
              description: `Updating pending product failed`,
              variant: 'destructive'
            });
          }
        }
      } else {
        const updateResponse = await updateProductStatus(
          productId as string,
          review,
          denyReason,
          isDisplay as string,
          token as string
        );
        if (updateResponse === 200) {
          toast({
            description: `You have approved this pending product post`
          });
          router.push(`/dashboard/product`);
        } else {
          toast({
            description: `Updating pending product failed`,
            variant: 'destructive'
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full space-x-4">
      <Select
        onValueChange={(value) => setDenyReason(value)}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="If deny, give a reason" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Denied reasons :</SelectLabel>
            <SelectItem value="Missing information">
              Missing information
            </SelectItem>
            <SelectItem value="Inappropriate words">
              Inappropriate words
            </SelectItem>
            <SelectItem value="Spamming product post">
              Spamming product post
            </SelectItem>
            <SelectItem value="Inappropriate image">
              Inappropriate image
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        disabled={isLoading}
        type="submit"
        className="w-[100px] bg-green-500 hover:bg-green-400"
        onClick={() => setReview('Approved')}
      >
        Approve
      </Button>
      <Button
        disabled={isLoading}
        type="submit"
        className="w-[100px]"
        variant={'destructive'}
        onClick={() => setReview('Deny')}
      >
        Denyyyyyyy
      </Button>
    </form>
  );
};

export default ReviewSection;
