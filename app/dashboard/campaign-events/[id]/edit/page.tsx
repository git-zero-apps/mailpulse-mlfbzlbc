"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditCampaignEventPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchRecord() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("campaign_events")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) setError(error.message);
      else setRecord(data);
      setFetching(false);
    }
    fetchRecord();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    const updates: Record<string, unknown> = {
      campaign_id: formData.get("campaign_id"),
      subscriber_id: formData.get("subscriber_id"),
      event_type: formData.get("event_type"),
      sendgrid_message_id: formData.get("sendgrid_message_id"),
      link_url: formData.get("link_url"),
      user_agent: formData.get("user_agent"),
      ip_address: formData.get("ip_address"),
      event_data: formData.get("event_data"),
    };

    const { error: updateError } = await supabase
      .from("campaign_events")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/campaign-events");
      router.refresh();
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <p className="text-sm text-red-700">Campaign Event not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/campaign-events" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Campaign Events
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Campaign Event</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="campaign_id" className="label">Campaign Id</label>
          <input id="campaign_id" name="campaign_id" type="text" className="input" defaultValue={String(record.campaign_id ?? "")} required />
        </div>
        <div>
          <label htmlFor="subscriber_id" className="label">Subscriber Id</label>
          <input id="subscriber_id" name="subscriber_id" type="text" className="input" defaultValue={String(record.subscriber_id ?? "")} />
        </div>
        <div>
          <label htmlFor="event_type" className="label">Event Type</label>
          <input id="event_type" name="event_type" type="text" className="input" defaultValue={String(record.event_type ?? "")} required />
        </div>
        <div>
          <label htmlFor="sendgrid_message_id" className="label">Sendgrid Message Id</label>
          <input id="sendgrid_message_id" name="sendgrid_message_id" type="text" className="input" defaultValue={String(record.sendgrid_message_id ?? "")} />
        </div>
        <div>
          <label htmlFor="link_url" className="label">Link Url</label>
          <input id="link_url" name="link_url" type="url" className="input" defaultValue={String(record.link_url ?? "")} />
        </div>
        <div>
          <label htmlFor="user_agent" className="label">User Agent</label>
          <input id="user_agent" name="user_agent" type="text" className="input" defaultValue={String(record.user_agent ?? "")} />
        </div>
        <div>
          <label htmlFor="ip_address" className="label">Ip Address</label>
          <input id="ip_address" name="ip_address" type="text" className="input" defaultValue={String(record.ip_address ?? "")} />
        </div>
        <div>
          <label htmlFor="event_data" className="label">Event Data</label>
          <input id="event_data" name="event_data" type="text" className="input" defaultValue={String(record.event_data ?? "")} />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Campaign Event"}
          </button>
          <Link href="/dashboard/campaign-events" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
