import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type={"primary"}>Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  // Create the data object with the priority set to true.
  const data = { priority: true };

  // Update the order with the specified ID using the data object.
  await updateOrder(params.orderId, data);

  return null;
}
