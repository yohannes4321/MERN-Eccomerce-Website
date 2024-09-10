
import SummaryApi from "../common";
const fetchWiseProduct = async (category) => {
  try {
    const response = await fetch(SummaryApi.categoryWiseCategoryProduct.url, {
      method: 'POST',  // Ensure this matches your API endpoint method
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category })  // Ensure category is being passed correctly
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const dataResponse = await response.json();
    console.log("Data received:", dataResponse);  // Verify the structure of the response
    return dataResponse;
  } catch (error) {
    console.error("Error fetching category-wise product:", error);
    return { data: [] };  // Return an empty array in case of error
  }
};
export default fetchWiseProduct