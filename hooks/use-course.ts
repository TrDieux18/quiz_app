import { CourseService } from "@/services/course.service";
import { useQuery } from "@tanstack/react-query";

// Query Keys
export const COURSES_QUERY_KEY = ["courses"];

export function COURSE_DETAIL_QUERY_KEY(id: string) {
  return ["courses", id];
}

// Queries
export function useCoursesQuery() {
  return useQuery({
    queryKey: COURSES_QUERY_KEY,
    queryFn: () => CourseService.getAllCourses(),
  });
}

export function useCourseDetailQuery(id: string | undefined) {
  return useQuery({
    queryKey: COURSE_DETAIL_QUERY_KEY(id || ""),
    queryFn: () => CourseService.getCourseDetail(id || ""),
    enabled: !!id,
  });
}
