export type Signal = {
  id: string;
  source: string;
  publishedAt: string;
  priority: number;
  title: string;
  summary: string;
  tags: string[];
  topic: string;
  brief: string;
};

export type ResearchDimension = {
  number: string;
  title: string;
  content: string;
  citation: string;
};
