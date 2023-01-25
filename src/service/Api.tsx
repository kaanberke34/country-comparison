import axios from "axios";
import Countries from "../models/Countries";

const Api = {
  get: async () => {
    try {
      const response = await axios.get<Countries[]>(
        "https://restcountries.com/v2/all?fields=name,region,area",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  },
  post: function () {},
};

export default Api;
