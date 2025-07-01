import instance from "@/lib/axios/instace";

const ReviewServices = {
  getAllReviews: () => instance.get("/api/reviews"),
  addReview: (data: any) => instance.post("/api/reviews", data),
};

export default ReviewServices;
