import { useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, Brain, BriefcaseBusiness, ExternalLink, GraduationCap, Heart, RotateCcw } from 'lucide-react';
import { useReveal } from '../effects/useReveal';
import './MyJourney.css';

type JourneyEntry = {
  date: string;
  title: string;
  tag?: string;
  href?: string;
  img?: string;
  description: string;
};

const education: JourneyEntry[] = [
  {
    date: '2024 — 2026',
    title: 'Christ University',
    img: 'https://media.licdn.com/dms/image/v2/D560BAQE8x41PUxqTwQ/company-logo_200_200/B56Zq6hwrSG0AM-/0/1764066004385/christuniversityncr_logo?e=1793836800&v=beta&t=xvJH2obxeH2JnU3ul_xI_keisE1DenQ2nZHvmXC4FVQ',
    href: 'https://www.linkedin.com/school/christuniversityncr/',
    description: 'Master’s in Clinical Psychology, Delhi NCR.',
  },
  {
    date: '2021 — 2024',
    title: 'SGT University',
    img: 'https://media.licdn.com/dms/image/v2/D560BAQEMwEyvTDmgQA/company-logo_200_200/company-logo_200_200/0/1704530499752/sgt_university_logo?e=1793836800&v=beta&t=JQwV2ZKO3RTq2IjeSm59HYuRC1psQSLWGH7yyTRvyZ4',
    href: 'https://www.linkedin.com/school/sgt-university/',
    description: 'Bachelor’s in Clinical Psychology, Gurgaon.',
  },
  {
    date: '2019 — 2021',
    title: 'St. Patrick’s Jr. College',
    img: 'https://media.licdn.com/dms/image/v2/D560BAQFvT1fRrX6rDQ/company-logo_200_200/B56ZrpNEx4MEAI-/0/1764849110860/st_patricks_junior_college_logo?e=1793836800&v=beta&t=vGuht0eYj0wehSXSRDDIjxXem7snyJk_JeGumHnwrgs',
    href: 'https://www.linkedin.com/school/st-patricks-junior-college/',
    description: 'High school education in Agra.',
  },
];

const experience: JourneyEntry[] = [
  {
    date: 'Aug 2026 — Present',
    title: 'Lyfsmile',
    tag: 'Counselling Psychologist',
    img: 'https://media.licdn.com/dms/image/v2/D4E0BAQEMYOFZ6zwpjg/company-logo_200_200/B4EaDIU7PAHQAE-/0/1790067324102/lyfsmile_logo?e=1793836800&v=beta&t=MMj7nix0iKII4WuaFWfflR73-n1GNC9W_P5hsx6AsLo',
    href: 'https://www.linkedin.com/company/lyfsmile/',
    description: 'Full Time role as a Counselling Psychologist, providing therapy, assessments, and support for various mental health concerns.',
  },
  {
    date: 'Mar — Apr 2026',
    title: 'Institute of Mental Health and Hospital (IMHH)',
    tag: 'Clinical internship',
    img: 'https://media.licdn.com/dms/image/v2/C4D0BAQG9Da0h79fXlw/company-logo_200_200/company-logo_200_200/0/1631319447780?e=1793836800&v=beta&t=-9EwvKuK-B2O8B0XyYV8SwgzdpSGZd5FwqsbArH9yGw',
    href: 'https://www.linkedin.com/school/institute-of-mental-health-&-hospital-imhh-agra-u-p-erstwhile-agra-mental-hospital-/',
    description: 'Gained clinical exposure to psychiatric evaluations, MSE, psychotherapy, psychological assessments, and multidisciplinary ward rounds, strengthening foundational skills in case formulation and patient care.',
  },
  {
    date: 'Feb 2026',
    title: 'Institute Of Human Behaviour And Allied Sciences (IHBAS)',
    tag: 'Clinical internship',
    img: 'https://media.licdn.com/dms/image/v2/D4D0BAQH3x5sdigXZXg/company-logo_200_200/company-logo_200_200/0/1688607460978/institute_of_human_behaviour_and_allied_sciences_logo?e=1793836800&v=beta&t=nPBVmtJhzvBBu0I_3z9uAbi1te6raTinOH7So4cOwY4',
    href: 'https://www.linkedin.com/school/institute-of-human-behaviour-and-allied-sciences/',
    description: 'Completed a clinical internship at IHBAS, gaining exposure to OPD assessments, MSE, behavioural therapy, case formulation, and psychological assessments across diverse psychiatric conditions.',
  },
  {
    date: 'Jan — Feb 2026',
    title: 'Max Healthcare',
    tag: 'Clinical internship',
    img: 'https://media.licdn.com/dms/image/v2/D4D0BAQEUqaP7556StQ/company-logo_200_200/B4DaBDy_iEHcAE-/0/1787843836414/max_healthcare_logo?e=1793836800&v=beta&t=JF51F36uDA5AHWgvikiqgQqUGpVWpoypdhF-KbnQGj8',
    href: 'https://www.linkedin.com/company/max-healthcare/',
    description: 'Completed a Clinical Psychology Internship at Max Super Speciality Hospital, Saket, gaining experience in psychiatric case observation, MSE, counselling, and psychological assessments.',
  },
  {
    date: 'Jul — Oct 2025',
    title: 'Santosh Hospitals',
    tag: 'Clinical internship',
    img: 'https://media.licdn.com/dms/image/v2/C510BAQFXCGkvvenrOw/company-logo_200_200/company-logo_200_200/0/1630620616150/santoshhospitals_logo?e=1793836800&v=beta&t=aZGcFNQdiVeFj0VaJmxWI_jDALIua9qpqme1NxL5XQ8',
    href: 'https://www.linkedin.com/company/santoshhospitals/',
    description: 'Completed a Clinical Psychology Internship at Santosh Hospital, gaining experience in counselling, MSE, psychological assessments, case evaluation, and mental health awareness.',
  },
  {
    date: 'May — Jun 2025',
    title: 'Institute of Mental Health and Hospital (IMHH)',
    tag: 'Clinical internship',
    img: 'https://media.licdn.com/dms/image/v2/C4D0BAQG9Da0h79fXlw/company-logo_200_200/company-logo_200_200/0/1631319447780?e=1793836800&v=beta&t=-9EwvKuK-B2O8B0XyYV8SwgzdpSGZd5FwqsbArH9yGw',
    href: 'https://www.linkedin.com/school/institute-of-mental-health-&-hospital-imhh-agra-u-p-erstwhile-agra-mental-hospital-/',
    description: 'Administered psychological assessments (Rorschach, DAPT), took patient histories and MSEs, and worked across diverse mental health cases.',
  },
  {
    date: 'Jan — Apr 2025',
    title: 'Adhyayan Inclusive Centre',
    tag: 'Inclusive support',
    img: 'https://media.licdn.com/dms/image/v2/C4D0BAQG4y7ZyQKVfFg/company-logo_200_200/company-logo_200_200/0/1657276711261?e=1793836800&v=beta&t=cdVpv-X3iVxuX9DnGhYTIC1gJNobZpM9ZTiQw3wIfzY',
    href: 'https://www.linkedin.com/company/adhyayan-inclusive-learning-centre/',
    description: 'Supported children with Autism, ADHD, Down Syndrome using academic and therapeutic tools; promoted inclusion and engagement.',
  },
  {
    date: 'Aug — Oct 2024',
    title: 'SPYM',
    tag: 'Rehabilitation',
    img: 'https://media.licdn.com/dms/image/v2/D560BAQHZNOQhr5nBkw/company-logo_200_200/company-logo_200_200/0/1713873031483/spym_logo?e=1793836800&v=beta&t=IKBoLAIKmtvf_Ku2JjSu9WjDROAYDvsM-gfss16seAw',
    href: 'https://www.linkedin.com/company/spym/',
    description: 'Worked with substance use cases, helped in group sessions, relapse prevention programs, and family meetings for rehabilitation.',
  },
  {
    date: 'Feb — Mar 2024',
    title: 'Blossom Clinic',
    tag: 'Assessment & learning',
    description: 'Observed therapy sessions, conducted client assessments, prepared psychoeducational material, and participated in mental health initiatives.',
  },
  {
    date: 'Feb — May 2023',
    title: 'Mission Hospital',
    tag: 'Clinical exposure',
    description: 'Conducted case history interviews, Mental Status Examinations (MSE), assisted in psychometric assessments, and supported therapeutic documentation under supervision.',
  },
];

type Deck = 'experience' | 'education';

export default function MyJourney() {
  const ref = useReveal<HTMLElement>();
  const [deck, setDeck] = useState<Deck>('experience');
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const entries = deck === 'experience' ? experience : education;
  const current = entries[activeIndex];
  const next = entries[activeIndex + 1];
  const previous = entries[activeIndex - 1];

  const changeDeck = (nextDeck: Deck) => {
    setDeck(nextDeck);
    setActiveIndex(0);
    setSwipeDirection(null);
  };

  const move = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setActiveIndex(index => {
      if (direction === 'left') return index < entries.length - 1 ? index + 1 : 0;
      return index > 0 ? index - 1 : entries.length - 1;
    });
  };

  const handleTouchEnd = (x: number, y: number) => {
    if (!touchStart) return;
    const dx = x - touchStart.x;
    const dy = y - touchStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      move(dx < 0 ? 'left' : 'right');
    }
    setTouchStart(null);
  };

  return (
    <section className="journey-section section-wrap section-space" id="journey" ref={ref}>
      <div className="section-kicker reveal-item">MY LEARNING PATH <span>✳</span></div>
      <div className="journey-heading reveal-item">
        <h2>A journey shaped<br />by <em>learning and people.</em></h2>
      </div>

      <div className="journey-deck-toolbar reveal-item">
        <div className="journey-deck-tabs" role="tablist" aria-label="Journey category">
          <button type="button" role="tab" aria-selected={deck === 'experience'} className={deck === 'experience' ? 'active' : ''} onClick={() => changeDeck('experience')}>
            <BriefcaseBusiness size={15} /> Experience <span>{experience.length}</span>
          </button>
          <button type="button" role="tab" aria-selected={deck === 'education'} className={deck === 'education' ? 'active' : ''} onClick={() => changeDeck('education')}>
            <GraduationCap size={16} /> Education <span>{education.length}</span>
          </button>
        </div>
        <p className="journey-swipe-hint"><ArrowLeft size={13} /> Swipe to explore <ArrowRight size={13} /></p>
      </div>

      <div className="journey-deck-layout reveal-item">
        <div className="journey-deck" aria-label={`${deck === 'experience' ? 'Experience' : 'Education'} cards`}>
          {next && <div className="journey-card journey-card-back journey-card-back-two" aria-hidden="true" />}
          {next && <div className="journey-card journey-card-back journey-card-back-one" aria-hidden="true"><span>{String(activeIndex + 2).padStart(2, '0')}</span></div>}
          <article
            key={`${deck}-${activeIndex}`}
            className={`journey-card journey-card-front${swipeDirection ? ` swipe-${swipeDirection}` : ''}`}
            onTouchStart={event => setTouchStart({ x: event.changedTouches[0]?.clientX ?? 0, y: event.changedTouches[0]?.clientY ?? 0 })}
            onTouchEnd={event => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0, event.changedTouches[0]?.clientY ?? 0)}
            onTouchCancel={() => setTouchStart(null)}
          >
            <div className="journey-card-topline">
              <span className="journey-card-index">{String(activeIndex + 1).padStart(2, '0')} <i>/ {String(entries.length).padStart(2, '0')}</i></span>
              <span className="journey-card-kind">{deck === 'experience' ? 'FIELD NOTES' : 'EDUCATION'}</span>
            </div>
            <div className="journey-card-art" aria-hidden="true">
              <span className="journey-card-orbit orbit-one" />
              <span className="journey-card-orbit orbit-two" />
              {current.img ? (
                <span className="journey-card-image-wrap">
                  <img
                    className="journey-card-image"
                    src={current.img}
                    alt={`${current.title} logo`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={event => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                </span>
              ) : (
                <span className="journey-card-symbol">{deck === 'experience' ? <Heart size={37} strokeWidth={1.1} /> : <Brain size={39} strokeWidth={1.1} />}</span>
              )}
              <span className="journey-card-art-caption">{deck === 'experience' ? 'Practice & perspective' : 'Learning & discovery'}</span>
            </div>
            <div className="journey-card-content">
              <span className="journey-card-date">{current.date}</span>
              <h3>{current.title}</h3>
              {current.tag && <span className="experience-tag">{current.tag}</span>}
              <p>{current.description}</p>
              {current.href && <a className="journey-card-link" href={current.href} target="_blank" rel="noreferrer">Explore organisation <ExternalLink size={13} /></a>}
            </div>
            <div className="journey-card-bottom"><span>MONIKA MITTAL <span>·</span> MY JOURNEY</span><ArrowDownRight size={17} /></div>
          </article>
        </div>

        <aside className="journey-deck-aside">
          <span className="journey-aside-label">{deck === 'experience' ? 'EXPERIENCE & EXPOSURE' : 'EDUCATION'}</span>
          <h3>{activeIndex === 0 ? 'The latest chapter.' : activeIndex === entries.length - 1 ? 'Where it began.' : 'One step at a time.'}</h3>
          <div className="journey-progress" role="progressbar" aria-valuemin={1} aria-valuemax={entries.length} aria-valuenow={activeIndex + 1}>
            <span style={{ width: `${((activeIndex + 1) / entries.length) * 100}%` }} />
          </div>
          <div className="journey-progress-label"><span>{String(activeIndex + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}</span><span>{deck === 'experience' ? 'Career chapters' : 'Learning chapters'}</span></div>
          <div className="journey-card-actions">
            <button type="button" className="journey-action journey-action-previous" onClick={() => move('right')} aria-label="Previous card" title="Previous card"><ArrowLeft size={17} /></button>
            <button type="button" className="journey-action journey-action-next" onClick={() => move('left')} aria-label={activeIndex === entries.length - 1 ? 'Start again' : 'Next card'} title={activeIndex === entries.length - 1 ? 'Start again' : 'Next card'}>{activeIndex === entries.length - 1 ? <RotateCcw size={17} /> : <ArrowRight size={17} />}</button>
          </div>
          {previous && <span className="journey-previous-note">Previous: {previous.title}</span>}
        </aside>
      </div>
    </section>
  );
}
