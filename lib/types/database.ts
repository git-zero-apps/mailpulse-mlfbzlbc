// Auto-generated database types from ZERO Builder
// Do not edit manually
export interface Profiles {
  id: string;
  full_name: string;
  role: string;
  subscription_plan: string;
  sender_name: string | null;
  sender_email: string | null;
  reply_to_email: string | null;
  workspace_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfilesInsert {
  full_name: string;
  role?: string;
  subscription_plan?: string;
  sender_name: string | null;
  sender_email: string | null;
  reply_to_email: string | null;
  workspace_id: string | null;
}

export interface Workspaces {
  id?: string;
  name: string;
  owner_id: string;
  sendgrid_api_key: string | null;
  subscriber_count: number;
  monthly_sends_used: number;
  created_at: string;
  updated_at: string;
}

export interface WorkspacesInsert {
  name: string;
  owner_id: string;
  sendgrid_api_key: string | null;
  subscriber_count?: number;
  monthly_sends_used?: number;
}

export interface SubscriberLists {
  id?: string;
  workspace_id: string;
  name: string;
  description: string | null;
  subscriber_count: number;
  created_at: string;
  updated_at: string;
}

export interface SubscriberListsInsert {
  workspace_id: string;
  name: string;
  description: string | null;
  subscriber_count?: number;
}

export interface Subscribers {
  id?: string;
  workspace_id: string;
  list_id: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  source: string;
  tags?: Record<string, unknown> | null;
  subscribed_at: string;
  created_at: string;
  updated_at: string;
}

export interface SubscribersInsert {
  workspace_id: string;
  list_id: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status?: string;
  source?: string;
  tags?: Record<string, unknown> | null;
  subscribed_at?: string;
}

export interface Campaigns {
  id?: string;
  workspace_id: string;
  created_by: string;
  name: string;
  subject_line: string;
  preview_text: string | null;
  body_html: string;
  status: string;
  list_id: string | null;
  segment_filter: Record<string, unknown> | null;
  scheduled_for: string | null;
  sent_at: string | null;
  total_sent?: number | null;
  total_delivered?: number | null;
  total_opened?: number | null;
  total_clicked?: number | null;
  total_bounced?: number | null;
  total_unsubscribed?: number | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignsInsert {
  workspace_id: string;
  created_by: string;
  name: string;
  subject_line: string;
  preview_text: string | null;
  body_html: string;
  status?: string;
  list_id: string | null;
  segment_filter: Record<string, unknown> | null;
  scheduled_for: string | null;
  sent_at: string | null;
  total_sent?: number | null;
  total_delivered?: number | null;
  total_opened?: number | null;
  total_clicked?: number | null;
  total_bounced?: number | null;
  total_unsubscribed?: number | null;
}

export interface CampaignEvents {
  id?: string;
  campaign_id: string;
  subscriber_id: string | null;
  event_type: string;
  sendgrid_message_id: string | null;
  link_url: string | null;
  user_agent: string | null;
  ip_address: string | null;
  event_data: Record<string, unknown> | null;
  created_at: string;
}

export interface CampaignEventsInsert {
  campaign_id: string;
  subscriber_id: string | null;
  event_type: string;
  sendgrid_message_id: string | null;
  link_url: string | null;
  user_agent: string | null;
  ip_address: string | null;
  event_data: Record<string, unknown> | null;
}

export interface SignupForms {
  id?: string;
  workspace_id: string;
  list_id: string;
  name: string;
  fields_to_collect: Record<string, unknown>;
  submit_button_text: string;
  success_message?: string | null;
  form_slug: string;
  embed_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface SignupFormsInsert {
  workspace_id: string;
  list_id: string;
  name: string;
  fields_to_collect?: Record<string, unknown>;
  submit_button_text?: string;
  success_message?: string | null;
  form_slug: string;
  embed_code: string | null;
}

export interface EmailTemplates {
  id?: string;
  workspace_id: string | null;
  name: string;
  body_html: string;
  thumbnail_url: string | null;
  category: string | null;
  is_global: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplatesInsert {
  workspace_id: string | null;
  name: string;
  body_html: string;
  thumbnail_url: string | null;
  category: string | null;
  is_global?: boolean;
}
