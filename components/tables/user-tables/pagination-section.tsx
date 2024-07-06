import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination';

interface PaginationSectionProps {
  totalPages: number;
  inputValue: number;
  currentPageNum: number;
  isEdit: boolean;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  addInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  enterInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePageClick: () => void;
}

const PaginationSection = ({
  totalPages,
  inputValue,
  currentPageNum,
  isEdit,
  handlePreviousPage,
  handleNextPage,
  addInput,
  enterInput,
  handlePageClick
}: PaginationSectionProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreviousPage()}
            disabled={currentPageNum === 1}
          >
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          {isEdit ? (
            <div className="flex justify-end">
              <Input
                value={inputValue}
                onKeyDown={(e) => enterInput(e)}
                onChange={(e) => addInput(e)}
                className="w-[70px]"
                type="number"
              />
            </div>
          ) : (
            <PaginationLink onClick={handlePageClick}>
              {currentPageNum}/{totalPages}
            </PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNextPage()}
            disabled={currentPageNum === totalPages}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationSection;
