import { Product } from '@/types/product';
import Image from 'next/image';
import defaultimg from '@/assets/img/default-img.webp';
import defaultUserImg from '@/assets/user/default-avatar-icon-of-social-media-user-vector.jpg';
import { Badge } from '@/components/ui/badge';
import { Account } from '@/types/account';
import { format } from 'date-fns';
interface ProductDetailProps {
  product: Product | undefined;
  creator: Account | undefined;
}

const ProductDetail = ({ product, creator }: ProductDetailProps) => {
  const createdDate = product?.createdDate
    ? new Date(product.createdDate)
    : undefined;
  const formattedDate = createdDate
    ? format(createdDate, 'HH:mm dd/MM/yyyy')
    : '';
  return (
    <div className="flex w-full justify-center">
      <div className="mb-10 flex flex-col space-y-6">
        <h2 className="text-3xl font-semibold ">{product?.title}</h2>
        <div className="flex space-x-6">
          <div className="h-full">
            <img
              src={product?.imagePro ? product.imagePro : defaultimg.src}
              alt="image"
              width={585}
              height={390}
              className="rounded-2xl object-cover"
            ></img>
          </div>
          <div className="information w-[585px]  space-y-3">
            <div className="flex w-full items-center space-x-2 border-b pb-4">
              <Image
                src={creator?.avatarUrl ? creator?.avatarUrl : defaultUserImg}
                alt="user Avatar"
                width={36}
                height={36}
                className="rounded-full object-fill"
              ></Image>
              <p className="text-xl font-medium">{creator?.userName}</p>
            </div>
            <div className="flex w-full justify-between">
              <Badge className="text-2xl font-normal">
                {product?.price === 0 ? 'Free' : `${product?.price} VND`}
              </Badge>
              <Badge className="text-2xl font-normal">
                {product?.genre.name}
              </Badge>
            </div>
            <div className="min-h-[275px] w-full space-y-2 rounded-2xl bg-slate-100 p-4">
              <div className="grid h-[70px] w-full grid-cols-2 gap-0 border-b">
                <p className="font-semibold">
                  Category :
                  <span className="font-normal"> {product?.category.name}</span>
                </p>
                <p className="font-semibold">
                  Campus :
                  <span className="font-normal"> {product?.city.name}</span>
                </p>
                <p className="font-semibold">
                  Quantity :
                  <span className="font-normal"> {product?.quantity}</span>
                </p>
                <p className="font-semibold">
                  Created at :
                  <span className="font-normal">{formattedDate}</span>
                </p>
              </div>
              <div className="w-full font-semibold">
                Description :{' '}
                <span className="font-normal"> {product?.description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
