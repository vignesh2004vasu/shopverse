
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg slide-up"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-medium leading-tight line-clamp-2">{product.title}</h3>
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
