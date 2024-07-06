import * as React from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

// Schema definition
const ReviewSchema = z
  .object({
    action: z.enum(['Approve', 'Deny']),
    denyReason: z.string().optional()
  })
  .refine(
    (data) =>
      data.action === 'Approve' || (data.action === 'Deny' && data.denyReason),
    {
      message: 'You must provide a reason if you deny',
      path: ['denyReason']
    }
  );

// Infer the schema type
type ReviewFormValues = z.infer<typeof ReviewSchema>;

const ReviewSection: React.FC = () => {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      action: 'Approve', // Provide a default value for action
      denyReason: ''
    }
  });

  const onSubmit = (values: ReviewFormValues) => {
    console.log(values);
  };

  // Function to update form value and force re-render
  const updateFormValue = (fieldName: keyof ReviewFormValues, value: any) => {
    form.setValue(fieldName, value);
    // Force re-render
    form.trigger();
  };

  return (
    <div className="flex w-full space-x-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="denyReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deny Reason</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="If deny, give a reason" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Denied reasons:</SelectLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <input type="hidden" {...form.register('action')} />

          <Button
            type="button" // Change type to button to prevent form submission
            className="w-[100px] bg-green-500 hover:bg-green-400"
            onClick={() => updateFormValue('action', 'Approve')}
          >
            Approve
          </Button>
          <Button
            type="button" // Change type to button to prevent form submission
            className="w-[100px]"
            variant={'destructive'}
            onClick={() => updateFormValue('action', 'Deny')}
          >
            Deny
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewSection;
