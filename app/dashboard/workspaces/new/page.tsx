"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewWorkspacePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const record: Record<string, unknown> = {
      name: formData.get("name"),
      owner_id: formData.get("owner_id"),
      sendgrid_api_key: formData.get("sendgrid_api_key"),
      subscriber_count: formData.get("subscriber_count") ? Number(formData.get("subscriber_count")) : null,
      monthly_sends_used: formData.get("monthly_sends_used") ? Number(formData.get("monthly_sends_used")) : null,
    };

    const { error: insertError } = await supabase.from("workspaces").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/workspaces");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/workspaces" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Workspaces
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Workspace</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="name" className="label">Name</label>
          <input id="name" name="name" type="text" className="input" placeholder="Enter name" required />
        </div>
        <div>
          <label htmlFor="owner_id" className="label">Owner Id</label>
          <input id="owner_id" name="owner_id" type="text" className="input" placeholder="Enter owner id" required />
        </div>
        <div>
          <label htmlFor="sendgrid_api_key" className="label">Sendgrid Api Key</label>
          <input id="sendgrid_api_key" name="sendgrid_api_key" type="text" className="input" placeholder="Enter sendgrid api key" />
        </div>
        <div>
          <label htmlFor="subscriber_count" className="label">Subscriber Count</label>
          <input id="subscriber_count" name="subscriber_count" type="number" className="input" placeholder="Enter subscriber count" />
        </div>
        <div>
          <label htmlFor="monthly_sends_used" className="label">Monthly Sends Used</label>
          <input id="monthly_sends_used" name="monthly_sends_used" type="number" className="input" placeholder="Enter monthly sends used" />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Workspace"}
          </button>
          <Link href="/dashboard/workspaces" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
