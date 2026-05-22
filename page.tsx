"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, Brain, Users, Moon, BookOpen, CheckCircle2, AlertTriangle, ClipboardList, Sparkles, MessageCircle, Activity, Award, Menu, X } from "lucide-react";

const modules = [
  {
    id: "burnout",
    title: "Module 1: Burnout and Emotional Exhaustion",
    icon: HeartPulse,
    time: "8 min",
    theory: "Maslach Burnout Theory",
    problem: "Healthcare workers can experience emotional exhaustion, depersonalisation and reduced accomplishment when workload pressure and emotional exposure continue for too long.",
    strategies: [
      "Use a 2-minute reset between difficult patient interactions.",
      "Track early warning signs such as irritability, sleep disruption and emotional numbness.",
      "Ask for support before stress becomes a crisis."
    ],
    activity: "Choose one recovery action you can realistically use during your next shift."
  },
  {
    id: "psychosocial",
    title: "Module 2: Psychosocial Hazards at Work",
    icon: ShieldCheck,
    time: "7 min",
    theory: "Job Demands–Resources Model",
    problem: "High patient loads, shift fatigue, trauma exposure, aggression and staff shortages can become psychosocial risks when demands are higher than available support.",
    strategies: [
      "Identify job demands that are increasing stress.",
      "Match each demand with a resource, such as supervisor support, peer support, breaks or clearer communication.",
      "Report hazards early so the workplace can manage them, not just the individual."
    ],
    activity: "Complete the demand/resource check and select one support you need this week."
  },
  {
    id: "safety",
    title: "Module 3: Psychological Safety and Speaking Up",
    icon: MessageCircle,
    time: "6 min",
    theory: "Psychological Safety",
    problem: "Healthcare teams can be affected by hierarchy, fear of blame and communication breakdowns, which may stop workers from asking questions or reporting concerns.",
    strategies: [
      "Use respectful check-in language: ‘Can we pause and clarify?’",
      "Encourage questions and concerns during handover.",
      "Use anonymous reporting where staff may not feel safe speaking directly."
    ],
    activity: "Practise a short speaking-up script for a stressful team situation."
  },
  {
    id: "coping",
    title: "Module 4: Stress Coping and Emotional Regulation",
    icon: Brain,
    time: "6 min",
    theory: "Stress and Coping Theory",
    problem: "Stress is shaped by how workers appraise and cope with demands. Healthcare staff need simple coping tools that can be used during fast-paced shifts.",
    strategies: [
      "Try box breathing: inhale 4, hold 4, exhale 4, hold 4.",
      "Use grounding: name 5 things you can see, 4 you can feel, 3 you can hear.",
      "Separate what is urgent, what is important and what can wait."
    ],
    activity: "Use the breathing timer below and rate your stress before and after."
  },
  {
    id: "compassion",
    title: "Module 5: Compassion Fatigue and Recovery",
    icon: Sparkles,
    time: "7 min",
    theory: "Compassion Fatigue Theory + Trauma-Informed Care",
    problem: "Repeated exposure to suffering, grief and trauma can reduce emotional capacity over time. Recovery must be safe, respectful and stigma-free.",
    strategies: [
      "Use reflective journaling after emotionally heavy events.",
      "Set healthy boundaries without losing compassion.",
      "Debrief with trusted peers or supervisors after critical incidents."
    ],
    activity: "Write one short reflection: What was hard, what helped, and what support is needed?"
  }
];

const quizQuestions = [
  {
    q: "Which wellbeing model explains burnout as a result of high demands and low resources?",
    options: ["PERMA Model", "Job Demands–Resources Model", "Self-Determination Theory", "Trauma-Informed Care"],
    answer: 1,
    explain: "The JD-R model explains that burnout risk increases when job demands exceed available resources."
  },
  {
    q: "A nurse feels emotionally numb after repeated exposure to patient suffering. What issue does this best describe?",
    options: ["Compassion fatigue", "Positive emotion", "Accomplishment", "Autonomy"],
    answer: 0,
    explain: "Compassion fatigue can occur when prolonged caring work reduces emotional capacity."
  },
  {
    q: "Which website feature best supports psychological safety?",
    options: ["Anonymous wellbeing reporting", "Bright flashing images", "Long text-only modules", "Removing breaks"],
    answer: 0,
    explain: "Anonymous reporting can help workers raise concerns when they do not feel safe speaking openly."
  },
  {
    q: "Which design choice is most appropriate for stressed healthcare workers?",
    options: ["Crowded pages with lots of text", "Calming colours, short modules and clear navigation", "No accessibility options", "Hidden support resources"],
    answer: 1,
    explain: "The website is designed to reduce cognitive overload using simple layout, calming colours and clear steps."
  },
  {
    q: "Which PERMA element is supported by reflection journals after difficult shifts?",
    options: ["Meaning", "Noise", "Turnover", "Fatigue"],
    answer: 0,
    explain: "Reflection can help workers process experiences and reconnect with meaning in their work."
  }
];

function NavButton({ children, active, onClick }) {
  return (
    <button onClick={onClick} className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? "bg-teal-700 text-white shadow" : "bg-white/70 text-slate-700 hover:bg-white"}`}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-teal-100 bg-white/85 p-6 shadow-sm backdrop-blur ${className}`}>{children}</div>;
}

export default function CareWellNexusWebsite() {
  const [page, setPage] = useState("home");
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(3);
  const [journal, setJournal] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const score = useMemo(() => quizQuestions.reduce((total, item, i) => total + (answers[i] === item.answer ? 1 : 0), 0), [answers]);
  const wellbeingRisk = mood <= 2 || stress >= 4 ? "High support recommended" : mood === 3 || stress === 3 ? "Moderate support suggested" : "Stable today";

  const nav = [
    ["home", "Home"],
    ["training", "Training"],
    ["quiz", "Quiz"],
    ["tracker", "Mood Tracker"],
    ["journal", "Reflection"],
    ["resources", "Support"],
  ];

  const Navigation = () => (
    <div className="flex flex-wrap gap-2">
      {nav.map(([id, label]) => <NavButton key={id} active={page === id} onClick={() => { setPage(id); setMobileOpen(false); }}>{label}</NavButton>)}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 text-slate-800">
      <header className="sticky top-0 z-20 border-b border-teal-100 bg-teal-50/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <button onClick={() => setPage("home")} className="flex items-center gap-3 text-left">
            <div className="rounded-2xl bg-teal-700 p-2 text-white"><HeartPulse size={24} /></div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-teal-950">CareWell Nexus</h1>
              <p className="text-xs text-slate-600">Digital Wellbeing & Psychosocial Safety Platform</p>
            </div>
          </button>
          <div className="hidden md:block"><Navigation /></div>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <div className="px-4 pb-4 md:hidden"><Navigation /></div>}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {page === "home" && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-[2rem] bg-teal-900 p-8 text-white shadow-lg">
              <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm">Supporting the people who care for everyone else.</p>
              <h2 className="mb-4 text-4xl font-bold md:text-6xl">Healthcare wellbeing training that feels calm, practical and safe.</h2>
              <p className="max-w-2xl text-lg text-teal-50">This prototype helps healthcare workers understand burnout, compassion fatigue, shift fatigue, workplace aggression and psychosocial hazards through short training, quizzes, mood tracking and reflection activities.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => setPage("training")} className="rounded-full bg-white px-5 py-3 font-semibold text-teal-900 shadow">Start training</button>
                <button onClick={() => setPage("tracker")} className="rounded-full border border-white/50 px-5 py-3 font-semibold text-white">Check wellbeing</button>
              </div>
            </div>
            <Card className="flex flex-col justify-between bg-white">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-teal-950">Today’s wellbeing snapshot</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-2xl bg-teal-50 p-4"><span>Mood level</span><strong>{mood}/5</strong></div>
                  <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4"><span>Stress level</span><strong>{stress}/5</strong></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><span className="text-sm text-slate-500">Suggested support</span><p className="font-semibold text-teal-900">{wellbeingRisk}</p></div>
                </div>
              </div>
              <button onClick={() => setPage("resources")} className="mt-6 rounded-2xl bg-teal-700 px-4 py-3 font-semibold text-white">View support resources</button>
            </Card>
            <div className="grid gap-4 md:grid-cols-3 lg:col-span-2">
              {["Burnout", "Compassion fatigue", "Shift fatigue", "Psychological safety", "Workplace aggression", "Staff shortages"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/80 p-5 shadow-sm"><CheckCircle2 className="mb-3 text-teal-700" /><p className="font-semibold">{item}</p></div>
              ))}
            </div>
          </motion.section>
        )}

        {page === "training" && (
          <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <Card>
              <h2 className="mb-2 text-3xl font-bold text-teal-950">Training Modules</h2>
              <p className="mb-5 text-slate-600">Short, low-pressure modules designed for busy healthcare workers.</p>
              <div className="space-y-3">
                {modules.map((m) => {
                  const Icon = m.icon;
                  return <button key={m.id} onClick={() => setSelectedModule(m)} className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition ${selectedModule.id === m.id ? "bg-teal-700 text-white" : "bg-slate-50 hover:bg-teal-50"}`}><Icon /><span className="font-semibold">{m.title}</span><span className="ml-auto text-xs opacity-80">{m.time}</span></button>;
                })}
              </div>
            </Card>
            <Card>
              <div className="mb-4 flex items-start gap-3">
                <selectedModule.icon className="mt-1 text-teal-700" size={30} />
                <div><h3 className="text-2xl font-bold text-teal-950">{selectedModule.title}</h3><p className="text-sm font-semibold text-amber-700">Theory: {selectedModule.theory}</p></div>
              </div>
              <div className="rounded-2xl bg-rose-50 p-4"><p className="font-semibold text-rose-900">Workplace challenge</p><p>{selectedModule.problem}</p></div>
              <h4 className="mt-5 font-bold text-teal-950">Practical strategies</h4>
              <ul className="mt-2 space-y-2">
                {selectedModule.strategies.map((s) => <li key={s} className="flex gap-2"><CheckCircle2 className="mt-1 shrink-0 text-teal-700" size={18} />{s}</li>)}
              </ul>
              <div className="mt-5 rounded-2xl bg-teal-50 p-4"><p className="font-bold text-teal-950">Mini activity</p><p>{selectedModule.activity}</p></div>
              <button onClick={() => setPage("quiz")} className="mt-6 rounded-full bg-teal-700 px-5 py-3 font-semibold text-white">Test my knowledge</button>
            </Card>
          </section>
        )}

        {page === "quiz" && (
          <section className="mx-auto max-w-4xl">
            <Card>
              <h2 className="mb-2 text-3xl font-bold text-teal-950">Wellbeing Knowledge Quiz</h2>
              <p className="mb-6 text-slate-600">Select the best answer. This checks understanding, not performance.</p>
              <div className="space-y-6">
                {quizQuestions.map((item, i) => (
                  <div key={item.q} className="rounded-2xl bg-slate-50 p-5">
                    <p className="mb-3 font-semibold">{i + 1}. {item.q}</p>
                    <div className="grid gap-2 md:grid-cols-2">
                      {item.options.map((option, index) => (
                        <button key={option} onClick={() => setAnswers({ ...answers, [i]: index })} className={`rounded-xl border p-3 text-left ${answers[i] === index ? "border-teal-700 bg-teal-50 font-semibold" : "border-slate-200 bg-white"}`}>{option}</button>
                      ))}
                    </div>
                    {submitted && <p className={`mt-3 text-sm ${answers[i] === item.answer ? "text-teal-700" : "text-rose-700"}`}>{answers[i] === item.answer ? "Correct. " : "Not quite. "}{item.explain}</p>}
                  </div>
                ))}
              </div>
              <button onClick={() => setSubmitted(true)} className="mt-6 rounded-full bg-teal-700 px-5 py-3 font-semibold text-white">Submit quiz</button>
              {submitted && <div className="mt-4 rounded-2xl bg-amber-50 p-4 font-bold text-amber-900">Score: {score}/{quizQuestions.length}</div>}
            </Card>
          </section>
        )}

        {page === "tracker" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h2 className="mb-2 text-3xl font-bold text-teal-950">Mood and Fatigue Tracker</h2>
              <p className="mb-6 text-slate-600">A simple check-in helps identify early signs of burnout or compassion fatigue.</p>
              <label className="font-semibold">Mood today: {mood}/5</label>
              <input type="range" min="1" max="5" value={mood} onChange={(e) => setMood(Number(e.target.value))} className="my-4 w-full" />
              <label className="font-semibold">Stress today: {stress}/5</label>
              <input type="range" min="1" max="5" value={stress} onChange={(e) => setStress(Number(e.target.value))} className="my-4 w-full" />
              <div className="rounded-2xl bg-teal-50 p-4"><p className="text-sm text-slate-500">Result</p><p className="text-xl font-bold text-teal-950">{wellbeingRisk}</p></div>
            </Card>
            <Card>
              <h3 className="mb-4 text-2xl font-bold text-teal-950">Recommended next step</h3>
              {stress >= 4 || mood <= 2 ? (
                <div className="space-y-4"><AlertTriangle className="text-amber-700" size={34} /><p>Your check-in suggests higher support may be useful. Consider a short break, peer debrief, supervisor check-in or employee assistance support.</p><button onClick={() => setPage("resources")} className="rounded-full bg-teal-700 px-5 py-3 font-semibold text-white">Open support options</button></div>
              ) : (
                <div className="space-y-4"><CheckCircle2 className="text-teal-700" size={34} /><p>Your check-in looks stable today. Keep using micro-recovery strategies and complete one reflection after your shift.</p><button onClick={() => setPage("journal")} className="rounded-full bg-teal-700 px-5 py-3 font-semibold text-white">Write reflection</button></div>
              )}
            </Card>
          </section>
        )}

        {page === "journal" && (
          <section className="mx-auto max-w-4xl">
            <Card>
              <h2 className="mb-2 text-3xl font-bold text-teal-950">Reflection Journal</h2>
              <p className="mb-5 text-slate-600">Private reflection supports meaning-making, emotional recovery and self-awareness after difficult shifts.</p>
              <div className="mb-4 grid gap-3 md:grid-cols-3">
                {["What was difficult today?", "What helped me cope?", "What support do I need?"].map((p) => <div key={p} className="rounded-2xl bg-teal-50 p-4 font-semibold text-teal-950">{p}</div>)}
              </div>
              <textarea value={journal} onChange={(e) => setJournal(e.target.value)} rows={8} placeholder="Write a short reflection here..." className="w-full rounded-2xl border border-teal-100 p-4 outline-none focus:ring-2 focus:ring-teal-500" />
              <p className="mt-3 text-sm text-slate-500">Prototype note: in a real workplace system, privacy and data protection would need to be clearly explained.</p>
            </Card>
          </section>
        )}

        {page === "resources" && (
          <section className="grid gap-6 lg:grid-cols-3">
            <Card><Users className="mb-4 text-teal-700" /><h3 className="text-xl font-bold text-teal-950">Peer and manager support</h3><p className="mt-2">Use structured check-ins, debriefing after critical incidents and respectful speaking-up scripts.</p></Card>
            <Card><Moon className="mb-4 text-teal-700" /><h3 className="text-xl font-bold text-teal-950">Fatigue recovery</h3><p className="mt-2">Use rest breaks, sleep hygiene, hydration reminders and shift recovery planning.</p></Card>
            <Card><ClipboardList className="mb-4 text-teal-700" /><h3 className="text-xl font-bold text-teal-950">Anonymous reporting</h3><p className="mt-2">Report psychosocial hazards such as aggression, unsafe workload, bullying or communication breakdowns.</p></Card>
            <Card className="lg:col-span-3"><Award className="mb-4 text-amber-600" /><h3 className="text-xl font-bold text-teal-950">Achievement badge system</h3><p className="mt-2">Users earn badges for completing training, reflection, coping activities and team wellbeing challenges. This supports motivation, accomplishment and engagement.</p></Card>
          </section>
        )}
      </main>

      <footer className="mt-10 border-t border-teal-100 bg-white/60 px-4 py-6 text-center text-sm text-slate-600">
        CareWell Nexus prototype | Healthcare wellbeing, psychosocial safety, training, quizzes and support information
      </footer>
    </div>
  );
}
