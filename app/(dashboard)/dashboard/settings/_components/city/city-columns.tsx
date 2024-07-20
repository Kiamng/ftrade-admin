'use client';
import { ColumnDef } from '@tanstack/react-table';
import { City } from '@/types/city';
import { CityCellAction } from './city-cell-action';

interface cityColumnsProps {
  fetchCity: () => Promise<void>;
}

export const cityColumns = ({
  fetchCity
}: cityColumnsProps): ColumnDef<City>[] => [
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
      <CityCellAction fetchCity={fetchCity} data={row.original} />
    )
  }
];
