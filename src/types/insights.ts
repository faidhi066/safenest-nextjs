export interface RootInsights {
  message: string;
  user_id: number;
  full_insights_payload: FullInsightsPayload;
}

export interface FullInsightsPayload {
  financial_report_markdown_summary: string;
  transaction_summary_markdown: string;
  priority_assessment: PriorityAssessment;
  report_generated_at: string;
  savings_insights: Insights;
  debt_insights: Insights;
}

export interface PriorityAssessment {
  user_id: number;
  priority: string[];
}

export interface Insights {
  insights: DetailedInsight[];
  summary: string;
}

export interface DetailedInsight {
  insight_title: string;
  detailed_insight: string;
  implications: string;
  recommended_actions: string;
  priority: string;
}
