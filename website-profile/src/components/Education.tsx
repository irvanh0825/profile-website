import { BookOpen, Building2, CalendarDays } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Card } from "./ui/Card";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { getEducation, getPublication } from "../data/content";
import { useLanguage, useContent } from "../i18n/useLanguage";

export function Education() {
  const t = useContent();
  const { language } = useLanguage();
  const education = getEducation(language);
  const publication = getPublication(language);

  return (
    <Section id="education" eyebrow={t.education.eyebrow} title={t.education.title}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Education card */}
        <Reveal>
          <Card className="h-full p-6">
            <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-slate-500">
              <Building2 className="size-3.5" aria-hidden="true" />
              {education.school}
            </div>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-slate-900">
              {education.degree}
            </h3>
            <p className="mt-1 font-mono text-sm text-slate-500">{education.periodLabel}</p>

            <div className="mt-4">
              <Badge variant="default" size="sm">
                {education.gpaLabel} {education.gpa}
              </Badge>
            </div>

            <div className="mt-5">
              <p className="font-mono text-xs text-slate-500">{education.focusLabel}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {education.focusAreas.map((area) => (
                  <Badge key={area} variant="default" size="sm">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Publication card */}
        <Reveal delay={0.1}>
          <Card className="h-full p-6">
            <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-slate-500">
              <BookOpen className="size-3.5" aria-hidden="true" />
              {publication.label}
            </div>
            <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900">
              {publication.title}
            </h3>

            <p className="mt-4 text-sm italic text-slate-500">{t.publication.alternateLabel}</p>
            <p className="text-sm text-slate-600">{publication.alternateTitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-slate-500">
              <span>{publication.publisher}</span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                {publication.dateLabel}
              </span>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
