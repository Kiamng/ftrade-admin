'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Genre } from '@/types/genre';
import GenreForm from './genre-form';
import { deleteGenre } from '@/app/api/genre/genre.api';
interface GenreCellActionProps {
  data: Genre;
  fetchGenre: () => Promise<void>;
}

export const GenreCellAction: React.FC<GenreCellActionProps> = ({
  data,
  fetchGenre
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const session = useSession();
  const hanldeDeleteGenre = async () => {
    try {
      setIsPending(true);
      const response = await deleteGenre(
        session.data?.user?.token as string,
        data.genreId
      );
      toast({ description: response });
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      fetchGenre();
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
          <GenreForm
            initialData={data}
            token={session.data?.user?.token as string}
            fetchGenre={fetchGenre}
          />
        </DialogContent>
      </Dialog>
      <Button onClick={hanldeDeleteGenre} size={'icon'} variant={'destructive'}>
        {isPending ? (
          <AiOutlineLoading3Quarters className=" h-4 w-4 animate-spin" />
        ) : (
          <Trash2 />
        )}
      </Button>
    </div>
  );
};
