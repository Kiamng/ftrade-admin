'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { City } from '@/types/city';
import CityForm from './city-form';
import { toast } from '@/components/ui/use-toast';
import { deleteCity } from '@/app/api/city/city.apit';
interface CityCellActionProps {
  data: City;
  fetchCity: () => Promise<void>;
}

export const CityCellAction: React.FC<CityCellActionProps> = ({
  data,
  fetchCity
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const session = useSession();
  const hanldeDeleteCategory = async () => {
    try {
      setIsPending(true);
      const response = await deleteCity(
        session.data?.user?.token as string,
        data.cityId
      );
      toast({ description: response });
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      fetchCity();
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
          <CityForm
            initialData={data}
            token={session.data?.user?.token as string}
            fetchCity={fetchCity}
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
