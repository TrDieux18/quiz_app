export type Course = {
  id: number;
  fullname: string;
  shortname: string;
  category: string;
  sortorder: number;
  summary: string;
  summaryformat: number;
  idnumber: string;
  format: string;
  showgrades: number;
  newsitems: number;
  startdate: number;
  enddate: number;
};

export type Module = {
  id: number;
  name: string;
  modname: string;
  instance: number;
  contextid: number;
  icon: string;
  url: string;
};

export type Section = {
  id: number;
  name: string;
  section_number: number;
  summary: string;
  modules: Module[];
};

export type Teacher = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
};

export type CourseDetail = Course & {
  sections: Section[];
  teachers: Teacher[];
};
