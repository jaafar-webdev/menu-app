import TrashIcon from "../../../components/icon/TrashIcon";
import Button from "../../../components/Button";

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="item not-first:mt-2 not-last:border-b border-gray-200 pb-2.5">
      <div className="flex justify-between items-center mb-4">
        <span className="name text-sm font-semibold">{item.product.name}</span>
        <span className="price">
          {(item.product.price * item.quantity).toFixed(2)} EGP
        </span>
      </div>
      <div className="flex flex-row-reverse items-center justify-start gap-2">
        <Button
          variant="destructive"
          size="icon"
          className="h-6 w-6"
          onClick={() => onRemove(item.product.id)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
        <Button
          size="minIcon"
          className="h-6 w-6 text-sm"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
        >
          +
        </Button>
        <span>{item.quantity}</span>
        <Button
          size="minIcon"
          className="h-6 w-6 text-sm"
          onClick={() => {
            if (item.quantity > 1) {
              onUpdateQuantity(item.product.id, item.quantity - 1);
            } else {
              onRemove(item.product.id);
            }
          }}
        >
          -
        </Button>
      </div>
    </div>
  );
}
