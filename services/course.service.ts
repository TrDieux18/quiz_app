import { api } from "@/services/api";
import { Course, CourseDetail } from "@/types/course.types";

export class CourseService {
  static async getAllCourses(): Promise<Course[]> {
    const res = await api.get("/course");
    return res.data;
  }

  static async getCourseDetail(id: string): Promise<CourseDetail> {
    const res = await api.get(`/course/${id}`);
    return res.data;
  }
}
