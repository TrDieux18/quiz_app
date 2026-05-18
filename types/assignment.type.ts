export type Assignment = {
  id: string;
  name: string;
  intro: string;
  introformat: number;
  duedate: string;
  allowsubmissionsfromdate: string;
  cutoffdate: string;
  gradingduedate: string;
  grade: string;
  timemodified: string;
};

export type Plugin = {
  id: string;
  plugin: string;
  name: string;
  subtype: string;
  value: string;
};
