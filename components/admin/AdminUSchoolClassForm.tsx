"use client";

import { useMemo, useState } from "react";

type SessionDraft = {
  title: string;
  durationMinutes: number;
  youtubeUrl: string;
  aparatUrl: string;
  text: string;
  imageUrl: string;
};

type Props = {
  mode?: "create" | "edit";
  initialData?: Partial<{
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    category: string;
    tags: string;
    imageUrl: string;
    youtubeUrl: string;
    aparatUrl: string;
    totalDurationMinutes: number;
    sessionCount: number;
    minAge: number;
    maxAge: number | null;
    price: number;
    status: "draft" | "published" | "inactive";
    featured: boolean;
  }>;
};

export default function AdminUSchoolClassForm({
  mode = "create",
  initialData = {},
}: Props) {
  const [title, setTitle] = useState(
    initialData.title ?? "",
  );

  const [slug, setSlug] = useState(
    initialData.slug ?? "",
  );

  const [shortDescription, setShortDescription] =
    useState(initialData.shortDescription ?? "");

  const [description, setDescription] =
    useState(initialData.description ?? "");

  const [category, setCategory] = useState(
    initialData.category ?? "Technology",
  );

  const [tags, setTags] = useState(
    initialData.tags ?? "",
  );

  const [imageUrl, setImageUrl] = useState(
    initialData.imageUrl ?? "",
  );

  const [youtubeUrl, setYoutubeUrl] = useState(
    initialData.youtubeUrl ?? "",
  );

  const [aparatUrl, setAparatUrl] = useState(
    initialData.aparatUrl ?? "",
  );

  const [totalDurationMinutes, setTotalDurationMinutes] =
    useState(
      initialData.totalDurationMinutes ?? 240,
    );

  const [sessionCount, setSessionCount] =
    useState(initialData.sessionCount ?? 4);

  const [minAge, setMinAge] = useState(
    initialData.minAge ?? 12,
  );

  const [maxAge, setMaxAge] = useState<number | null>(
    initialData.maxAge ?? null,
  );

  const [price, setPrice] = useState(
    initialData.price ?? 1,
  );

  const [status, setStatus] = useState<
    "draft" | "published" | "inactive"
  >(initialData.status ?? "draft");

  const [featured, setFeatured] = useState(
    initialData.featured ?? false,
  );

  const [saved, setSaved] = useState(false);

  const sessions = useMemo<SessionDraft[]>(() => {
    const count = Math.max(
      1,
      Math.min(50, sessionCount),
    );

    const duration = Math.max(
      1,
      Math.floor(totalDurationMinutes / count),
    );

    return Array.from({ length: count }).map(
      (_, index) => ({
        title: `Session ${index + 1}`,
        durationMinutes: duration,
        youtubeUrl,
        aparatUrl,
        text: "",
        imageUrl: "",
      }),
    );
  }, [
    sessionCount,
    totalDurationMinutes,
    youtubeUrl,
    aparatUrl,
  ]);

  function handleSave(event: React.FormEvent) {
    event.preventDefault();

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3500);
  }

  return (
    <form
      className="admin-uschool-class-form"
      onSubmit={handleSave}
    >
      <div className="admin-uschool-form-layout">
        <div className="admin-uschool-form-main">
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <span className="admin-panel-eyebrow">
                  CLASS INFORMATION
                </span>

                <h2>Class details</h2>

                <p>
                  Define the public information of this
                  educational product.
                </p>
              </div>
            </div>

            <div className="admin-form-grid">
              <label className="admin-form-field admin-form-field-full">
                <span>Class title</span>

                <input
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Example: AI Foundations"
                  required
                />
              </label>

              <label className="admin-form-field">
                <span>Slug</span>

                <input
                  value={slug}
                  onChange={(event) =>
                    setSlug(event.target.value)
                  }
                  placeholder="ai-foundations"
                />
              </label>

              <label className="admin-form-field">
                <span>Category</span>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                >
                  <option>Technology</option>
                  <option>Digital Skills</option>
                  <option>Business</option>
                  <option>Design</option>
                  <option>Personal Development</option>
                  <option>Science</option>
                </select>
              </label>

              <label className="admin-form-field admin-form-field-full">
                <span>Short description</span>

                <input
                  value={shortDescription}
                  onChange={(event) =>
                    setShortDescription(
                      event.target.value,
                    )
                  }
                  placeholder="A short description shown on class cards."
                  required
                />
              </label>

              <label className="admin-form-field admin-form-field-full">
                <span>Full description</span>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value,
                    )
                  }
                  rows={7}
                  placeholder="Detailed description of the class..."
                />
              </label>

              <label className="admin-form-field admin-form-field-full">
                <span>Class banner / image URL</span>

                <input
                  type="url"
                  value={imageUrl}
                  onChange={(event) =>
                    setImageUrl(event.target.value)
                  }
                  placeholder="https://..."
                />
              </label>

              <label className="admin-form-field">
                <span>Tags</span>

                <input
                  value={tags}
                  onChange={(event) =>
                    setTags(event.target.value)
                  }
                  placeholder="AI, Beginner, Technology"
                />
              </label>

              <label className="admin-form-field">
                <span>Status</span>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as
                        | "draft"
                        | "published"
                        | "inactive",
                    )
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">
                    Published
                  </option>
                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </label>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <span className="admin-panel-eyebrow">
                  VIDEO SOURCES
                </span>

                <h2>Class video</h2>

                <p>
                  Add YouTube and Aparat links so the
                  platform can support multiple video
                  providers.
                </p>
              </div>
            </div>

            <div className="admin-form-grid">
              <label className="admin-form-field">
                <span>YouTube URL</span>

                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(event) =>
                    setYoutubeUrl(event.target.value)
                  }
                  placeholder="https://youtube.com/..."
                />
              </label>

              <label className="admin-form-field">
                <span>Aparat URL</span>

                <input
                  type="url"
                  value={aparatUrl}
                  onChange={(event) =>
                    setAparatUrl(event.target.value)
                  }
                  placeholder="https://aparat.com/..."
                />
              </label>
            </div>

            <div className="admin-uschool-provider-note">
              <strong>Multi-provider video architecture</strong>

              <span>
                Both sources are stored independently so
                USchool can later switch between providers
                without changing the class structure.
              </span>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <span className="admin-panel-eyebrow">
                  DAILY LEARNING
                </span>

                <h2>Class schedule</h2>

                <p>
                  The system divides the total course into
                  daily sessions.
                </p>
              </div>
            </div>

            <div className="admin-form-grid">
              <label className="admin-form-field">
                <span>
                  Total duration (minutes)
                </span>

                <input
                  type="number"
                  min="1"
                  value={totalDurationMinutes}
                  onChange={(event) =>
                    setTotalDurationMinutes(
                      Number(event.target.value),
                    )
                  }
                />
              </label>

              <label className="admin-form-field">
                <span>Number of sessions</span>

                <input
                  type="number"
                  min="1"
                  max="50"
                  value={sessionCount}
                  onChange={(event) =>
                    setSessionCount(
                      Number(event.target.value),
                    )
                  }
                />
              </label>
            </div>

            <div className="admin-uschool-session-preview">
              <div className="admin-uschool-session-preview-header">
                <strong>
                  Generated sessions
                </strong>

                <span>
                  {sessions.length} sessions
                </span>
              </div>

              <div className="admin-uschool-session-list">
                {sessions.map(
                  (session, index) => (
                    <div
                      key={index}
                      className="admin-uschool-session-row"
                    >
                      <span className="admin-uschool-session-number">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <div>
                        <strong>
                          {session.title}
                        </strong>

                        <span>
                          Day {index + 1} ·{" "}
                          {session.durationMinutes} min
                        </span>
                      </div>

                      <span className="admin-uschool-session-lock">
                        🔒 Day {index + 1}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <span className="admin-panel-eyebrow">
                  ACCESS CONTROL
                </span>

                <h2>Age restriction</h2>

                <p>
                  Classes can automatically be locked
                  for users outside the configured age
                  range.
                </p>
              </div>
            </div>

            <div className="admin-form-grid">
              <label className="admin-form-field">
                <span>Minimum age</span>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={minAge}
                  onChange={(event) =>
                    setMinAge(
                      Number(event.target.value),
                    )
                  }
                />
              </label>

              <label className="admin-form-field">
                <span>Maximum age</span>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={maxAge ?? ""}
                  onChange={(event) =>
                    setMaxAge(
                      event.target.value
                        ? Number(
                            event.target.value,
                          )
                        : null,
                    )
                  }
                  placeholder="No maximum"
                />
              </label>
            </div>

            <div className="admin-uschool-age-preview">
              <span>Current access range</span>

              <strong>
                {minAge}+
                {maxAge
                  ? ` — ${maxAge} years`
                  : ""}
              </strong>
            </div>
          </section>
        </div>

        <aside className="admin-uschool-form-sidebar">
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <span className="admin-panel-eyebrow">
                  COMMERCE
                </span>

                <h2>Pricing</h2>
              </div>
            </div>

            <label className="admin-form-field">
              <span>Price (USD)</span>

              <div className="admin-uschool-price-input">
                <span>$</span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) =>
                    setPrice(
                      Number(event.target.value),
                    )
                  }
                />
              </div>
            </label>

            <div className="admin-uschool-payment-preview">
              <span>Customer pays</span>

              <strong>${price.toFixed(2)}</strong>

              <small>
                Payment integration will be connected
                later.
              </small>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <span className="admin-panel-eyebrow">
                  VISIBILITY
                </span>

                <h2>Class options</h2>
              </div>
            </div>

            <label className="admin-toggle-field">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) =>
                  setFeatured(
                    event.target.checked,
                  )
                }
              />

              <span>
                <strong>Featured class</strong>
                <small>
                  Highlight this class in the catalog.
                </small>
              </span>
            </label>
          </section>

          {saved && (
            <div className="admin-form-success">
              <strong>
                Class saved successfully.
              </strong>

              <span>
                This is currently a demo save state.
              </span>
            </div>
          )}

          <button
            type="submit"
            className="admin-button admin-button-primary admin-uschool-save-button"
          >
            {mode === "edit"
              ? "Save Class"
              : "Create Class"}
          </button>
        </aside>
      </div>
    </form>
  );
}