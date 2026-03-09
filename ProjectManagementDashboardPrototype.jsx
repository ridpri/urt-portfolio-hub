import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Filter,
  Flag,
  FolderKanban,
  FolderTree,
  Goal,
  Grip,
  LayoutDashboard,
  Plus,
  Search,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

const STORAGE_KEY = "urt-portfolio-hub-v2";
const statusOptions = ["Planned", "In Progress", "Review", "Blocked", "Done"];
const priorityOptions = ["Critical", "High", "Medium", "Low"];

const goalsSeed = [
  {
    id: "goal-1",
    title: "Executive Delivery & Strategic Visibility",
    owner: "URT Lead",
    target: 85,
    description: "Mengamankan delivery inisiatif strategis, presentasi manajemen, audit, dan komunikasi eksekutif.",
  },
  {
    id: "goal-2",
    title: "Web Platform & Digital Product Growth",
    owner: "Business x TI",
    target: 80,
    description: "Menguatkan flow user, modul, produk baru, dan stabilitas operasional platform web.",
  },
  {
    id: "goal-3",
    title: "Automation Factory & Renewal Scale-Up",
    owner: "Automation Squad",
    target: 82,
    description: "Meningkatkan coverage otomatisasi underwriting, renewal, dan pemeliharaan RPA existing.",
  },
  {
    id: "goal-4",
    title: "Governance, Risk & Compliance Strengthening",
    owner: "URT Governance",
    target: 88,
    description: "Menjaga kepatuhan, dokumentasi, risk governance, dan kesiapan regulasi.",
  },
  {
    id: "goal-5",
    title: "Policy Administration Excellence & Standardization",
    owner: "Admin Polis Lead",
    target: 84,
    description: "Menstandarkan proses administrasi polis, wording, juknis, dan perbaikan operasional.",
  },
  {
    id: "goal-6",
    title: "Data Visibility, Capability & Operating Model",
    owner: "PMO / Data",
    target: 78,
    description: "Membangun monitoring, pelaporan, tooling internal, capability building, dan operating rhythm tim.",
  },
];

const portfolioBlueprints = [
  {
    id: "portfolio-strategic",
    name: "Strategic & Executive",
    goalId: "goal-1",
    defaultOwner: "URT Lead",
    description: "Inisiatif strategis, komunikasi manajemen, dokumentasi eksekutif, dan milestone reputasional.",
    items: [
      ["2025-01-01", "Audit Kinerja RPA", "Done", 100, "High"],
      [null, "Penggunaan Barcode sebagai pengganti tanda tangan polis", "In Progress", 68, "High"],
      ["2026-03-06", "Perbaikan Sertifikat MRT", "Review", 82, "High"],
      [null, "Komunikasi Strategis & Dokumentasi", "In Progress", 61, "Medium"],
      ["2025-09-17", "Buat Buku Otomatisasi", "Review", 74, "High"],
      ["2026-01-26", "Presentasi RPA untuk Wadirut IFG", "Done", 100, "Critical"],
    ],
  },
  {
    id: "portfolio-web",
    name: "Web Platform & Digital Product",
    goalId: "goal-2",
    defaultOwner: "Product Squad",
    description: "Seluruh inisiatif flow, modul, produk baru, perbaikan, pengembangan, dan tata kelola platform web.",
    items: [
      [null, "Web - Flow Partner User", "In Progress", 57, "Critical"],
      [null, "Web - Flow Internal User", "In Progress", 49, "Critical"],
      [null, "Web - Modul Polis Saya", "Planned", 18, "High"],
      [null, "Web - Modul Layanan Klaim", "Planned", 16, "High"],
      [null, "Web - Modul AI Assist", "In Progress", 33, "High"],
      [null, "Penyempurnaan & Optimasi Sistem Web v1.0.0", "In Progress", 64, "High"],
      [null, "Operasional & Perbaikan Web v1.0.0", "In Progress", 71, "High"],
      [null, "Pengembangan Web v1.0.0", "In Progress", 58, "Critical"],
      [null, "Pelaporan & Tata Kelola Web v1.0.0", "Review", 76, "Medium"],
      [null, "Rekomendasi Implementasi Kepatuhan POJK 8 Tahun 2024 untuk Produk dan Saluran Pemasaran", "Review", 81, "Critical"],
      [null, "Digitalisasi Produk Asuransi", "In Progress", 54, "High"],
      [null, "Web - Produk Baru PSAKI (COB 201)", "In Progress", 44, "High"],
      [null, "Web - Produk Baru PAR (COB 297)", "Planned", 22, "High"],
      [null, "Web - Produk Baru Jasindo Roda 2 (COB 605)", "Planned", 20, "Medium"],
      [null, "Web - Produk Baru Jasindo Oto (COB 601)", "In Progress", 39, "High"],
    ],
  },
  {
    id: "portfolio-automation",
    name: "Automation Factory & Renewal",
    goalId: "goal-3",
    defaultOwner: "Automation Squad",
    description: "Pengembangan RPA baru, rollout renewal digital, dan pemeliharaan automations existing.",
    items: [
      [null, "RPA - COB 718 (CGL Limbah)", "In Progress", 52, "High"],
      [null, "RPA - COB 412 (CPM)", "In Progress", 47, "High"],
      [null, "RPA - Renewal Automatis LOB 2", "In Progress", 59, "High"],
      [null, "RPA - Automatic Cancelation", "Planned", 24, "Medium"],
      [null, "Renewal - Produk Baru PAR (COB 297)", "Planned", 18, "Medium"],
      [null, "Renewal - Produk Baru Kecelakaan Diri (COB 705)", "Planned", 15, "Medium"],
      [null, "RPA - COB 501 & 570", "Planned", 20, "Medium"],
      [null, "RPA - COB 715 (Advertising Sign)", "In Progress", 41, "Medium"],
      [null, "Penyempurnaan & Optimasi Renewal Digital v1.0.0", "In Progress", 69, "High"],
      [null, "Operasional & Perbaikan Renewal Digital v1.0.0", "In Progress", 74, "High"],
      [null, "Pengembangan Renewal Digital v1.0.0", "In Progress", 56, "High"],
      [null, "Pelaporan & Tata Kelola Renewal Digital v1.0.0", "Review", 77, "Medium"],
      ["2025-10-30", "Petunjuk Teknis Penunjukkan Administrator Polis yang Diberikan Wewenang Penerbitan", "Done", 100, "High"],
      [null, "Petunjuk Teknis Renewal Digital", "Review", 79, "High"],
      [null, "Pemeliharaan & Optimalisasi RPA (COB Existing)", "In Progress", 72, "High"],
      [null, "RPA COB 728", "In Progress", 46, "Medium"],
      ["2025-07-02", "RPA 102", "Done", 100, "Medium"],
      ["2025-07-02", "RPA 105", "Done", 100, "Medium"],
      ["2025-09-25", "RPA 203 v3.1.0", "Done", 100, "High"],
      ["2025-09-25", "RPA 297 v2.1.0", "Done", 100, "High"],
      ["2025-12-02", "RPA 201 v3.0.1", "Done", 100, "Critical"],
    ],
  },
  {
    id: "portfolio-governance",
    name: "Governance, Risk & Compliance",
    goalId: "goal-4",
    defaultOwner: "Governance Team",
    description: "Penguatan governance, risk, compliance, PSAK, klausula, dan dokumentasi pengembangan.",
    items: [
      [null, "Penyusunan ROPA dan DPIA", "In Progress", 63, "High"],
      [null, "Permohonan Data Penyusunan Profile Risiko Terintegrasi", "Review", 73, "Medium"],
      [null, "Permohonan Data Penyusunan Risiko Utama Perusahaan Beserta Mitigasinya", "Review", 70, "Medium"],
      [null, "Pemutakhiran Kertas Kerja Risk Register", "In Progress", 66, "High"],
      [null, "Pemantauan Risiko Bulanan Anak Perusahaan", "In Progress", 62, "Medium"],
      [null, "Pengelolaan Biaya Operasional", "In Progress", 58, "Medium"],
      [null, "PSAK 117", "In Progress", 52, "High"],
      [null, "Evaluasi Klausula", "In Progress", 55, "High"],
      [null, "Tata Kelola & Dokumentasi Pengembangan", "Review", 79, "High"],
      [null, "Prosedur Otomatisasi Underwriting", "Review", 76, "Critical"],
      ["2025-07-09", "Petunjuk Teknis Monitoring dan Evaluasi Otomatisasi Underwriting", "Done", 100, "High"],
      ["2025-10-29", "Petunjuk Teknis Monitoring dan Evaluasi Administrasi Polis", "Done", 100, "High"],
    ],
  },
  {
    id: "portfolio-admin",
    name: "Administration Polis & Standardization",
    goalId: "goal-5",
    defaultOwner: "Admin Polis",
    description: "Peningkatan kualitas administrasi polis, juknis operasional, perbaikan kasus, dan standardisasi wording/struktur.",
    items: [
      [null, "Update Polis Induk", "In Progress", 51, "High"],
      [null, "Penanganan Khusus Administrasi Polis", "In Progress", 65, "High"],
      ["2026-02-09", "Permohonan Bantuan Pembatalan Polis Suzuki", "Review", 88, "High"],
      [null, "Peningkatan Operasional Administrasi Polis", "In Progress", 61, "High"],
      ["2026-02-18", "Perbaikan Perhitungan Premi pada Ikhtisar Polis 705", "Done", 100, "High"],
      ["2026-02-09", "Deskripsi File Attachment RPA", "Done", 100, "Medium"],
      ["2026-02-02", "Perbaikan Perhitungan Endorsement", "Done", 100, "High"],
      ["2026-01-29", "Standarisasi penulisan Deductible KBM via RPA", "Done", 100, "Medium"],
      ["2025-06-03", "Perbaikan Upload CSV KBM", "Done", 100, "Medium"],
      ["2025-10-22", "Endorsement Perubahan Due Date", "Done", 100, "Medium"],
      ["2026-01-29", "Polis TLO, Tab Klausulanya Banyak", "Done", 100, "Medium"],
      ["2025-06-16", "Daftar Merk dan Tipe Kendaraan pada LOB 6 KBM", "Done", 100, "Low"],
      ["2025-11-01", "Petunjuk Teknis Penerbitan Polis Aneka", "Done", 100, "High"],
      ["2025-11-01", "Petunjuk Teknis Penerbitan Polis Kesehatan", "Done", 100, "High"],
      ["2025-11-01", "Petunjuk Teknis Penerbitan Polis Kecelakaan Diri", "Done", 100, "High"],
      ["2025-11-01", "Petunjuk Teknis Penerbitan Polis Kredit", "Done", 100, "High"],
      ["2025-10-01", "Petunjuk Teknis Penerbitan Polis KBM", "Done", 100, "High"],
      ["2025-07-29", "Petunjuk Teknis Entri Data Polis Aneka", "Done", 100, "Medium"],
      ["2025-07-22", "Petunjuk Teknis Entri Data Polis Kecelakaan Diri", "Done", 100, "Medium"],
      ["2025-07-07", "Petunjuk Teknis Entri Data Polis KBM", "Done", 100, "Medium"],
      ["2025-03-18", "Petunjuk Teknis Proses Underwriting Otomatis COB 201 v3.0.0", "Done", 100, "Critical"],
      ["2025-07-11", "Petunjuk Teknis Proses Underwriting Otomatis COB 601 v2.2.0", "Done", 100, "Critical"],
      [null, "Tata Kelola Operasional", "In Progress", 57, "High"],
      [null, "Layanan Administrasi Polis & URT Care", "In Progress", 48, "High"],
      [null, "Pengendalian Kualitas Administrasi Polis", "In Progress", 53, "High"],
      [null, "Standardisasi Dokumen & Struktur Polis", "In Progress", 42, "Critical"],
      [null, "Standarisasi LOB 13", "Planned", 14, "Medium"],
      [null, "Standarisasi COB 794", "Planned", 12, "Medium"],
      [null, "Standarisasi LOB 6", "In Progress", 37, "High"],
      [null, "Standarisasi COB 701 - Cash in Transit", "Planned", 16, "Medium"],
      [null, "Standarisasi COB 702 - Cash in Safe", "Planned", 16, "Medium"],
      [null, "Standarisasi COB 703 - Cash in Cashier Box", "Planned", 16, "Medium"],
      [null, "Standarisasi COB 712 - Kebongkaran", "Planned", 15, "Medium"],
      [null, "Standarisasi COB 715 - Advertising Sign", "In Progress", 35, "Medium"],
      [null, "Standarisasi COB 731 - Golf", "Planned", 18, "Low"],
      ["2026-01-26", "Penggunaan Wording Terbaru AAUI", "Done", 100, "High"],
      [null, "Standarisasi COB 778 - Jasindo Micro Insurance", "Planned", 19, "Low"],
    ],
  },
  {
    id: "portfolio-data",
    name: "Data, Monitoring & Internal Tools",
    goalId: "goal-6",
    defaultOwner: "PMO / Data",
    description: "Tools internal, dashboard, pelaporan, data request, mapping proses, dan kontrol proyek lintas portofolio.",
    items: [
      [null, "Manajemen Data & Pelaporan", "In Progress", 59, "High"],
      [null, "Sistem Monitoring Administrasi Polis", "In Progress", 43, "High"],
      [null, "Dashboard Underwriting Otomatis", "In Progress", 46, "High"],
      ["2026-03-02", "Data Piutang", "Review", 80, "Medium"],
      [null, "Pelaporan Data Sipetir (OJK)", "In Progress", 61, "High"],
      [null, "Pemetaan Proses & Standardisasi", "Review", 69, "Medium"],
      [null, "Generator Wording v1.0.0", "Planned", 20, "Medium"],
      [null, "Register Surat Elektronik v1.0.0", "Planned", 24, "Medium"],
      [null, "RPA Task Management Asana v2.0.0", "In Progress", 55, "Critical"],
      [null, "Decision Log v1.0.0", "Planned", 28, "Low"],
      [null, "Error Log", "In Progress", 49, "Medium"],
      [null, "Pengendalian Proyek", "In Progress", 63, "High"],
      [null, "Rencana Kerja Anggaran Perusahaan (RKAP)", "Review", 77, "Medium"],
      [null, "Key Performance Indicator (KPI)", "Review", 74, "High"],
      [null, "Project Management", "In Progress", 66, "Critical"],
      ["2024-10-29", "Inventory", "Done", 100, "Low"],
      [null, "Pelaporan Ikhtisar + Dokumen polis yang digunakan ke OJK", "Review", 72, "High"],
      ["2024-02-01", "Permintaan Data HP All COB", "Done", 100, "Low"],
      [null, "Permintaan Data Performance Review (Harga Pertanggungan)", "Review", 78, "Medium"],
      [null, "PSAK 117 - Permintaan Konfirmasi Flagging STNC Kontrak Terbit 2025", "Review", 83, "Medium"],
    ],
  },
  {
    id: "portfolio-capability",
    name: "Capability, Socialization & Ad-Hoc",
    goalId: "goal-6",
    defaultOwner: "People & Operations",
    description: "Sosialisasi, capability building, change management, mentoring, dan support non-rutin lintas tim.",
    items: [
      [null, "Dukungan Operasional & Ad-Hoc Team 2", "In Progress", 58, "Medium"],
      [null, "Mentoring Pemagangan Kemnaker Batch 2 A.n Gita & Dewi", "In Progress", 67, "Medium"],
      [null, "Dukungan Operasional & Ad-Hoc Team 3", "In Progress", 55, "Medium"],
      [null, "Implementasi AKHLAK", "Review", 73, "Medium"],
      [null, "Change Agent - Ngobras (Ngobrol Santai)", "In Progress", 64, "Low"],
      ["2026-02-13", "Sosialisasi Kebijakan Administrasi Polis", "Done", 100, "High"],
      ["2026-01-19", "Sosiallisasi #2 - RPA", "Done", 100, "Medium"],
      ["2026-01-12", "Sosiallisasi #1 - Renewal Digital", "Done", 100, "Medium"],
      ["2026-02-03", "Sosiallisasi #3 - Web", "Done", 100, "Medium"],
      [null, "Dukungan Operasional & Ad-Hoc Team 4", "In Progress", 56, "Medium"],
      ["2026-02-20", "Digital Capability dan Customer Centricity", "Done", 100, "Low"],
      [null, "Training Excel", "In Progress", 44, "Low"],
      ["2026-01-10", "Operation Manager Masterclass", "Done", 100, "Low"],
      [null, "Coaching", "In Progress", 39, "Low"],
      [null, "Training", "In Progress", 42, "Low"],
      ["2026-01-12", "Pembekalan dan Uji Sertifikasi Manajemen Risiko Jenjang 6", "Done", 100, "Medium"],
      [null, "Meeting & Event SMEA", "In Progress", 52, "Low"],
      [null, "Dukungan Operasional & Ad-Hoc Team 5", "In Progress", 54, "Medium"],
    ],
  },
];

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function buildSubtasks(progress) {
  return [
    { id: makeId(), title: "Analisis & scope", done: progress >= 25 },
    { id: makeId(), title: "Koordinasi stakeholder", done: progress >= 55 },
    { id: makeId(), title: "Implementasi / review akhir", done: progress >= 90 },
  ];
}

function flattenProjects() {
  return portfolioBlueprints.flatMap((portfolio) =>
    portfolio.items.map(([dueDate, title, status, progress, priority]) => ({
      id: makeId(),
      title,
      dueDate,
      status,
      progress,
      priority,
      owner: portfolio.defaultOwner,
      portfolioId: portfolio.id,
      portfolioName: portfolio.name,
      goalId: portfolio.goalId,
      notes: "",
      subtasks: buildSubtasks(progress),
      createdAt: new Date().toISOString(),
    }))
  );
}

const initialProjects = flattenProjects();

function formatDate(value) {
  if (!value) return "Tanpa tanggal";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function statusStyle(status) {
  if (status === "Done") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Blocked") return "bg-rose-50 text-rose-700 border-rose-200";
  if (status === "Review") return "bg-amber-50 text-amber-700 border-amber-200";
  if (status === "In Progress") return "bg-sky-50 text-sky-700 border-sky-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function priorityStyle(priority) {
  if (priority === "Critical") return "bg-[#0B1F3A] text-white";
  if (priority === "High") return "bg-orange-100 text-orange-700";
  if (priority === "Medium") return "bg-slate-200 text-slate-700";
  return "bg-slate-100 text-slate-500";
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function ProgressBar({ value }) {
  return (
    <div className="h-2.5 rounded-full bg-slate-100">
      <div
        className="h-2.5 rounded-full bg-gradient-to-r from-[#0B1F3A] to-orange-500 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function SidebarButton({ icon: Icon, label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition ${
        active ? "bg-[#0B1F3A] text-white" : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      {typeof count === "number" ? (
        <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/15 text-white" : "bg-slate-200 text-slate-600"}`}>
          {count}
        </span>
      ) : null}
    </button>
  );
}

export default function ProjectManagementDashboardPrototype() {
  const [projects, setProjects] = useState(() => {
    if (typeof window === "undefined") return initialProjects;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [activeView, setActiveView] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? null);
  const [showCreate, setShowCreate] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    portfolioId: portfolioBlueprints[0].id,
    status: "Planned",
    progress: 0,
    priority: "Medium",
    owner: "",
    dueDate: "",
    notes: "",
  });
  const [newSubtask, setNewSubtask] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (!selectedId && projects.length) setSelectedId(projects[0].id);
    if (selectedId && !projects.some((project) => project.id === selectedId) && projects.length) {
      setSelectedId(projects[0].id);
    }
  }, [projects, selectedId]);

  const portfolioMap = useMemo(
    () => Object.fromEntries(portfolioBlueprints.map((item) => [item.id, item])),
    []
  );

  const goalMap = useMemo(() => Object.fromEntries(goalsSeed.map((goal) => [goal.id, goal])), []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const q = search.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.owner.toLowerCase().includes(q) ||
        project.portfolioName.toLowerCase().includes(q) ||
        project.status.toLowerCase().includes(q);
      const matchesPortfolio = portfolioFilter === "All" || project.portfolioId === portfolioFilter;
      const matchesStatus = statusFilter === "All" || project.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || project.priority === priorityFilter;
      return matchesSearch && matchesPortfolio && matchesStatus && matchesPriority;
    });
  }, [projects, search, portfolioFilter, statusFilter, priorityFilter]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? filteredProjects[0] ?? null,
    [projects, selectedId, filteredProjects]
  );

  const dashboardMetrics = useMemo(() => {
    const total = projects.length;
    const done = projects.filter((item) => item.status === "Done").length;
    const blocked = projects.filter((item) => item.status === "Blocked").length;
    const inProgress = projects.filter((item) => item.status === "In Progress").length;
    const avgProgress = total ? Math.round(projects.reduce((sum, item) => sum + item.progress, 0) / total) : 0;
    const dueSoon = projects.filter((item) => {
      if (!item.dueDate || item.status === "Done") return false;
      const due = new Date(item.dueDate);
      const now = new Date("2026-03-09T00:00:00");
      const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 14;
    }).length;
    return { total, done, blocked, inProgress, avgProgress, dueSoon };
  }, [projects]);

  const portfolioStats = useMemo(() => {
    return portfolioBlueprints.map((portfolio) => {
      const items = projects.filter((project) => project.portfolioId === portfolio.id);
      const progress = items.length ? Math.round(items.reduce((sum, item) => sum + item.progress, 0) / items.length) : 0;
      const done = items.filter((item) => item.status === "Done").length;
      const blocked = items.filter((item) => item.status === "Blocked").length;
      return { ...portfolio, count: items.length, progress, done, blocked, items };
    });
  }, [projects]);

  const goalStats = useMemo(() => {
    return goalsSeed.map((goal) => {
      const linked = projects.filter((project) => project.goalId === goal.id);
      const progress = linked.length ? Math.round(linked.reduce((sum, item) => sum + item.progress, 0) / linked.length) : 0;
      const atRisk = linked.filter((project) => project.status === "Blocked" || project.priority === "Critical").length;
      return { ...goal, linkedCount: linked.length, progress, atRisk, linked };
    });
  }, [projects]);

  const timelineItems = useMemo(() => {
    return [...projects]
      .filter((project) => project.dueDate)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [projects]);

  const boardColumns = useMemo(() => {
    return statusOptions.map((status) => ({
      status,
      items: filteredProjects.filter((project) => project.status === status),
    }));
  }, [filteredProjects]);

  function updateProject(id, patch) {
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== id) return project;
        const next = { ...project, ...patch };
        if (patch.portfolioId) {
          next.portfolioName = portfolioMap[patch.portfolioId]?.name ?? next.portfolioName;
          next.goalId = portfolioMap[patch.portfolioId]?.goalId ?? next.goalId;
        }
        return next;
      })
    );
  }

  function quickAdjustProgress(id, delta) {
    const current = projects.find((project) => project.id === id);
    if (!current) return;
    const next = Math.max(0, Math.min(100, current.progress + delta));
    updateProject(id, { progress: next, status: next === 100 ? "Done" : current.status === "Done" ? "In Progress" : current.status });
  }

  function addProject() {
    if (!newProject.title.trim()) return;
    const portfolio = portfolioMap[newProject.portfolioId];
    const created = {
      id: makeId(),
      title: newProject.title.trim(),
      portfolioId: portfolio.id,
      portfolioName: portfolio.name,
      goalId: portfolio.goalId,
      status: newProject.status,
      progress: Number(newProject.progress),
      priority: newProject.priority,
      owner: newProject.owner.trim() || portfolio.defaultOwner,
      dueDate: newProject.dueDate || null,
      notes: newProject.notes,
      subtasks: buildSubtasks(Number(newProject.progress)),
      createdAt: new Date().toISOString(),
    };
    setProjects((current) => [created, ...current]);
    setSelectedId(created.id);
    setShowCreate(false);
    setNewProject({
      title: "",
      portfolioId: portfolioBlueprints[0].id,
      status: "Planned",
      progress: 0,
      priority: "Medium",
      owner: "",
      dueDate: "",
      notes: "",
    });
  }

  function resetDemo() {
    setProjects(flattenProjects());
    setSelectedId(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  function addSubtask() {
    if (!selectedProject || !newSubtask.trim()) return;
    updateProject(selectedProject.id, {
      subtasks: [...selectedProject.subtasks, { id: makeId(), title: newSubtask.trim(), done: false }],
    });
    setNewSubtask("");
  }

  function toggleSubtask(subtaskId) {
    if (!selectedProject) return;
    const updated = selectedProject.subtasks.map((task) =>
      task.id === subtaskId ? { ...task, done: !task.done } : task
    );
    const completed = updated.filter((item) => item.done).length;
    const syncedProgress = updated.length ? Math.round((completed / updated.length) * 100) : selectedProject.progress;
    updateProject(selectedProject.id, {
      subtasks: updated,
      progress: syncedProgress,
      status: syncedProgress === 100 ? "Done" : selectedProject.status === "Done" ? "In Progress" : selectedProject.status,
    });
  }

  const views = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Projects", icon: FolderKanban },
    { label: "Board", icon: Grip },
    { label: "Goals", icon: Goal },
    { label: "Timeline", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-80 shrink-0 border-r border-slate-200 bg-white xl:flex xl:flex-col">
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#0B1F3A] p-3 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">URT Portfolio Hub</p>
                <p className="text-xs text-slate-500">Asana-style management prototype</p>
              </div>
            </div>
          </div>

          <div className="space-y-1 p-4">
            {views.map((view) => (
              <SidebarButton
                key={view.label}
                icon={view.icon}
                label={view.label}
                active={activeView === view.label}
                onClick={() => setActiveView(view.label)}
              />
            ))}
          </div>

          <div className="px-4 pb-4">
            <div className="mb-3 flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <FolderTree className="h-4 w-4" />
              Portfolio Structure
            </div>
            <div className="space-y-2">
              {portfolioStats.map((portfolio) => (
                <button
                  key={portfolio.id}
                  onClick={() => {
                    setPortfolioFilter(portfolio.id);
                    setActiveView("Projects");
                  }}
                  className="w-full rounded-2xl border border-slate-200 p-3 text-left hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{portfolio.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{portfolio.count} item</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      {portfolio.progress}%
                    </span>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={portfolio.progress} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto border-t border-slate-200 p-4">
            <button
              onClick={resetDemo}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Reset demo data
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-[1800px] flex-col gap-4 px-4 py-4 lg:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                    <Target className="h-3.5 w-3.5" />
                    Menggabungkan seluruh project ke dalam satu operating system
                  </div>
                  <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#0B1F3A] lg:text-3xl">
                    Portfolio, goals, board, timeline, dan editor progress dalam satu aplikasi
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Progress bisa diedit langsung di detail panel kanan atau dari board dengan quick action. Semua perubahan tersimpan di browser.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari project, owner, portfolio, status"
                      className="w-72 bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    onClick={() => setShowCreate(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0B1F3A] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-95"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah project
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500">
                  <Filter className="h-4 w-4" />
                  Filter
                </div>
                <select
                  value={portfolioFilter}
                  onChange={(e) => setPortfolioFilter(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="All">Semua portfolio</option>
                  {portfolioBlueprints.map((portfolio) => (
                    <option key={portfolio.id} value={portfolio.id}>
                      {portfolio.name}
                    </option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="All">Semua status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="All">Semua prioritas</option>
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setPortfolioFilter("All");
                    setStatusFilter("All");
                    setPriorityFilter("All");
                    setSearch("");
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[1800px] p-4 lg:p-6">
            {activeView === "Dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {[
                    { label: "Total Project", value: dashboardMetrics.total, icon: FolderKanban, helper: "Seluruh item dalam portfolio" },
                    { label: "In Progress", value: dashboardMetrics.inProgress, icon: TrendingUp, helper: "Sedang dikerjakan aktif" },
                    { label: "Done", value: dashboardMetrics.done, icon: CheckCircle2, helper: "Sudah selesai / closed" },
                    { label: "Blocked", value: dashboardMetrics.blocked, icon: ShieldAlert, helper: "Butuh eskalasi keputusan" },
                    { label: "Avg Progress", value: `${dashboardMetrics.avgProgress}%`, icon: BarChart3, helper: `${dashboardMetrics.dueSoon} due soon ≤ 14 hari` },
                  ].map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                        <Card className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm text-slate-500">{card.label}</p>
                              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1F3A]">{card.value}</h2>
                              <p className="mt-2 text-xs text-slate-500">{card.helper}</p>
                            </div>
                            <div className="rounded-2xl bg-slate-100 p-3 text-[#0B1F3A]">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <Card className="xl:col-span-2 p-5 md:p-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-[#0B1F3A]">Portfolio architecture</h2>
                        <p className="text-sm text-slate-500">Struktur terbaik untuk menggabungkan semua pekerjaan adalah: Goals → Portfolio → Project → Subtask.</p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                        7 portfolio aktif
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {portfolioStats.map((portfolio) => (
                        <button
                          key={portfolio.id}
                          onClick={() => {
                            setPortfolioFilter(portfolio.id);
                            setActiveView("Projects");
                          }}
                          className="rounded-3xl border border-slate-200 p-4 text-left hover:bg-slate-50"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold text-slate-800">{portfolio.name}</p>
                              <p className="mt-1 text-sm text-slate-500">{portfolio.description}</p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                              {portfolio.count}
                            </span>
                          </div>
                          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                            <span>{portfolio.progress}% progress rata-rata</span>
                            <span>{portfolio.done} done · {portfolio.blocked} blocked</span>
                          </div>
                          <div className="mt-2">
                            <ProgressBar value={portfolio.progress} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-5 md:p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="rounded-2xl bg-orange-50 p-3 text-orange-700">
                        <Flag className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[#0B1F3A]">Focus now</h2>
                        <p className="text-sm text-slate-500">Project yang paling butuh perhatian</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[...projects]
                        .filter((item) => item.status !== "Done")
                        .sort((a, b) => (b.priority === "Critical") - (a.priority === "Critical") || b.progress - a.progress)
                        .slice(0, 6)
                        .map((project) => (
                          <button
                            key={project.id}
                            onClick={() => {
                              setSelectedId(project.id);
                              setActiveView("Projects");
                            }}
                            className="w-full rounded-2xl border border-slate-200 p-3 text-left hover:bg-slate-50"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-medium text-slate-800">{project.title}</p>
                                <p className="mt-1 text-xs text-slate-500">{project.portfolioName}</p>
                              </div>
                              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyle(project.priority)}`}>
                                {project.priority}
                              </span>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                              <span>{project.progress}%</span>
                              <span>{formatDate(project.dueDate)}</span>
                            </div>
                            <div className="mt-2">
                              <ProgressBar value={project.progress} />
                            </div>
                          </button>
                        ))}
                    </div>
                  </Card>
                </div>

                <Card className="p-5 md:p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#0B1F3A]">Goals</h2>
                      <p className="text-sm text-slate-500">Gunakan goals untuk melihat apakah kumpulan project benar-benar mendorong outcome, bukan cuma aktivitas.</p>
                    </div>
                    <button
                      onClick={() => setActiveView("Goals")}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Lihat semua goals
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                    {goalStats.map((goal) => (
                      <div key={goal.id} className="rounded-3xl border border-slate-200 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-800">{goal.title}</p>
                            <p className="mt-1 text-sm text-slate-500">{goal.description}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {goal.linkedCount} project
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="text-slate-500">Current {goal.progress}%</span>
                          <span className="font-medium text-[#0B1F3A]">Target {goal.target}%</span>
                        </div>
                        <div className="mt-2">
                          <ProgressBar value={goal.progress} />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                          <span>Owner: {goal.owner}</span>
                          <span>{goal.atRisk} need attention</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeView === "Projects" && (
              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.35fr_0.75fr]">
                <Card className="overflow-hidden">
                  <div className="border-b border-slate-200 px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-[#0B1F3A]">Projects list</h2>
                        <p className="text-sm text-slate-500">Klik satu project untuk membuka panel editor progress.</p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                        {filteredProjects.length} result
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-left text-slate-500">
                          <th className="px-5 py-3 font-medium">Project</th>
                          <th className="px-5 py-3 font-medium">Portfolio</th>
                          <th className="px-5 py-3 font-medium">Owner</th>
                          <th className="px-5 py-3 font-medium">Status</th>
                          <th className="px-5 py-3 font-medium">Progress</th>
                          <th className="px-5 py-3 font-medium">Due</th>
                          <th className="px-5 py-3 font-medium">Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProjects.map((project) => (
                          <tr
                            key={project.id}
                            onClick={() => setSelectedId(project.id)}
                            className={`cursor-pointer border-b border-slate-100 align-top transition hover:bg-slate-50 ${selectedProject?.id === project.id ? "bg-slate-50" : ""}`}
                          >
                            <td className="px-5 py-4">
                              <div>
                                <p className="font-medium text-slate-800">{project.title}</p>
                                <p className="mt-1 text-xs text-slate-500">{goalMap[project.goalId]?.title}</p>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-slate-600">{project.portfolioName}</td>
                            <td className="px-5 py-4 text-slate-600">{project.owner}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusStyle(project.status)}`}>
                                {project.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 min-w-44">
                              <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                                <span>{project.progress}%</span>
                              </div>
                              <ProgressBar value={project.progress} />
                            </td>
                            <td className="px-5 py-4 text-slate-600">{formatDate(project.dueDate)}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${priorityStyle(project.priority)}`}>
                                {project.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card className="p-5 md:p-6">
                  {selectedProject ? (
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Editor project</p>
                            <h2 className="mt-1 text-xl font-semibold text-[#0B1F3A]">{selectedProject.title}</h2>
                            <p className="mt-1 text-sm text-slate-500">Edit progress di sini. Ini adalah area utama untuk update manual seperti di task management app.</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyle(selectedProject.priority)}`}>
                            {selectedProject.priority}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-medium text-slate-500">Judul project</label>
                          <input
                            value={selectedProject.title}
                            onChange={(e) => updateProject(selectedProject.id, { title: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-500">Portfolio</label>
                          <select
                            value={selectedProject.portfolioId}
                            onChange={(e) => updateProject(selectedProject.id, { portfolioId: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                          >
                            {portfolioBlueprints.map((portfolio) => (
                              <option key={portfolio.id} value={portfolio.id}>
                                {portfolio.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-500">Owner</label>
                          <input
                            value={selectedProject.owner}
                            onChange={(e) => updateProject(selectedProject.id, { owner: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-500">Status</label>
                          <select
                            value={selectedProject.status}
                            onChange={(e) => updateProject(selectedProject.id, { status: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-500">Priority</label>
                          <select
                            value={selectedProject.priority}
                            onChange={(e) => updateProject(selectedProject.id, { priority: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                          >
                            {priorityOptions.map((priority) => (
                              <option key={priority} value={priority}>
                                {priority}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-slate-500">Progress</label>
                            <span className="text-sm font-semibold text-[#0B1F3A]">{selectedProject.progress}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={selectedProject.progress}
                            onChange={(e) => updateProject(selectedProject.id, { progress: Number(e.target.value) })}
                            className="w-full accent-orange-500"
                          />
                          <div className="grid grid-cols-5 gap-2">
                            {[0, 25, 50, 75, 100].map((value) => (
                              <button
                                key={value}
                                onClick={() => updateProject(selectedProject.id, { progress: value, status: value === 100 ? "Done" : selectedProject.status === "Done" ? "In Progress" : selectedProject.status })}
                                className="rounded-2xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                              >
                                {value}%
                              </button>
                            ))}
                          </div>
                          <ProgressBar value={selectedProject.progress} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-500">Due date</label>
                          <input
                            type="date"
                            value={selectedProject.dueDate ?? ""}
                            onChange={(e) => updateProject(selectedProject.id, { dueDate: e.target.value || null })}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-500">Goal</label>
                          <input
                            value={goalMap[selectedProject.goalId]?.title ?? "-"}
                            readOnly
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 outline-none"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-medium text-slate-500">Catatan</label>
                          <textarea
                            rows={4}
                            value={selectedProject.notes}
                            onChange={(e) => updateProject(selectedProject.id, { notes: e.target.value })}
                            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                            placeholder="Tambahkan update, blocker, keputusan, atau next step"
                          />
                        </div>
                      </div>

                      <div className="rounded-3xl border border-slate-200 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-[#0B1F3A]">Checklist / subtasks</h3>
                            <p className="text-sm text-slate-500">Centang checklist untuk otomatis menyinkronkan progress.</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {selectedProject.subtasks.filter((item) => item.done).length}/{selectedProject.subtasks.length}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {selectedProject.subtasks.map((task) => (
                            <label key={task.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2.5">
                              <input type="checkbox" checked={task.done} onChange={() => toggleSubtask(task.id)} className="h-4 w-4 accent-orange-500" />
                              <span className={`text-sm ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{task.title}</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-2">
                          <input
                            value={newSubtask}
                            onChange={(e) => setNewSubtask(e.target.value)}
                            placeholder="Tambah subtask baru"
                            className="flex-1 rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                          />
                          <button
                            onClick={addSubtask}
                            className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">Pilih satu project untuk diedit.</div>
                  )}
                </Card>
              </div>
            )}

            {activeView === "Board" && (
              <div className="space-y-6">
                <Card className="p-5 md:p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-[#0B1F3A]">Board view</h2>
                      <p className="text-sm text-slate-500">Model kerja seperti Asana/Kanban. Quick update bisa dilakukan langsung dari kartu.</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                      Drag-drop belum dipasang, tapi perubahan status sudah bisa dilakukan langsung.
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
                  {boardColumns.map((column) => (
                    <Card key={column.status} className="p-4">
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-slate-800">{column.status}</h3>
                          <p className="text-xs text-slate-500">{column.items.length} item</p>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle(column.status)}`}>
                          {column.status}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {column.items.map((project) => (
                          <motion.div key={project.id} whileHover={{ y: -2 }} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <button
                              onClick={() => {
                                setSelectedId(project.id);
                                setActiveView("Projects");
                              }}
                              className="w-full text-left"
                            >
                              <p className="font-medium leading-snug text-slate-800">{project.title}</p>
                              <p className="mt-1 text-xs text-slate-500">{project.portfolioName}</p>
                            </button>
                            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                              <span>{project.progress}%</span>
                              <span>{formatDate(project.dueDate)}</span>
                            </div>
                            <div className="mt-2">
                              <ProgressBar value={project.progress} />
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <button
                                onClick={() => quickAdjustProgress(project.id, -10)}
                                className="rounded-2xl border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-white"
                              >
                                -10%
                              </button>
                              <button
                                onClick={() => quickAdjustProgress(project.id, 10)}
                                className="rounded-2xl border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-white"
                              >
                                +10%
                              </button>
                              <select
                                value={project.status}
                                onChange={(e) => updateProject(project.id, { status: e.target.value })}
                                className="ml-auto rounded-2xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs outline-none"
                              >
                                {statusOptions.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeView === "Goals" && (
              <div className="space-y-6">
                {goalStats.map((goal) => (
                  <Card key={goal.id} className="p-5 md:p-6">
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Goal</p>
                            <h2 className="mt-1 text-xl font-semibold text-[#0B1F3A]">{goal.title}</h2>
                            <p className="mt-2 text-sm text-slate-500">{goal.description}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            Owner {goal.owner}
                          </span>
                        </div>
                        <div className="mt-5 grid grid-cols-3 gap-3">
                          <div className="rounded-2xl border border-slate-200 p-3">
                            <p className="text-xs text-slate-500">Current</p>
                            <p className="mt-1 text-2xl font-semibold text-[#0B1F3A]">{goal.progress}%</p>
                          </div>
                          <div className="rounded-2xl border border-slate-200 p-3">
                            <p className="text-xs text-slate-500">Target</p>
                            <p className="mt-1 text-2xl font-semibold text-[#0B1F3A]">{goal.target}%</p>
                          </div>
                          <div className="rounded-2xl border border-slate-200 p-3">
                            <p className="text-xs text-slate-500">Linked</p>
                            <p className="mt-1 text-2xl font-semibold text-[#0B1F3A]">{goal.linkedCount}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <ProgressBar value={goal.progress} />
                        </div>
                      </div>

                      <div>
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <h3 className="font-semibold text-slate-800">Linked projects</h3>
                          <button
                            onClick={() => {
                              setSearch(goal.title.split(" ")[0]);
                              setActiveView("Projects");
                            }}
                            className="text-sm font-medium text-slate-600 hover:text-slate-900"
                          >
                            Open filtered view
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {goal.linked.slice(0, 8).map((project) => (
                            <button
                              key={project.id}
                              onClick={() => {
                                setSelectedId(project.id);
                                setActiveView("Projects");
                              }}
                              className="rounded-2xl border border-slate-200 p-3 text-left hover:bg-slate-50"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <p className="text-sm font-medium text-slate-800">{project.title}</p>
                                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle(project.status)}`}>
                                  {project.status}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-slate-500">{project.portfolioName}</p>
                              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                <span>{project.progress}%</span>
                                <span>{formatDate(project.dueDate)}</span>
                              </div>
                              <div className="mt-2">
                                <ProgressBar value={project.progress} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeView === "Timeline" && (
              <div className="space-y-6">
                <Card className="p-5 md:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#0B1F3A]">Timeline</h2>
                      <p className="text-sm text-slate-500">Gunakan timeline untuk mengontrol urutan tanggal, deadline, dan penumpukan delivery.</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                      {timelineItems.length} item bertanggal
                    </div>
                  </div>
                </Card>

                <div className="space-y-4">
                  {timelineItems.map((project) => (
                    <Card key={project.id} className="p-4 md:p-5">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr_140px] md:items-center">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Due date</p>
                          <p className="mt-1 text-lg font-semibold text-[#0B1F3A]">{formatDate(project.dueDate)}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedId(project.id);
                            setActiveView("Projects");
                          }}
                          className="rounded-2xl border border-slate-200 p-3 text-left hover:bg-slate-50"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium text-slate-800">{project.title}</p>
                              <p className="mt-1 text-sm text-slate-500">{project.portfolioName} · {project.owner}</p>
                            </div>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyle(project.priority)}`}>
                              {project.priority}
                            </span>
                          </div>
                        </button>
                        <div>
                          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                            <span>{project.progress}%</span>
                            <span>{project.status}</span>
                          </div>
                          <ProgressBar value={project.progress} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[#0B1F3A]">Tambah project baru</h2>
                <p className="text-sm text-slate-500">Project baru otomatis masuk ke dashboard, board, goals, dan timeline.</p>
              </div>
              <button onClick={() => setShowCreate(false)} className="rounded-2xl p-2 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-slate-500">Judul</label>
                <input
                  value={newProject.title}
                  onChange={(e) => setNewProject((current) => ({ ...current, title: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                  placeholder="Masukkan nama project"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Portfolio</label>
                <select
                  value={newProject.portfolioId}
                  onChange={(e) => setNewProject((current) => ({ ...current, portfolioId: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                >
                  {portfolioBlueprints.map((portfolio) => (
                    <option key={portfolio.id} value={portfolio.id}>
                      {portfolio.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Owner</label>
                <input
                  value={newProject.owner}
                  onChange={(e) => setNewProject((current) => ({ ...current, owner: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                  placeholder="PIC / squad"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject((current) => ({ ...current, status: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Priority</label>
                <select
                  value={newProject.priority}
                  onChange={(e) => setNewProject((current) => ({ ...current, priority: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Progress</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newProject.progress}
                  onChange={(e) => setNewProject((current) => ({ ...current, progress: Number(e.target.value) }))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-slate-500">Due date</label>
                <input
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject((current) => ({ ...current, dueDate: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-slate-500">Catatan</label>
                <textarea
                  rows={4}
                  value={newProject.notes}
                  onChange={(e) => setNewProject((current) => ({ ...current, notes: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={addProject}
                className="rounded-2xl bg-[#0B1F3A] px-4 py-2.5 text-sm font-medium text-white"
              >
                Simpan project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
