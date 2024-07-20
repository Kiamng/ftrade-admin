'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Category } from '@/types/category';
import { Genre } from '@/types/genre';
import { GenreCellAction } from './genre-cell-action';

interface genreColumnsProps {
  fetchGenre: () => Promise<void>;
}

export const genreColumns = ({
  fetchGenre
}: genreColumnsProps): ColumnDef<Genre>[] => [
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
      <GenreCellAction fetchGenre={fetchGenre} data={row.original} />
    )
  }
];
