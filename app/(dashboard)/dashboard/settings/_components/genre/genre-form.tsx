'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Genre } from '@/types/genre';
import { GenreSchema } from '@/schemas/genre';
import { createGenre, updateGenre } from '@/app/api/genre/genre.api';

interface CategoryCreateFormProps {
  token: string;
  fetchGenre?: () => Promise<void>;
  initialData: Genre | undefined | null;
}

const GenreForm = ({
  token,
  fetchGenre,
  initialData
}: CategoryCreateFormProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof GenreSchema>>({
    resolver: zodResolver(GenreSchema),
    mode: 'onChange',
    defaultValues: initialData || {
      name: ''
    }
  });
  const onSubmit = async (values: z.infer<typeof GenreSchema>) => {
    try {
      setIsPending(true);

      const response = !initialData
        ? await createGenre(token, values.name)
        : await updateGenre(token, initialData.genreId, values.name);
      toast({
        description: response
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      fetchGenre!();
    }
  };
  return (
    <div
      className={cn(
        'h-full w-full space-y-4  ',
        !initialData && 'border-l pl-8'
      )}
    >
      <h3 className="text-lg font-medium">
        {initialData ? 'Update genre form' : 'Create genre form'}
      </h3>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Genre name</FormLabel>
                <FormControl>
                  <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                    <div className="flex w-full flex-col">
                      <Input
                        disabled={isPending}
                        type="text"
                        placeholder="Enter genre name"
                        className="border-none text-base text-muted-foreground shadow-none outline-none focus-visible:ring-0"
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <>
                  <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />{' '}
                  {initialData ? 'Updating' : 'Creating'}
                </>
              ) : initialData ? (
                'Update'
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default GenreForm;
