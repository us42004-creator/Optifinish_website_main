'use client';

import { useState } from 'react';
import { Download, ShieldCheck } from 'lucide-react';

type Lang = 'en' | 'hi';

const CONTENT: Record<Lang, {
  kicker: string;
  title: string;
  intro: React.ReactNode;
  commitmentTitle: string;
  commitments: { h: string; b: string }[];
  objectivesTitle: string;
  objectives: string[];
  preparedLabel: string;
  reviewedLabel: string;
  mrDesig: string;
  mdDesig: string;
  download: string;
}> = {
  en: {
    kicker: 'Certified Quality Management · ISO 9001:2015',
    title: 'Quality Policy',
    intro: (
      <>
        At <b>Value Added Coating Solutions Pvt. Ltd.</b>, we are dedicated to producing
        high-quality products by adhering to the rigorous standards of <b>ISO 9001:2015</b>.
        We focus on continual improvement across all facets of our operations —{' '}
        <b>Man, Machine, Material, and Methods</b> — to achieve total customer satisfaction.
      </>
    ),
    commitmentTitle: 'Our Commitment Includes',
    commitments: [
      { h: 'Adhering to ISO 9001:2015 Standards', b: 'We comply with all requirements set forth by ISO 9001:2015 to ensure our quality management system is effective and efficient.' },
      { h: 'Continuous Improvement', b: 'We continually strive to enhance our processes and systems, fostering improvements in our workforce, machinery, materials, and methodologies.' },
      { h: 'Customer Satisfaction', b: 'Our ultimate goal is to meet and exceed our customers’ expectations, delivering products that satisfy their needs and preferences.' },
    ],
    objectivesTitle: 'Quality Objectives',
    objectives: [
      'Ensuring on-time supplies are 100% as per schedule.',
      'Ensuring defect-free 100% supplies of components.',
      'Reduction in customer line rejection and complaints.',
      'To upgrade skills of employees half-yearly, 100%.',
      'Continual improvement in products, services, and processes — including improving the effectiveness of the quality management system.',
    ],
    preparedLabel: 'Prepared By',
    reviewedLabel: 'Reviewed & Approved By',
    mrDesig: 'Management Representative (MR)',
    mdDesig: 'Managing Director (MD)',
    download: 'Download PDF',
  },
  hi: {
    kicker: 'प्रमाणित गुणवत्ता प्रबंधन · आईएसओ 9001:2015',
    title: 'गुणवत्ता नीति',
    intro: (
      <>
        <b>वैल्यू एडेड कोटिंग सॉल्यूशन प्राइवेट लिमिटेड</b> में, हम <b>आईएसओ 9001:2015</b> के
        कठोर मानकों का पालन करके उच्च गुणवत्ता वाले उत्पादों का उत्पादन करने के लिए समर्पित हैं।
        कुल ग्राहक संतुष्टि प्राप्त करने के लिए हम अपने संचालन के सभी पहलुओं —{' '}
        <b>आदमी, मशीन, सामग्री और तरीकों</b> — में निरंतर सुधार पर ध्यान केंद्रित करते हैं।
      </>
    ),
    commitmentTitle: 'हमारी प्रतिबद्धता में शामिल हैं',
    commitments: [
      { h: 'आईएसओ 9001:2015 मानकों का पालन', b: 'हम यह सुनिश्चित करने के लिए आईएसओ 9001:2015 द्वारा निर्धारित सभी आवश्यकताओं का अनुपालन करते हैं कि हमारी गुणवत्ता प्रबंधन प्रणाली प्रभावी और कुशल है।' },
      { h: 'निरंतर सुधार', b: 'हम अपने कार्यबल, मशीनरी, सामग्री और कार्यप्रणाली में सुधार को बढ़ावा देते हुए अपनी प्रक्रियाओं और प्रणालियों को बढ़ाने के लिए लगातार प्रयास करते हैं।' },
      { h: 'ग्राहक संतुष्टि', b: 'हमारा अंतिम लक्ष्य अपने ग्राहकों की अपेक्षाओं को पूरा करना और उनसे आगे निकलना है, उनकी जरूरतों और प्राथमिकताओं को पूरा करने वाले उत्पाद प्रदान करना है।' },
    ],
    objectivesTitle: 'गुणवत्ता के उद्देश्य',
    objectives: [
      'यह सुनिश्चित करना कि समय पर आपूर्ति शेड्यूल के अनुसार 100% हो।',
      'घटकों की दोष-मुक्त 100% आपूर्ति सुनिश्चित करना।',
      'ग्राहक लाइन अस्वीकृति और शिकायतों में कमी।',
      'कर्मचारी के अर्धवार्षिक कौशल को 100% उन्नत करना।',
      'उत्पादों, सेवाओं और प्रक्रियाओं में निरंतर सुधार; जिसमें गुणवत्ता प्रबंधन प्रणाली की प्रभावशीलता में सुधार शामिल है।',
    ],
    preparedLabel: 'तैयार कर्ता',
    reviewedLabel: 'समीक्षा एवं अनुमोदन',
    mrDesig: 'प्रबंधन प्रतिनिधि (MR)',
    mdDesig: 'प्रबंध निदेशक (MD)',
    download: 'पीडीएफ डाउनलोड करें',
  },
};

const YELLOW = '#FECE00';

export default function QualityPolicyContent() {
  const [lang, setLang] = useState<Lang>('en');
  const c = CONTENT[lang];

  // English → black tile / white text. Toggle interchanges tile ↔ font colour.
  const dark = lang === 'en';
  const tileBg = dark ? '#0A0A0A' : '#ffffff';
  const fg     = dark ? '#ffffff' : '#0A0A0A';
  const fgMuted = dark ? 'rgba(255,255,255,0.74)' : 'rgba(10,10,10,0.72)';
  const fgFaint = dark ? 'rgba(255,255,255,0.45)' : 'rgba(10,10,10,0.42)';
  const line    = dark ? 'rgba(255,255,255,0.14)' : 'rgba(10,10,10,0.12)';
  const chipBg  = dark ? 'rgba(255,255,255,0.05)' : 'rgba(10,10,10,0.03)';
  const trans   = 'background-color 0.45s ease, color 0.45s ease, border-color 0.45s ease';

  return (
    <section className="mx-auto max-w-3xl px-5 pt-28 pb-24 sm:px-6 sm:pt-32">

      {/* ── The tile ── */}
      <div
        className="rounded-[1.6rem] px-6 py-9 sm:px-11 sm:py-12"
        style={{
          backgroundColor: tileBg,
          color: fg,
          border: `1px solid ${dark ? 'rgba(255,255,255,0.10)' : 'rgba(10,10,10,0.10)'}`,
          boxShadow: dark ? '0 24px 70px rgba(0,0,0,0.28)' : '0 24px 70px rgba(10,10,10,0.10)',
          transition: trans,
        }}
      >

        {/* Kicker + language toggle */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <p
            className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.2em]"
            style={{ color: YELLOW }}
          >
            <ShieldCheck size={13} />
            {c.kicker}
          </p>

          {/* EN / हिंदी toggle */}
          <div
            className="inline-flex flex-shrink-0 items-center rounded-full p-1"
            style={{ border: `1px solid ${line}`, backgroundColor: chipBg, transition: trans }}
            role="group"
            aria-label="Language"
          >
            {([['en', 'English'], ['hi', 'हिंदी']] as [Lang, string][]).map(([code, label]) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className="rounded-full px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] transition-all duration-200"
                style={
                  lang === code
                    ? { backgroundColor: YELLOW, color: '#0A0A0A' }
                    : { backgroundColor: 'transparent', color: fgFaint }
                }
                onMouseEnter={(e) => { if (lang !== code) e.currentTarget.style.color = fg; }}
                onMouseLeave={(e) => { if (lang !== code) e.currentTarget.style.color = fgFaint; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <h1
          className="mt-4 font-display text-[clamp(2.1rem,6vw,3.4rem)] font-black leading-[0.98] tracking-[-0.04em]"
          style={{ color: fg, transition: trans }}
        >
          {c.title}
        </h1>

        {/* Document-control chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ['Ref No.', 'VACSPL-05-F03'],
            ['Standard', 'ISO 9001:2015'],
            ['Issue', '01 · 22.07.2024'],
            ['Rev.', '00'],
          ].map(([k, v]) => (
            <span
              key={k}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.66rem] font-medium"
              style={{ border: `1px solid ${line}`, backgroundColor: chipBg, transition: trans }}
            >
              <span className="font-bold uppercase tracking-[0.08em]" style={{ color: fgFaint }}>{k}</span>
              <span className="tabular-nums" style={{ color: fgMuted }}>{v}</span>
            </span>
          ))}
        </div>

        {/* Accent rule */}
        <div className="mt-8 h-[3px] w-16 rounded-full" style={{ backgroundColor: YELLOW }} />

        {/* Intro */}
        <p className="mt-8 text-[1.02rem] leading-[1.7]" style={{ color: fgMuted, transition: trans }}>
          {c.intro}
        </p>

        {/* Commitment */}
        <div className="mt-11 flex items-center gap-3">
          <span className="h-4 w-4 flex-none rounded-[3px]" style={{ backgroundColor: YELLOW }} />
          <h2 className="font-display text-[1.3rem] font-black tracking-tight" style={{ color: fg, transition: trans }}>
            {c.commitmentTitle}
          </h2>
        </div>
        <ul className="mt-5 flex flex-col gap-4">
          {c.commitments.map((item) => (
            <li key={item.h} className="relative pl-7 text-[0.97rem] leading-[1.6]" style={{ color: fgMuted, transition: trans }}>
              <span className="absolute left-0 top-[0.5rem] h-[9px] w-[9px] rounded-full" style={{ backgroundColor: YELLOW }} />
              <b style={{ color: fg }}>{item.h}</b> — {item.b}
            </li>
          ))}
        </ul>

        {/* Objectives */}
        <div className="mt-11 flex items-center gap-3">
          <span className="h-4 w-4 flex-none rounded-[3px]" style={{ backgroundColor: YELLOW }} />
          <h2 className="font-display text-[1.3rem] font-black tracking-tight" style={{ color: fg, transition: trans }}>
            {c.objectivesTitle}
          </h2>
        </div>
        <ul className="mt-5 flex flex-col gap-3">
          {c.objectives.map((item, i) => (
            <li key={i} className="relative pl-7 text-[0.97rem] leading-[1.6]" style={{ color: fgMuted, transition: trans }}>
              <span className="absolute left-0 top-[0.5rem] h-[9px] w-[9px] rounded-full" style={{ backgroundColor: YELLOW }} />
              {item}
            </li>
          ))}
        </ul>

        {/* Signatures */}
        <div className="mt-13 grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2" style={{ borderTop: `1px solid ${line}`, marginTop: '3.25rem', transition: trans }}>
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em]" style={{ color: fgFaint }}>{c.preparedLabel}</p>
            <p className="mt-4 inline-block pt-1.5 font-display text-[1.05rem] font-bold" style={{ color: fg, borderTop: `2px solid ${fg}`, transition: trans }}>Avinash Pandey</p>
            <p className="mt-0.5 text-[0.78rem]" style={{ color: fgFaint }}>{c.mrDesig}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em]" style={{ color: fgFaint }}>{c.reviewedLabel}</p>
            <p className="mt-4 inline-block pt-1.5 font-display text-[1.05rem] font-bold" style={{ color: fg, borderTop: `2px solid ${fg}`, transition: trans }}>Harish Sharma</p>
            <p className="mt-0.5 text-[0.78rem]" style={{ color: fgFaint }}>{c.mdDesig}</p>
          </div>
        </div>

        {/* Download PDF */}
        <div className="mt-10">
          <a
            href="/documents/optifinish-quality-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-colors duration-200"
            style={{ backgroundColor: YELLOW, color: '#0A0A0A' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = fg; e.currentTarget.style.color = tileBg; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = YELLOW; e.currentTarget.style.color = '#0A0A0A'; }}
          >
            <Download size={15} />
            {c.download}
          </a>
        </div>

      </div>
    </section>
  );
}
