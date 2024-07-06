import BreadCrumb from '@/components/breadcrumb';
import ProductPendingList from './_components/product-pending-list';
const breadcrumbItems = [{ title: 'Product', link: '/dashboard/product' }];
const ProductPage = () => {
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProductPendingList />
    </div>
  );
};
export default ProductPage;
