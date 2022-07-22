import axios from "axios";

export const updateStatusOrder = async (authtoken, orderId, orderStatus) =>
  await axios.put(
    process.env.REACT_APP_API + "/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getOrderAdmin = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/admin/orders", {
    headers: {
      authtoken,
    },
  });
};
