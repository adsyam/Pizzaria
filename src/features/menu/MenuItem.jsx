import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";


/**
 * Renders a menu item for a pizza.
 * 
 * @param {Object} pizza - The pizza object containing information about the pizza.
 * @param {string} pizza.id - The ID of the pizza.
 * @param {string} pizza.name - The name of the pizza.
 * @param {number} pizza.unitPrice - The unit price of the pizza.
 * @param {string[]} pizza.ingredients - The ingredients of the pizza.
 * @param {boolean} pizza.soldOut - Indicates if the pizza is sold out.
 * @param {string} pizza.imageUrl - The URL of the pizza's image.
 */
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  // Get the current quantity of the pizza from the Redux store
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  // Check if the pizza is already in the cart
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    // Dispatch the 'addItem' action to add the item to the cart
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-50 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
