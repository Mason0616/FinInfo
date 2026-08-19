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

export type PublicReport = {
  slug: string;
  title: string;
  topic: string;
  updatedAt: string;
  readingMinutes: number;
  conclusion: string;
  tags: string[];
  sourceCount: number;
  whatHappened: string;
  whyItMatters: string;
  evidence: { label: string; url: string; note: string }[];
  uncertainty: string[];
  watchQuestions: string[];
  fullAnalysis: { heading: string; body: string }[];
};
