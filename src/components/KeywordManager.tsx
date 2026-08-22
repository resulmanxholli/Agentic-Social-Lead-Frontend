import { type FC, type FormEvent, useState } from 'react';
import type { Keyword } from '../api/types';

interface KeywordManagerProps {
  keywords: Keyword[];
  onAdd: (input: { keyword: string; cron: string }) => Promise<void>;
  onToggle: (id: string, enabled: boolean) => Promise<void>;
}

const KeywordManager: FC<KeywordManagerProps> = ({ keywords, onAdd, onToggle }) => {
  const [keywordInput, setKeywordInput] = useState('');
  const [cronInput, setCronInput] = useState('0 * * * *');
  const [submitting, setSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!keywordInput.trim() || !cronInput.trim()) return;
    setSubmitting(true);
    try {
      await onAdd({ keyword: keywordInput.trim(), cron: cronInput.trim() });
      setKeywordInput('');
      setCronInput('0 * * * *');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    setTogglingId(id);
    try {
      await onToggle(id, enabled);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="keyword" className="text-xs font-medium text-gray-500">
            Keyword
          </label>
          <input
            id="keyword"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="e.g. final expense leads"
            className="w-56 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cron" className="text-xs font-medium text-gray-500">
            Cron schedule
          </label>
          <input
            id="cron"
            value={cronInput}
            onChange={(e) => setCronInput(e.target.value)}
            placeholder="0 * * * *"
            className="w-40 rounded-md border border-gray-300 px-3 py-1.5 font-mono text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !keywordInput.trim() || !cronInput.trim()}
          className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Adding…' : 'Add keyword'}
        </button>
      </form>

      {keywords.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-400">
          No keywords configured.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Keyword
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Cron
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Added
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((kw) => (
                <tr key={kw._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3.5 font-semibold text-gray-900">{kw.keyword}</td>
                  <td className="px-4 py-3.5 font-mono text-gray-600">{kw.cron}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${
                        kw.enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {kw.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500">
                    {new Date(kw.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleToggle(kw._id, !kw.enabled)}
                      disabled={togglingId === kw._id}
                      className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-50"
                    >
                      {kw.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KeywordManager;
