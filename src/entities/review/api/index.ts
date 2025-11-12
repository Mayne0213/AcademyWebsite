import { apiGet, apiDelete } from "@/src/shared/api/http";
import { toast } from "sonner";

export interface Review {
  id: number;
  reviewerName: string;
  reviewTitle: string;
  reviewContent: string;
  createdAt: string;
  updatedAt: string;
}

export const reviewApi = {
  readReviews: async (page: number, itemsPerPage: number): Promise<{ reviews: Review[]; totalCount: number }> => {
    try {
      const url = `/api/review?page=${page}&pageSize=${itemsPerPage}`;
      const result = await apiGet<{ reviews: Review[]; totalCount: number }>(url);
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteReview: async (reviewId: number): Promise<void> => {
    try {
      await apiDelete(`/api/review/${reviewId}`);
      toast.success("리뷰가 성공적으로 삭제되었습니다.");
    } catch (error) {
      throw error;
    }
  },
};
