import { useFetchProductById } from '@/hooks/useQuery/useFetchProductById';
import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, isLoading, error } = useFetchProductById(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Brand: {product.brand}</p>
      <p>Quantity: {product.quantity}</p>
      <div>
        <h3>Images:</h3>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} - ${index + 1}`}
            style={{ width: '100px', height: 'auto', marginRight: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
