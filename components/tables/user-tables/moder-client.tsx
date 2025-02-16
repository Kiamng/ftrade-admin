'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { UserTableData, UserListInfor } from '@/types/users';
import { useSession } from 'next-auth/react';
import { getModer } from '@/app/api/user/user.api';
import { Skeleton } from '@/components/ui/skeleton';
import PaginationSection from './pagination-section';

export const ModerClient = () => {
  const router = useRouter();
  // Array of users
  const [userList, setUserList] = useState<UserTableData[]>([]);

  // Information of response which included an array of users
  const [userListInfor, setUserListInfor] = useState<UserListInfor>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(1);

  const session = useSession();
  const handleNextPage = () => {
    setCurrentPageNum(currentPageNum + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1);
    }
  };
  const handlePageClick = () => {
    setIsEdit(true);
  };

  const addInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = parseInt(e.target.value);
    if (num < 0) {
      num = -num;
    }

    if (num === 0) {
      num = 1;
    }

    if (num > userListInfor?.totalPages!) {
      num = userListInfor?.totalPages!;
    }
    setInputValue(num);
  };

  const enterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (userListInfor !== null) {
      if (e.code === 'Enter' && inputValue <= userListInfor?.totalPages!) {
        setCurrentPageNum(inputValue);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (session.data !== null) {
        try {
          setIsLoading(true);
          const response = await getModer(
            10,
            currentPageNum,
            session.data.user?.token
          );
          setUserListInfor(response);
          const formatData = response.items.map((item: UserTableData) => ({
            ...item,
            phoneNumber: item.phoneNumber ?? 'No data'
          }));
          setUserList(formatData);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [currentPageNum]);

  return (
    <>
      <div className="flex items-start justify-between">
        {isLoading ? (
          <div className="flex h-14 flex-col justify-between">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        ) : (
          <Heading
            title={`Moderators (${userListInfor?.totalItem})`}
            description="Manage moderators (Client side table functionalities.)"
          />
        )}

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        isLoading={isLoading}
        searchKey="userName"
        columns={columns}
        data={userList}
      />
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <PaginationSection
            addInput={addInput}
            currentPageNum={currentPageNum}
            enterInput={enterInput}
            handleNextPage={handleNextPage}
            handlePageClick={handlePageClick}
            handlePreviousPage={handlePreviousPage}
            inputValue={inputValue}
            isEdit={isEdit}
            totalPages={userListInfor?.totalPages as number}
          />
        </div>
      </div>
    </>
  );
};
