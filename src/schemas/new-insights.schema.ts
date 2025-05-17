import { z } from "zod";

export const InsightSchema = z.object({
  insight_title: z.string(),
  detailed_insight: z.string(),
  implications: z.string(),
  recommended_actions: z.string(),
  priority: z.string(),
});

export const PriorityAssessmentSchema = z.object({
  user_id: z.number(),
  priority: z.array(z.string()),
});

export const SavingsInsightsSchema = z.object({
  insights: z.array(InsightSchema),
  summary: z.string(),
});

export const DebtInsightsSchema = z.object({
  insights: z.array(InsightSchema),
  summary: z.string(),
});

export const NewInsightsRootSchema = z.object({
  financial_report_markdown_summary: z.string(),
  transaction_summary_markdown: z.string(),
  priority_assessment: PriorityAssessmentSchema,
  report_generated_at: z.string(),
  savings_insights: SavingsInsightsSchema,
  debt_insights: DebtInsightsSchema,
});

// Optional: Export type from Zod schema
export type NewInsightsRootSchema = z.infer<typeof NewInsightsRootSchema>;
