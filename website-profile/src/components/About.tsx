import { BookOpen, Briefcase, GraduationCap, Languages, MapPin } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { LOCATION, PUBLICATION_COUNT, getEducation, getExperience } from "../data/content";
import { useContent, useLanguage } from "../i18n/useLanguage";

export function About() {
  const t = useContent();
  const { language } = useLanguage();
  const currentRole = getExperience(language)[0];
  const education = getEducation(language);

  const glanceRows = [
    { icon: MapPin, label: t.about.locationLabel, value: LOCATION },
    {
      icon: Languages,
      label: t.about.languages.title,
      value: t.about.languages.items.map((item) => `${item.name} — ${item.level}`).join(" · "),
    },
    { icon: GraduationCap, label: t.about.educationLabel, value: education.degree },
    {
      icon: Briefcase,
      label: t.about.currentRoleLabel,
      value: `${currentRole.role} · ${currentRole.company}`,
    },
    { icon: BookOpen, label: t.about.publicationLabel, value: String(PUBLICATION_COUNT) },
  ];

  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title} muted>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        {/* Narrative + highlight chips */}
        <Reveal>
          <div className="space-y-4">
            {t.about.summary.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {t.about.highlights.map((highlight) => (
              <Badge key={highlight} variant="primary">
                {highlight}
              </Badge>
            ))}
          </div>
        </Reveal>

        {/* At a glance */}
        <Reveal delay={0.1}>
          <Card className="h-full p-5 sm:p-6">
            <p className="font-mono text-xs font-medium uppercase tracking-wide text-slate-500">
              {t.about.glanceTitle}
            </p>
            <ul className="mt-4 space-y-4">
              {glanceRows.map((row) => (
                <li key={row.label} className="flex items-start gap-3">
                  <row.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs text-slate-500">{row.label}</p>
                    <p className="mt-0.5 text-sm text-slate-700">{row.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
