"use client";

import { useEffect, useState } from "react";
import { Globe2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type DnsAnswer = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

type DnsResponse = {
  Status: number;
  Question?: Array<{ name: string; type: number }>;
  Answer?: DnsAnswer[];
};

type GeoResponse = {
  country?: string;
  region?: string;
  city?: string;
  isp?: string;
};

export default function DnsQueryTool() {
  const [endpoint, setEndpoint] = useState("");
  const [domain, setDomain] = useState("sec.hn.cn");
  const [type, setType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DnsResponse | null>(null);
  const [geo, setGeo] = useState<GeoResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function loadConfig() {
      const response = await fetch("/api/info.json");
      const config = await response.json();
      if (!active) return;
      setEndpoint(config.api.doh.endpoint);
    }

    loadConfig().catch(() => {
      setError("无法读取 DOH 配置，请稍后再试。");
    });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) return;

    setLoading(true);
    setError("");
    setGeo(null);

    try {
      const response = await fetch(
        `${endpoint}?name=${encodeURIComponent(domain.trim())}&type=${encodeURIComponent(type)}`,
        {
          headers: {
            Accept: "application/dns-json",
          },
        }
      );
      const data = (await response.json()) as DnsResponse;
      setResult(data);

      const firstAddress = data.Answer?.find((answer) => answer.type === 1)?.data;
      if (firstAddress) {
        const configResponse = await fetch("/api/info.json");
        const config = await configResponse.json();
        const geoEndpoint = config.api.ipGeoLocationNew.endpoint.replace("{ip}", firstAddress);
        const geoResponse = await fetch(geoEndpoint);
        const geoData = await geoResponse.json();
        setGeo(geoData);
      }
    } catch (currentError) {
      setResult(null);
      setError("查询失败，请确认域名格式或稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <section className="glass-card p-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          <Globe2 className="h-4 w-4" />
          DOH Console
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-slate-950">DNS 查询</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          配置来自 `/api/info.json`，因此页面可以跟随静态配置一起部署，不依赖运行时后端。
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-[1fr_160px]">
            <input
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              className="h-12 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
              placeholder="输入域名，例如 sec.hn.cn"
            />
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="h-12 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
            >
              {["A", "AAAA", "CNAME", "MX", "TXT", "NS"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              {loading ? "查询中..." : "开始查询"}
            </Button>
            <div className="text-sm text-slate-500">当前 DOH 端点：{endpoint || "载入中..."}</div>
          </div>
        </form>

        <div className="soft-output-panel mt-8 p-4 text-sm">
          {error ? (
            <div className="text-rose-500">{error}</div>
          ) : result ? (
            <pre className="overflow-x-auto whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          ) : (
            <div className="text-slate-500">查询结果会显示在这里。</div>
          )}
        </div>
      </section>

      <aside className="glass-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">地理信息</p>
        <h3 className="mt-4 text-2xl font-semibold text-slate-950">地址附加信息</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          如果查询结果中包含 A 记录，会尝试读取 IP 所在地区信息作为辅助参考。
        </p>
        <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5">
          {geo ? (
            <div className="space-y-3 text-sm text-slate-700">
              <div>国家 / 地区：{geo.country ?? "未知"}</div>
              <div>区域：{geo.region ?? "未知"}</div>
              <div>城市：{geo.city ?? "未知"}</div>
              <div>ISP：{geo.isp ?? "未知"}</div>
            </div>
          ) : (
            <div className="text-sm text-slate-500">暂无附加信息。</div>
          )}
        </div>
      </aside>
    </div>
  );
}
