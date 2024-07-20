'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Category } from '@/types/category';
import { Edit, Trash2 } from 'lucide-react';
import CategoryForm from './category-form';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { deleteCategory } from '@/app/api/category/category.api';
import { toast } from '@/components/ui/use-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
interface CategoryCellActionProps {
  data: Category;
  fetchCategory: () => Promise<void>;
}

export const CategoryCellAction: React.FC<CategoryCellActionProps> = ({
  data,
  fetchCategory
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const session = useSession();
  const hanldeDeleteCategory = async () => {
    try {
      setIsPending(true);
      const response = await deleteCategory(
        session.data?.user?.token as string,
        data.categoryId
      );
      toast({ description: response });
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      fetchCategory();
    }
  };
  return (
    <div className="space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size={'icon'}>
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <CategoryForm
            initialData={data}
            token={session.data?.user?.token as string}
            fetchCategory={fetchCategory}
          />
        </DialogContent>
      </Dialog>
      <Button
        onClick={hanldeDeleteCategory}
        size={'icon'}
        variant={'destructive'}
      >
        {isPending ? (
          <AiOutlineLoading3Quarters className=" h-4 w-4 animate-spin" />
        ) : (
          <Trash2 />
        )}
      </Button>
    </div>
  );
};
