import SummaryApi from "../common/index";
import { toast } from "react-toastify";

const AddToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await fetch(SummaryApi.Add_to_cart.url, {
      method: SummaryApi.Add_to_cart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const responseData = await response.json();

    // Ensure responseData has a consistent format
    return {
      success: responseData.success || false,
      message: responseData.message || "An error occurred.",
      error: responseData.error || false
    };
  } catch (error) {
    toast.error("An error occurred while adding the item to the cart.");
    return {
      success: false,
      message: "An error occurred while adding the item to the cart.",
      error: true
    };
  }
};

export default AddToCart;
