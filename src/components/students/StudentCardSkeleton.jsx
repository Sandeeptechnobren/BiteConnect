/** Placeholder matching the default StudentCard layout. */
export default function StudentCardSkeleton() {
  return (
    <div className="card flex flex-col overflow-hidden" aria-hidden="true">
      <div className="h-16 bg-slate-100" />
      <div className="flex flex-col items-center px-4 pb-4">
        <div className="skeleton -mt-10 size-20 rounded-full ring-4 ring-white" />
        <div className="skeleton mt-4 h-4 w-32" />
        <div className="skeleton mt-2 h-3 w-40" />
        <div className="skeleton mt-2 h-3 w-28" />
        <div className="mt-4 flex gap-1.5">
          <div className="skeleton h-6 w-14 rounded-full" />
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-12 rounded-full" />
        </div>
        <div className="skeleton mt-5 h-11 w-full rounded-xl" />
      </div>
    </div>
  )
}
