import { PageHeaderProps, colors } from "@/api/types/pageHeader.type";
import Link from "next/link";
import { Fragment } from "react";

export default function PageHeader({
  icon,
  tag,
  title,
  description,
  color = "green",
}: PageHeaderProps) {
  return (
    <section className={`bg-gradient-to-r text-white ${colors[color]}`}>
      <div className="mx-auto container px-4 py-10">
        <nav className="mb-6 flex flex-wrap gap-2 text-sm">
          <Link href="/" className="text-white/70 hover:text-white">Home</Link>
          {tag.map((item) => (
            <Fragment key={item.label}>
              <span className="text-white/40">/</span>
              {item.href ? (
                <Link href={item.href} className="text-white/70 hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium">{item.label}</span>
              )}
            </Fragment>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/20 shadow-lg [&>svg]:size-8">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-white/80">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}