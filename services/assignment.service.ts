import { api } from "@/services/api";
import { Assignment, Plugin } from "@/types/assignment.type";

type AssignmentDetailResponse = {
  assignment: Assignment;
  plugins: Plugin[];
};

export const getAssignmentDetail = async (id: string) => {
  const res = await api.get<AssignmentDetailResponse>(`/assignment/${id}`);
  return res.data;
};
