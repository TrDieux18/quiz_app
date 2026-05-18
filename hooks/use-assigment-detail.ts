import { getAssignmentDetail } from "@/services/assignment.service";
import { useQuery } from "@tanstack/react-query";

export const useAssignmentDetail = (id: string) => {
  return useQuery({
    queryKey: ["assignment", id],
    queryFn: () => getAssignmentDetail(id),
    enabled: !!id,
  });
};
