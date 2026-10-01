import type { TestCopy } from "../migraine-test";
import type { DiaryCopy, TestPageCopy } from "../tools";

export const diary: DiaryCopy = {
  path: "/resources/migraine-diary",
  navLabel: "Migraine diary",
  menuDescription: "Printable calendar and attack log",
  metaTitle: "Printable migraine diary (free PDF)",
  description:
    "Download a free printable migraine diary: a monthly calendar, intensity, medication days and an attack log to show your doctor.",
  title: "Printable migraine diary",
  lead: "A monthly calendar and an attack log on two pages, to print and fill in day by day. Free, no sign-up.",
  downloads: [
    { label: "Download the PDF (US Letter)", href: "/downloads/migraine-diary-mellow-letter.pdf", primary: true },
    { label: "A4 version", href: "/downloads/migraine-diary-mellow-a4.pdf" },
  ],
  downloadNote: "PDF, 2 pages.",
  previewAlt: [
    "Diary page 1: a monthly calendar with, for each day, the intensity out of 10, a medication box and room for a note",
    "Diary page 2: an attack log with date, times, intensity, symptoms, triggers, medication and drug-free relief, each with a \"did it help\" box",
  ],
  whyTitle: "Why keep a migraine diary?",
  why: [
    [
      "It is often the first thing a neurologist asks for. Logging your attacks helps you ",
      { text: "spot your triggers", href: "/blog/identify-migraine-triggers" },
      ", see whether a treatment works and check whether your attacks follow ",
      { text: "your cycle", href: "/blog/migraine-and-periods" },
      ".",
    ],
    [
      "It also counts your medication days. Beyond 10 days a month, the risk of ",
      { text: "medication overuse", href: "/blog/headache-every-day" },
      " rises: the painkillers themselves can then keep the headaches going.",
    ],
  ],
  howTitle: "How to fill it in",
  steps: [
    "On each attack day, write the intensity from 1 to 10 at the bottom of that day's box.",
    "Tick “Med” if you took an acute medication that day. You can also jot down a word in the box: period day, bad night, stress.",
    "For each attack, fill in one row of the log: start and end times, symptoms, possible triggers, medication taken and drug-free relief, ticking for each whether it helped.",
    "At the end of the month, count your migraine days and medication days, then bring the diary to your next appointment.",
  ],
  doctorTitle: "What your doctor will look at",
  doctor: [
    "Migraine days per month, to decide whether a preventive treatment makes sense.",
    "How long and how strong attacks are, to choose the right acute treatment.",
    "Days with medication, to spot medication overuse.",
    "Recurring triggers, and any link with your period.",
  ],
  appTitle: "Let Mellow fill it in with you",
  appText:
    "Log an attack in two taps on your phone. Mellow counts your migraine days and medication, tracks the weather and prepares a PDF report for your doctor.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "How long should I keep a migraine diary?",
      a: "At least one to three months. That is how long it takes for a pattern to show, for example around your period, and for your doctor to assess a preventive treatment.",
    },
    {
      q: "Should I log days without an attack?",
      a: "Just leave that day's box empty. Attack-free days matter as much as the others: they give your real frequency and show the calm periods.",
    },
    {
      q: "Does the diary replace a medical appointment?",
      a: "No. It is a tool to prepare your appointment and talk it through with your doctor, not to make a diagnosis.",
    },
  ],
};

export const testPage: TestPageCopy = {
  path: "/resources/migraine-test",
  navLabel: "Migraine test",
  menuDescription: "Migraine or headache? 11 questions",
  metaTitle: "Migraine test: migraine or headache? (free, 2 minutes)",
  description:
    "Answer 11 questions based on the medical criteria for migraine and find out whether your headaches look like migraine, tension-type headache or something else.",
  title: "Migraine or headache? Take the test",
  lead: "11 questions, 2 minutes. The test is based on the International Classification of Headache Disorders (ICHD-3), the criteria neurologists use.",
  howTitle: "How does this test work?",
  how: [
    [
      "To diagnose migraine, neurologists look for attacks lasting 4 to 72 hours, with at least two of these features: one-sided, throbbing, moderate to severe, worse with activity. There must also be at least one associated symptom: nausea, or sensitivity to both light and noise.",
    ],
    [
      "Tension-type headache feels tight on both sides, stays mild to moderate, doesn't get worse with activity and doesn't cause nausea. To go further: ",
      { text: "migraine vs headache, how to tell the difference", href: "/blog/migraine-vs-headache" },
      ".",
    ],
    [
      "The test also takes into account ",
      { text: "aura", href: "/blog/migraine-with-aura" },
      ", how many headache days you have each month and your medication days, which can point to ",
      { text: "medication overuse", href: "/blog/headache-every-day" },
      ".",
    ],
  ],
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "Is this test reliable?",
      a: "It uses the criteria doctors use, but it does not replace an examination. Only a doctor can make a diagnosis, taking your history and a clinical exam into account.",
    },
    {
      q: "Can you have both migraine and tension-type headache?",
      a: "Yes, it is common. Many people with migraine also get milder tension-type headaches. A headache diary helps tell them apart.",
    },
    {
      q: "When should I seek emergency care?",
      a: "For a sudden, extremely severe pain, fever with a stiff neck, weakness on one side of the body, trouble speaking or confusion, or a headache after a blow to the head. Call your local emergency number.",
    },
  ],
};

export const test: TestCopy = {
  progress: "Question {n} of {total}",
  back: "Back",
  next: "Continue",
  seeResult: "See my result",
  restart: "Take the test again",
  resultEyebrow: "Your result",
  disclaimer:
    "This test is not a diagnosis. It helps you see more clearly and prepare for an appointment. If in doubt, talk to your doctor.",
  appTitle: "Confirm your profile by tracking your attacks",
  appText:
    "Log each attack in two taps for a month. Mellow works out your frequency, average duration and medication days, and prepares a PDF report for your doctor.",
  questions: [
    {
      id: "duration",
      title: "Without treatment, how long does an attack usually last?",
      options: [
        { id: "under30m", label: "Less than 30 minutes" },
        { id: "30mto4h", label: "30 minutes to 4 hours" },
        { id: "4to72h", label: "4 hours to 3 days" },
        { id: "over72h", label: "More than 3 days" },
        { id: "unknown", label: "I don't know, I always take something" },
      ],
    },
    {
      id: "location",
      title: "Where does it hurt, most of the time?",
      options: [
        { id: "one", label: "On one side of the head (the side can change from one attack to the next)" },
        { id: "both", label: "On both sides, like a band or a helmet" },
        { id: "varies", label: "It depends on the attack" },
      ],
    },
    {
      id: "quality",
      title: "What does the pain feel like?",
      options: [
        { id: "pulsating", label: "Throbbing or pulsing, like a heartbeat in the head" },
        { id: "pressing", label: "Tight or pressing, like a vice" },
        { id: "other", label: "Something else, or I'm not sure" },
      ],
    },
    {
      id: "intensity",
      title: "How strong is it?",
      options: [
        { id: "mild", label: "Mild: I can carry on as normal" },
        { id: "moderate", label: "Moderate: it gets in the way, I slow down" },
        { id: "severe", label: "Severe: I have to stop or lie down" },
      ],
    },
    {
      id: "activity",
      title: "Does physical activity make the pain worse?",
      hint: "Climbing stairs, walking fast, bending forward.",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
        { id: "unsure", label: "I'm not sure" },
      ],
    },
    {
      id: "nausea",
      title: "During an attack, do you feel sick or vomit?",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "senses",
      title: "During an attack, do light and noise bother you?",
      options: [
        { id: "both", label: "Yes, both" },
        { id: "one", label: "Only one of them" },
        { id: "none", label: "Neither" },
      ],
    },
    {
      id: "aura",
      title: "Before or as the pain starts, do you sometimes get symptoms that last 5 to 60 minutes and then go away?",
      hint: "Zigzag lights, a blind spot, tingling that spreads up the arm, trouble finding your words.",
      options: [
        { id: "often", label: "Yes, often" },
        { id: "sometimes", label: "Yes, it has happened" },
        { id: "never", label: "No" },
      ],
    },
    {
      id: "frequency",
      title: "How many days a month do you have a headache?",
      options: [
        { id: "under4", label: "Fewer than 4 days" },
        { id: "4to14", label: "4 to 14 days" },
        { id: "15plus", label: "15 days or more" },
      ],
    },
    {
      id: "medication",
      title: "How many days a month do you take a painkiller?",
      hint: "Acetaminophen (paracetamol), ibuprofen, aspirin, a triptan or other.",
      options: [
        { id: "under10", label: "Fewer than 10 days" },
        { id: "10to14", label: "10 to 14 days" },
        { id: "15plus", label: "15 days or more" },
      ],
    },
    {
      id: "redflags",
      title: "Last question, and an important one: has your headache ever come with any of these signs?",
      hint: "You can select several.",
      multiple: true,
      options: [
        { id: "thunderclap", label: "A sudden, extremely severe pain, the worst of your life, peaking within a minute" },
        { id: "fever", label: "Fever with a stiff neck" },
        { id: "neuro", label: "Weakness on one side of the body, trouble speaking or confusion" },
        { id: "trauma", label: "A headache that started after a blow to the head" },
        { id: "new", label: "A new headache after age 50, or one that suddenly changes in nature" },
        { id: "longAura", label: "Visual disturbances or tingling that last more than an hour" },
        { id: "none", label: "None of these", exclusive: true },
      ],
    },
  ],
  results: {
    urgent: {
      title: "See a doctor soon",
      text: "You selected at least one sign that calls for medical advice without delay. Most of the time the cause is not serious, but these symptoms need to be checked. If the pain is sudden and extremely severe, or if there is weakness on one side of the body or trouble speaking, call your local emergency number (911 in the US, 999 in the UK, 112 in Europe).",
      links: ["Learn more: ", { text: "aura is not a stroke, but it can look like one", href: "/blog/migraine-with-aura" }, "."],
    },
    migraine: {
      title: "Your headaches look like migraine",
      text: "Your answers match the criteria for migraine without aura: attacks lasting several hours, at least two typical pain features, and associated symptoms such as nausea or sensitivity to light and noise. Only a doctor can confirm the diagnosis, but it is a good starting point for that conversation.",
      links: ["Read next: ", { text: "migraine vs headache, how to tell the difference", href: "/blog/migraine-vs-headache" }, " and ", { text: "how to identify your triggers", href: "/blog/identify-migraine-triggers" }, "."],
    },
    migraineAura: {
      title: "Your headaches look like migraine with aura",
      text: "Your attacks have the features of migraine, and the symptoms you describe before the pain look like an aura. If they are new, unusual or last more than an hour, see a doctor to be sure.",
      links: ["Read next: ", { text: "understanding migraine with aura", href: "/blog/migraine-with-aura" }, " and ", { text: "ophthalmic migraine", href: "/blog/ophthalmic-migraine" }, "."],
    },
    auraPossible: {
      title: "Your symptoms look like a migraine aura",
      text: "Visual or sensory symptoms that last 5 to 60 minutes and then go away are typical of an aura, even when the pain that follows is mild, or absent. Talk to your doctor about it, especially if it is recent.",
      links: ["Read next: ", { text: "migraine with aura", href: "/blog/migraine-with-aura" }, " and ", { text: "ophthalmic migraine", href: "/blog/ophthalmic-migraine" }, "."],
    },
    migraineProbable: {
      title: "Your headaches partly look like migraine",
      text: "Your answers meet almost all the criteria for migraine, but not all of them. Neurologists call this probable migraine. Tracking your attacks for a month will help your doctor see more clearly.",
      links: ["Start with: ", { text: "the printable migraine diary", href: "/resources/migraine-diary" }, " or ", { text: "migraine vs headache, how to tell the difference", href: "/blog/migraine-vs-headache" }, "."],
    },
    tension: {
      title: "Your headaches look like tension-type headache",
      text: "A tight pain on both sides, mild to moderate, with no nausea and no worsening with activity: that is the profile of tension-type headache, the most common kind of headache. Stress, lack of sleep and posture are frequent causes.",
      links: ["Read next: ", { text: "migraine vs headache, how to tell the difference", href: "/blog/migraine-vs-headache" }, " and ", { text: "stress and migraines", href: "/blog/stress-and-migraines" }, "."],
    },
    unclear: {
      title: "Your answers don't clearly match one profile",
      text: "Your headaches don't clearly fit migraine or tension-type headache. That is not worrying in itself, but it is worth discussing with your doctor, ideally with a written record of your attacks.",
      links: ["To help: ", { text: "the printable migraine diary", href: "/resources/migraine-diary" }, "."],
    },
  },
  chronicNote: ["You have a headache 15 or more days a month: this is called a chronic form. Preventive treatments exist, talk to your doctor. ", { text: "Headache every day: the causes", href: "/blog/headache-every-day" }],
  overuseNote: ["You take a painkiller 10 or more days a month. Beyond that threshold, the risk of medication overuse rises: the medication itself can keep the headaches going. ", { text: "How to get out of medication overuse", href: "/blog/headache-every-day" }],
};
