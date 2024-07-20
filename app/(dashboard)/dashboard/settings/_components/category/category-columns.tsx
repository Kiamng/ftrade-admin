'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CategoryCellAction } from './category-cell-action';
import { Category } from '@/types/category';

interface categoryColumnsProps {
  fetchCategory: () => Promise<void>;
}

export const categoryColumns = ({
  fetchCategory
}: categoryColumnsProps): ColumnDef<Category>[] => [
  {
    id: 'number',
    header: 'No.',
    cell: ({ row }) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span>{row.original.name}</span>
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CategoryCellAction fetchCategory={fetchCategory} data={row.original} />
    )
  }
];
