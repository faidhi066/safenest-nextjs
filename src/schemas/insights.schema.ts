import { z } from "zod";

// Define allowable priorities
const PriorityEnum = z.enum([
  "Important",
  "Improvement",
  "Opportunity",
  "Urgent",
]);

// Define the innermost structure first
const DetailedInsightSchema = z.object({
  insight_title: z.string(),
  detailed_insight: z.string(),
  implications: z.string(),
  recommended_actions: z.string(),
  priority: PriorityEnum,
});

const InsightsSchema = z.object({
  insights: z.array(DetailedInsightSchema),
  summary: z.string(),
});

const PriorityAssessmentSchema = z.object({
  user_id: z.number(),
  priority: z.array(z.enum(["savings", "debt"])),
});

export const FullInsightsSchema = z.object({
  financial_report_markdown_summary: z.string(),
  // transaction_summary_markdown: z.string(),
  priority_assessment: PriorityAssessmentSchema,
  report_generated_at: z.string(),
  savings_insights: InsightsSchema,
  debt_insights: InsightsSchema,
});

export const RootInsightsSchema = z.object({
  user_id: z.number(),
  insights: FullInsightsSchema,
  updated_at: z.string().datetime(), // ISO 8601 date string with time
  insight_id: z.number(),
});

// Optional: Export type from Zod schema
export type RootInsights = z.infer<typeof RootInsightsSchema>;
export type FullInsights = z.infer<typeof FullInsightsSchema>;
