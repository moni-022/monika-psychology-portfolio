import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
  LoaderCircle,
  Newspaper,
  RefreshCw,
} from "lucide-react";
import { useReveal } from "../effects/useReveal";
import "./PsychologyEdit.css";

type OpenAlexWork = {
  id: string;
  doi?: string | null;
  title?: string | null;
  display_name?: string | null;
  publication_date?: string | null;
  publication_year?: number | null;
  authorships?: { author?: { display_name?: string } }[];
  primary_location?: {
    source?: { display_name?: string; is_oa?: boolean } | null;
    landing_page_url?: string | null;
  } | null;
  open_access?: { is_oa?: boolean; oa_url?: string | null };
  abstract_inverted_index?: Record<string, number[]> | null;
  cited_by_count?: number;
  type?: string;
};
type Story = OpenAlexWork & {
  category: string;
  categoryKey: string;
  summary: string;
  href: string;
  authors: string;
};
const TOPICS = [
  { label: "All stories", query: "psychology", key: "all" },
  { label: "Mental health", query: "mental health psychology", key: "mental" },
  { label: "Mind & memory", query: "cognition memory attention", key: "mind" },
  {
    label: "Relationships",
    query: "social psychology relationships",
    key: "social",
  },
  {
    label: "Development",
    query: "developmental psychology wellbeing",
    key: "development",
  },
];
const pickCategory = (title: string) => {
  const t = title.toLowerCase();
  if (
    /mental health|depress|anxiety|wellbeing|well-being|therapy|psychotherapy|stress|trauma/.test(
      t,
    )
  )
    return { category: "Mental health", key: "mental" };
  if (/child|adolescen|development|parent|aging|ageing|lifespan/.test(t))
    return { category: "Growing minds", key: "development" };
  if (
    /social|relationship|loneliness|belonging|interpersonal|family|empathy/.test(
      t,
    )
  )
    return { category: "People & connection", key: "social" };
  if (
    /memory|attention|cognit|decision|perception|learning|brain|neurosci/.test(
      t,
    )
  )
    return { category: "Mind & memory", key: "mind" };
  return { category: "Psychology research", key: "research" };
};
function abstractText(index?: Record<string, number[]> | null) {
  if (!index) return "";
  const words: string[] = [];
  Object.entries(index).forEach(([word, positions]) =>
    positions.forEach((position) => {
      words[position] = word;
    }),
  );
  return words.join(" ").replace(/\s+/g, " ").trim();
}
function makeSummary(work: OpenAlexWork) {
  const abstract = abstractText(work.abstract_inverted_index);
  if (abstract.length > 35)
    return abstract.length > 210
      ? `${abstract.slice(0, 207).replace(/\s+\S*$/, "")}…`
      : abstract;
  return "A recent contribution to the psychology conversation. Open the original record to explore the study, its methods, and what the authors found.";
}
// function Illustration({ kind }: { kind: string }) {
//   return (
//     <div className={`edit-art edit-art-${kind}`} aria-hidden="true">
//       <span className="art-orbit orbit-one" />
//       <span className="art-orbit orbit-two" />
//       <span className="art-core">
//         {kind === "mental" ? (
//           <Heart />
//         ) : kind === "social" ? (
//           <Sparkles />
//         ) : kind === "development" ? (
//           <ArrowDownRight />
//         ) : kind === "mind" ? (
//           <BookOpen />
//         ) : (
//           <FlaskConical />
//         )}
//       </span>
//       <i className="art-dot dot-one" />
//       <i className="art-dot dot-two" />
//       <i className="art-dot dot-three" />
//       <span className="art-caption">a closer look at the mind</span>
//     </div>
//   );
// }
export default function PsychologyEdit() {
  const ref = useReveal<HTMLElement>();
  const [topic, setTopic] = useState("all");
  const [stories, setStories] = useState<Story[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const currentTopic = useMemo(
    () => TOPICS.find((t) => t.key === topic) ?? TOPICS[0],
    [topic],
  );
  const loadStories = useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams({
          search: currentTopic.query,
          sort: "publication_date:desc",
          per_page: "18",
          select:
            "id,doi,title,display_name,publication_date,publication_year,authorships,primary_location,open_access,abstract_inverted_index,cited_by_count,type",
        });
        const response = await fetch(
          `https://api.openalex.org/works?${params.toString()}`,
          { signal, headers: { Accept: "application/json" } },
        );
        if (!response.ok) throw new Error("OpenAlex request failed");
        const data = (await response.json()) as { results?: OpenAlexWork[] };
        const mapped = (data.results ?? [])
          .filter(
            (w) =>
              (w.title || w.display_name) &&
              (w.doi || w.primary_location?.landing_page_url || w.id),
          )
          .map((w): Story => {
            const title =
              w.title || w.display_name || "A psychology research story";
            const cat = pickCategory(title);
            return {
              ...w,
              category: cat.category,
              categoryKey: cat.key,
              summary: makeSummary(w),
              href: w.doi || w.primary_location?.landing_page_url || w.id,
              authors: (w.authorships ?? [])
                .slice(0, 3)
                .map((a) => a.author?.display_name)
                .filter(Boolean)
                .join(", "),
            };
          });
        if (!signal.aborted) {
          setStories(mapped);
          setActive(0);
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(true);
          setStories([]);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [currentTopic],
  );
  useEffect(() => {
    const controller = new AbortController();
    void loadStories(controller.signal);
    return () => controller.abort();
  }, [loadStories, reload]);
  const move = (delta: number) =>
    setActive((i) =>
      stories.length ? (i + delta + stories.length) % stories.length : 0,
    );
  const handleTouchEnd = (endX: number) => {
    if (touchStartX === null) return;
    const distance = endX - touchStartX;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
    setTouchStartX(null);
  };
  const activeStory = stories[active];
  const sideStories =
    stories.length > 1
      ? [
          stories[(active - 1 + stories.length) % stories.length],
          stories[(active + 1) % stories.length],
        ]
      : [];
  return (
    <section
      className="psych-edit-section section-space"
      id="psychology-edit"
      ref={ref}
    >
      <div className="psych-edit-wrap">
        <div className="section-kicker reveal-item">
          A LITTLE CURIOSITY, WELL SPENT <span>✹</span>
        </div>
        <div className="psych-edit-heading reveal-item">
          <div>
            <h2>
              The Psychology <em>Edit.</em>
            </h2>
            <p>New ideas. Emerging research. A little more understanding.</p>
          </div>
          <div className="edit-heading-note">
            <span className="edit-note-icon">
              <Newspaper size={17} />
            </span>
            <span>
              A thoughtful reading list for curious minds—bringing research
              closer to everyday life.
            </span>
          </div>
        </div>
        <div className="edit-toolbar reveal-item">
          <div
            className="edit-topics"
            role="group"
            aria-label="Filter psychology stories"
          >
            {TOPICS.map((t) => (
              <button
                type="button"
                key={t.key}
                className={topic === t.key ? "edit-topic active" : "edit-topic"}
                aria-pressed={topic === t.key}
                onClick={() => setTopic(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            className="edit-refresh"
            type="button"
            onClick={() => setReload((n) => n + 1)}
            disabled={loading}
            aria-label="Refresh psychology stories"
          >
            <RefreshCw size={14} className={loading ? "is-spinning" : ""} />
            <span>Refresh</span>
          </button>
        </div>
        {loading ? (
          <div className="edit-status" role="status">
            <LoaderCircle className="is-spinning" size={22} />
            <span>Gathering thoughtful reads…</span>
          </div>
        ) : error || !activeStory ? (
          <div className="edit-status edit-error">
            <span>
              We couldn’t reach the reading shelf just now. Please try again in
              a moment.
            </span>
            <button type="button" onClick={() => setReload((n) => n + 1)}>
              Try again <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <>
            <div
              className="edit-carousel reveal-item"
              aria-live="polite"
              onTouchStart={(event) =>
                setTouchStartX(event.changedTouches[0]?.clientX ?? null)
              }
              onTouchEnd={(event) =>
                handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)
              }
              onTouchCancel={() => setTouchStartX(null)}
            >
              {sideStories[0] && (
                <button
                  className="edit-side-card edit-side-left"
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Show previous story"
                >
                  <span className="edit-side-meta">
                    {sideStories[0].category}
                  </span>
                  <span className="edit-side-title">
                    {sideStories[0].title || sideStories[0].display_name}
                  </span>
                  <span className="edit-side-open">
                    Explore story <ArrowRight size={13} />
                  </span>
                </button>
              )}
              <article className="edit-feature-card">
                <div className="edit-feature-content">
                  <div className="edit-story-meta">
                    <span>{activeStory.category}</span>
                    {activeStory.open_access?.is_oa && (
                      <span className="edit-open-access">Open access</span>
                    )}
                  </div>
                  <h3>{activeStory.title || activeStory.display_name}</h3>
                  <p className="edit-story-summary">{activeStory.summary}</p>
                  {activeStory.authors && (
                    <p className="edit-authors">
                      {activeStory.authors}
                      {(activeStory.authorships?.length ?? 0) > 3
                        ? " et al."
                        : ""}
                    </p>
                  )}
                  <div className="edit-feature-bottom">
                    <a href={activeStory.href} target="_blank" rel="noreferrer">
                      Read the original <ExternalLink size={14} />
                    </a>
                    <span>
                      <BookOpen size={14} /> Research & ideas
                    </span>
                  </div>
                </div>
              </article>
              {sideStories[1] && (
                <button
                  className="edit-side-card edit-side-right"
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Show next story"
                >
                  <span className="edit-side-meta">
                    {sideStories[1].category}
                  </span>
                  <span className="edit-side-title">
                    {sideStories[1].title || sideStories[1].display_name}
                  </span>
                  <span className="edit-side-open">
                    Explore story <ArrowRight size={13} />
                  </span>
                </button>
              )}
              <div className="edit-arrows edit-arrows-sides">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous story"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next story"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
            <div className="edit-controls">
              <div className="edit-pagination">
                <span className="edit-current-count">{active + 1}</span>
                <span className="edit-count-of">of</span>
                <span>{stories.length}</span>
                <span className="edit-count-label">
                  stories in this selection
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
