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

