import { Briefcase, Building2, Code2, Cog, Cpu, FlaskConical, GraduationCap, Laptop, Network, RadioTower, Zap } from 'lucide-react'

const ICONS = { Briefcase, Building2, Code2, Cog, Cpu, FlaskConical, Laptop, Network, RadioTower, Zap }

// <CourseIcon name={course.icon} className="size-5" />
export default function CourseIcon({ name, className = 'size-5' }) {
  const Icon = ICONS[name] ?? GraduationCap
  return <Icon className={className} aria-hidden="true" />
}
