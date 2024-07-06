'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/types/product';
import { format } from 'date-fns';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    id: 'category',
    header: 'Category',
    cell: ({ row }) => <span>{row.original.category.name}</span>
  },
  {
    id: 'city',
    header: 'Campus',
    cell: ({ row }) => <span>{row.original.city.name}</span>
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },

  {
    id: 'genre',
    header: 'Genre',
    cell: ({ row }) => <span>{row.original.genre.name}</span>
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    id: 'createdDate',
    header: 'Created date',
    cell: ({ row }) => (
      <span>
        {format(new Date(row.original.createdDate), 'HH:mm dd/MM/yyyy')}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
