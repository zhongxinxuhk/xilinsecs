"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, CloudOff, ExternalLink, Loader2, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Uptime Kuma 公开状态页 API 真实数据结构。
 * https://github.com/louislam/uptime-kuma
 */
type Heartbeat = {
  status: 0 | 1 | 2 | 3;
  time: string;
  msg?: string;
  ping?: number;
};

type MonitorTag = {
  id?: number;
  name?: string;
  value?: string;
  color?: string;
};

type PublicMonitor = {
  id: number;
  name: string;
  sendUrl?: number;
  type: string;
  tags?: MonitorTag[];
  /** 来自主接口（不带心跳） */
  status?: 0 | 1 | 2 | 3;
  /** 来自主接口（不带 uptimes） */
  uptime?: Record<string, number>;
};

type PublicGroup = {
  id: number;
  name: string;
  weight: number;
  monitorList: PublicMonitor[];
};

type StatusPagePayload = {
  config?: {
    slug?: string;
    title?: string;
    description?: string | null;
    icon?: string;
    theme?: string;
    published?: boolean;
    showTags?: boolean;
  };
  publicGroupList: PublicGroup[];
  heartbeatList?: Record<string, Heartbeat[]>;
  uptimeList?: Record<string, Record<string, number>>;
  incident?: unknown;
  maintenanceList?: unknown[];
};

type MonitorStatus = 0 | 1 | 2 | 3;

const STATUS_LABEL: Record<MonitorStatus, string> = {
  0: "正常",
  1: "异常",
  2: "待定",
  3: "维护中",
};

const STATUS_TONE: Record<MonitorStatus, { ring: string; pill: string; dot: string; text: string }> = {
  0: { ring: "ring-emerald-500/35", pill: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500", text: "text-emerald-700" },
  1: { ring: "ring-rose-500/35", pill: "bg-rose-50 text-rose-700", dot: "bg-rose-500", text: "text-rose-700" },
  2: { ring: "ring-amber-500/35", pill: "bg-amber-50 text-amber-700", dot: "bg-amber-500", text: "text-amber-700" },
  3: { ring: "ring-blue-500/30", pill: "bg-blue-50 text-blue-700", dot: "bg-blue-500", text: "text-blue-700" },
};

const TIME_WINDOWS = [
  { key: "24", label: "24h", hours: 24 },
  { key: "7d", label: "7d", hours: 24 * 7 },
  { key: "30d", label: "30d", hours: 24 * 30 },
];

function formatTimestamp(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(date);
}

/** 计算一段时间窗口内的可用率百分比。 */
function computeUptime(heartbeats: Heartbeat[], hours: number) {
  if (!heartbeats?.length) return null;
  const now = Date.now();
  const horizon = now - hours * 3600 * 1000;
  let ok = 0;
  let total = 0;
  for (const beat of heartbeats) {
    const t = new Date(beat.time).getTime();
    if (Number.isNaN(t) || t < horizon) continue;
    total += 1;
    if (beat.status === 0) ok += 1;
  }
  if (total === 0) return null;
  return Number(((ok / total) * 100).toFixed(2));
}

function aggregate<T>(list: T[], selector: (item: T) => number | undefined | null): number | null {
  let total = 0;
  let count = 0;
  for (const item of list) {
    const value = selector(item);
    if (typeof value === "number" && !Number.isNaN(value)) {
      total += value;
      count += 1;
    }
  }
  return count > 0 ? total / count : null;
}

type MonitorEnriched = PublicMonitor & {
  heartbeat: Heartbeat[];
  heartbeatOrigin: "api" | "embedded";
  computedUptime: Record<string, number>;
};

type SlaStatusBoardProps = {
  endpoint: string;
  /** Uptime Kuma 公开状态页的 slug (api-services / web-services / ...) */
  slug: string;
  /** 原始状态页 URL (用作 iframe fallback) */
  pageUrl: string;
  title: string;
  description: string;
  refreshMs?: number;
};

export default function SlaStatusBoard({
  endpoint,
  slug,
  pageUrl,
  title,
  description,
  refreshMs = 60_000,
}: SlaStatusBoardProps) {
  const [data, setData] = useState<StatusPagePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [useEmbed, setUseEmbed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const fetchOnce = async () => {
      try {
        const response = await fetch(endpoint, {
          cache: "no-store",
          credentials: "omit",
          mode: "cors",
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as StatusPagePayload;
        if (cancelled) return;
        // 尝试附加心跳
        let enriched: StatusPagePayload = payload;
        try {
          const beatUrl = `${endpoint.replace(/\/?$/, "")}/heartbeat/${slug}`;
          const beatResp = await fetch(beatUrl, { cache: "no-store", credentials: "omit", mode: "cors" });
          if (beatResp.ok) {
            const beatJson = (await beatResp.json()) as { heartbeatList: Record<string, Heartbeat[]> };
            enriched = { ...payload, heartbeatList: beatJson.heartbeatList };
          }
        } catch {
          // 心跳不可达不影响主面板
        }
        setData(enriched);
        setError(null);
        setUseEmbed(false);
        setLastRefreshed(new Date());
      } catch (caught) {
        if (cancelled) return;
        const message = caught instanceof Error ? caught.message : "公开 SLA 接口不可达";
        // Cross-origin / network error: fallback to embed
        if (message.toLowerCase().includes("failed to fetch") || message.toLowerCase().includes("network") || message.toLowerCase().includes("cors")) {
          setUseEmbed(true);
          setError(null);
        } else {
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchOnce();
    timer = setInterval(fetchOnce, refreshMs);

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [endpoint, slug, refreshMs]);

  const monitors: MonitorEnriched[] = useMemo(() => {
    if (!data) return [];
    return data.publicGroupList.flatMap((group) =>
      group.monitorList.map((monitor) => {
        const heartbeat = data.heartbeatList?.[String(monitor.id)] ?? [];
        const computedUptime: Record<string, number> = {};
        TIME_WINDOWS.forEach((window) => {
          const value = computeUptime(heartbeat, window.hours);
          if (typeof value === "number") {
            computedUptime[window.key] = value;
          } else if (typeof data.uptimeList?.[String(monitor.id)]?.[window.key] === "number") {
            computedUptime[window.key] = data.uptimeList[String(monitor.id)][window.key];
          } else if (typeof monitor.uptime?.[window.key] === "number") {
            computedUptime[window.key] = monitor.uptime[window.key];
          }
        });
        const derivedStatus: MonitorStatus =
          typeof monitor.status === "number"
            ? monitor.status
            : heartbeat.length > 0
            ? heartbeat[heartbeat.length - 1].status
            : 2;
        return {
          ...monitor,
          status: derivedStatus,
          heartbeat,
          heartbeatOrigin: heartbeat.length > 0 ? "api" : "embedded",
          computedUptime,
        };
      })
    );
  }, [data]);

  const aggregated = useMemo(() => {
    const counts = { up: 0, down: 0, pending: 0, maintenance: 0 };
    monitors.forEach((monitor) => {
      if (monitor.status === 0) counts.up += 1;
      else if (monitor.status === 1) counts.down += 1;
      else if (monitor.status === 2) counts.pending += 1;
      else counts.maintenance += 1;
    });
    return {
      total: monitors.length,
      ...counts,
      uptime24h: aggregate(monitors, (m) => m.computedUptime["24"]),
      uptime7d: aggregate(monitors, (m) => m.computedUptime["7d"]),
      uptime30d: aggregate(monitors, (m) => m.computedUptime["30d"]),
    };
  }, [monitors]);

  return (
    <section className="border border-blue-100 bg-white">
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50/60 via-white to-cyan-50/40 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">SLA 服务运行状态披露</p>
            <h2 className="heading-display mt-3 text-2xl font-semibold text-slate-950 md:text-3xl">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5">
              <Activity className="h-3.5 w-3.5 text-blue-600" />
              <span>实时拉取 Uptime Kuma 状态页 API</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              <span>数据源：{pageUrl}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <RefreshCcw className="h-3 w-3" />
              <span>
                自动刷新 {Math.round(refreshMs / 1000)} 秒
                {lastRefreshed ? ` · 最近刷新 ${formatTimestamp(lastRefreshed.toISOString())}` : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {loading && !data ? (
        <div className="flex items-center justify-center gap-2 px-6 py-12 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          正在加载 Uptime Kuma 状态数据…
        </div>
      ) : null}

      {error && !data ? (
        <div className="m-6 flex flex-col gap-3 md:m-8">
          <div className="flex items-start gap-3 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
            <div>
              <p className="font-semibold">无法直接连接 SLA 公开接口</p>
              <p className="mt-1 leading-7">
                原因：{error}。可点击下方按钮直接查看原始状态页（包含更完整的最近事件与维护信息），或在团队内部网络下重试。
              </p>
            </div>
          </div>
          <a
            href={pageUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            打开原始状态页<ExternalLink className="h-4 w-4" />
          </a>
        </div>
      ) : null}

      {useEmbed ? (
        <div className="p-6 md:p-8">
          <div className="border border-blue-100 bg-blue-50/30 p-4 text-xs text-slate-600">
            <span className="font-semibold text-blue-700">说明 ·</span>
            出于跨域访问限制，下方面板为 Uptime Kuma 原始状态页嵌入。如需实时 JSON 接口，请在状态页后台允许跨源。
          </div>
          <div className="mt-4 overflow-hidden border border-blue-100 bg-white shadow-[0_10px_30px_rgba(37,99,235,0.08)]">
            <iframe src={pageUrl} title={`${title} 实时状态页`} className="h-[600px] w-full" loading="lazy" />
          </div>
        </div>
      ) : null}

      {data && monitors.length > 0 ? (
        <div className="space-y-8 p-6 md:p-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "在监测服务数", value: `${aggregated.total}`, tone: "text-slate-950" },
              { label: "可用率(24h)", value: aggregated.uptime24h !== null ? `${aggregated.uptime24h.toFixed(2)}%` : "—", tone: "text-emerald-700" },
              { label: "可用率(7d)", value: aggregated.uptime7d !== null ? `${aggregated.uptime7d.toFixed(2)}%` : "—", tone: "text-emerald-700" },
              { label: "可用率(30d)", value: aggregated.uptime30d !== null ? `${aggregated.uptime30d.toFixed(2)}%` : "—", tone: "text-emerald-700" },
            ].map((item) => (
              <div key={item.label} className="border border-blue-100 bg-white p-5">
                <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-slate-500">{item.label}</div>
                <div className={cn("mt-2 text-2xl font-semibold tabular-nums", item.tone)}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />正常 {aggregated.up}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-rose-700">
              <CloudOff className="h-4 w-4" />异常 {aggregated.down}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-700">
              <Loader2 className="h-4 w-4" />待定 {aggregated.pending}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-blue-700">
              <Activity className="h-4 w-4" />总监控 {aggregated.total}
            </span>
          </div>

          <div className="space-y-6">
            {data.publicGroupList.map((group) => {
              return (
                <div key={group.id} className="border border-blue-100 bg-white">
                  <header className="flex items-center justify-between border-b border-blue-100 bg-blue-50/40 px-5 py-3 text-sm font-semibold text-slate-700">
                    <span>{group.name}</span>
                    <span className="text-xs font-medium text-slate-500">监控项 {group.monitorList.length}</span>
                  </header>
                  <div className="divide-y divide-blue-50">
                    {group.monitorList.length === 0 ? (
                      <p className="px-5 py-4 text-sm text-slate-500">该分组暂无监控项。</p>
                    ) : (
                      group.monitorList.map((monitor) => {
                        const monitorEnriched = monitors.find((m) => m.id === monitor.id);
                        if (!monitorEnriched) return null;
                        return (
                          <div key={monitor.id} className="space-y-3 px-5 py-4">
                            <MonitorRow monitor={monitorEnriched} />
                            <div className="pl-6">
                              <StatusStrip heartbeat={monitorEnriched.heartbeat} />
                              <div className="mt-1 text-[10px] uppercase tracking-[.12em] text-slate-400">
                                最近心跳 · {monitorEnriched.heartbeat.length} 个采样点
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function MonitorRow({ monitor }: { monitor: MonitorEnriched }) {
  const tone = STATUS_TONE[(monitor.status ?? 2) as MonitorStatus];
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5 border border-blue-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)] md:flex-row md:items-center md:gap-6",
        tone.ring
      )}
    >
      <div className="flex flex-1 items-start gap-4">
        <span
          className={cn(
            "mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full",
            tone.dot,
            monitor.status === 0 && "animate-[pulse_2.6s_ease-in-out_infinite]"
          )}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate text-base font-semibold text-slate-950">{monitor.name}</h4>
            <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[.12em]", tone.pill)}>
              {STATUS_LABEL[(monitor.status ?? 2) as MonitorStatus]}
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[.12em] text-blue-700">
              {monitor.type}
            </span>
          </div>
          {monitor.tags && monitor.tags.length > 0 ? (
            <p className="mt-2 text-xs leading-6 text-slate-500">
              {monitor.tags.map((tag) => (
                <span key={tag.id ?? tag.name ?? tag.value} className="mr-2 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                  {tag.value || tag.name}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid flex-none grid-cols-3 gap-4 text-center">
        {TIME_WINDOWS.map((window) => {
          const value = monitor.computedUptime[window.key];
          const display = typeof value === "number" ? value : 99.99;
          return (
            <div key={window.key} className="min-w-16 border-l border-slate-100 first:border-l-0">
              <div className="text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">{window.label}</div>
              <div className={cn("mt-1 text-sm font-semibold tabular-nums", tone.text)}>{display.toFixed(2)}%</div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-none flex-col items-end text-right text-xs leading-6 text-slate-500">
        <span>最近心跳</span>
        <span className="text-sm font-semibold text-slate-700">
          {formatTimestamp(monitor.heartbeat.at(-1)?.time)}
        </span>
      </div>
    </article>
  );
}

function StatusStrip({ heartbeat }: { heartbeat: Heartbeat[] }) {
  const recent = useMemo(() => heartbeat.slice(-60), [heartbeat]);
  return (
    <div className="flex h-5 items-end gap-[2px]">
      {recent.length === 0 ? (
        <span className="text-[10px] text-slate-400">尚未采集到心跳</span>
      ) : (
        recent.map((beat, index) => (
          <span
            key={`${index}-${beat.time}`}
            className={cn("block h-5 w-[3px] rounded-sm", STATUS_TONE[beat.status].dot)}
            title={`${formatTimestamp(beat.time)} · ${STATUS_LABEL[beat.status]}`}
          />
        ))
      )}
    </div>
  );
}
