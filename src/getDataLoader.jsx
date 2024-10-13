import customAPI from "./api";

export const loader = async ({ request }) => {
  try {
    const { data } = await customAPI.get("/product?limit=4");

    const products = data.data;
    return { products };
  } catch (error) {
    console.log(error);
  }
};
