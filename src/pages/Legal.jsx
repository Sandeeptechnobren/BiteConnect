import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ShieldCheck } from 'lucide-react'
import { cn } from '../utils/format'

const LAST_UPDATED = '1 November 2026'

const DOCS = {
  privacy: {
    title: 'Privacy Policy',
    Icon: ShieldCheck,
    intro:
      'Bite Connect is a prototype built to demonstrate college discovery and student networking. This policy explains, in plain language, what information the prototype handles and where it lives.',
    sections: [
      {
        id: 'information-we-collect',
        title: 'Information we collect',
        body: [
          'When you sign up or edit your profile, the prototype keeps the details you enter — such as your name, email address, college, course, academic year, skills, interests and an optional profile photo.',
          'This information is stored only in your browser’s localStorage on the device you are using. It is not transmitted to Bite Connect, Kinetic Software Solutions or any third party, and there is no server-side database.',
          'Passwords you type on the sign-up or log-in screens are used only for on-screen validation and are never saved.',
        ],
      },
      {
        id: 'how-we-use-it',
        title: 'How we use it',
        body: [
          'Locally stored data is used to personalise the prototype: showing your name in the navigation bar, rendering your profile page, and remembering your connection requests and notifications between visits.',
          'We do not use your information for advertising, profiling, or sale to third parties.',
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies & local storage',
        body: [
          'The prototype does not set tracking or advertising cookies. It uses localStorage keys prefixed with “biteconnect:” to remember your session, profile, connections and notifications.',
          'College photos are loaded from Wikimedia Commons and student portraits from Unsplash. Those services may receive standard request information (such as your IP address) when your browser loads an image, under their own privacy policies.',
        ],
      },
      {
        id: 'your-choices',
        title: 'Your choices',
        body: [
          'You can edit your profile at any time from the profile page.',
          'Choose “Reset demo data” in the account menu to restore the original sample data, or clear your browser’s site data to remove everything the prototype has stored.',
          'Logging out ends the demo session on this device; your profile edits remain in localStorage until you reset or clear them.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact',
        body: ['Questions about this policy can be sent through our contact page or to support@biteconnect.app.'],
        cta: true,
      },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    Icon: FileText,
    intro:
      'These terms govern your use of the Bite Connect prototype. By using the site you agree to them. Because this is a demonstration product, several terms differ from a production service — please read the disclaimers carefully.',
    sections: [
      {
        id: 'acceptable-use',
        title: 'Acceptable use',
        body: [
          'Use Bite Connect respectfully and lawfully. Do not attempt to disrupt the site, scrape it at scale, impersonate others, or enter content that is abusive, misleading or infringes someone else’s rights.',
          'Connection requests in the prototype are simulated, but please treat the experience as you would a real professional network.',
        ],
      },
      {
        id: 'accounts',
        title: 'Accounts',
        body: [
          'Accounts in the prototype are local demo sessions. No account is created on a server, and there is no password recovery.',
          'You are responsible for activity on your device. Anyone with access to your browser can view the demo data stored there.',
        ],
      },
      {
        id: 'content',
        title: 'Content',
        body: [
          'You keep ownership of the profile content you enter. Because it stays in your browser, we never receive, publish or license it.',
          'College photos are credited to their authors under their respective Creative Commons or public-domain licences. Trademarks and college names belong to their respective owners and are used for identification only.',
        ],
      },
      {
        id: 'disclaimers',
        title: 'Disclaimers — mock data',
        body: [
          'Student profiles, connections, notifications and statistics are mock data created for demonstration. They do not represent real people.',
          'College and course information is provided for illustration and may be incomplete or out of date. Always verify admissions, fees, eligibility and accreditation with the institution directly.',
          'The prototype is provided “as is”, without warranties of any kind.',
        ],
      },
      {
        id: 'limitation',
        title: 'Limitation of liability',
        body: [
          'To the fullest extent permitted by law, Bite Connect and Kinetic Software Solutions are not liable for any decision made, or loss incurred, based on information shown in this prototype.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to these terms',
        body: [
          'We may update these terms as the prototype evolves. The “Last updated” date at the top of this page shows when they last changed. Continued use after an update means you accept the revised terms.',
        ],
        cta: true,
      },
    ],
  },
}

export default function Legal({ kind = 'privacy' }) {
  const doc = DOCS[kind] ?? DOCS.privacy
  const other = kind === 'terms' ? { to: '/privacy', label: 'Privacy Policy' } : { to: '/terms', label: 'Terms and Conditions' }
  const [active, setActive] = useState(doc.sections[0].id)

  useEffect(() => {
    document.title = `${doc.title} · Bite Connect`
    setActive(doc.sections[0].id)
  }, [doc])

  // Highlight the section currently in view in the table of contents.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    let observer
    try {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (visible[0]) setActive(visible[0].target.id)
        },
        { rootMargin: '-80px 0px -65% 0px' },
      )
      doc.sections.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el) observer.observe(el)
      })
    } catch {
      return undefined
    }
    return () => observer?.disconnect()
  }, [doc])

  const jump = (event, id) => {
    event.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
    try {
      window.history.replaceState(window.history.state, '', `#${id}`)
    } catch {
      /* ignore */
    }
  }

  const { Icon } = doc

  return (
    <div className="pb-20">
      <section className="border-b border-line bg-surface">
        <div className="container-page py-12 sm:py-14">
          <span className="grid size-12 place-items-center rounded-xl bg-primary-50 text-primary">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">{doc.title}</h1>
          <p className="mt-2 text-sm text-muted">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold tracking-wider text-muted uppercase">On this page</p>
          <ol className="mt-3 space-y-0.5 border-l border-line max-lg:flex max-lg:flex-wrap max-lg:gap-2 max-lg:border-l-0">
            {doc.sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => jump(e, s.id)}
                  className={cn(
                    'flex min-h-10 items-center text-sm transition',
                    'lg:-ml-px lg:border-l-2 lg:pl-4',
                    'max-lg:rounded-full max-lg:border max-lg:border-line max-lg:bg-surface max-lg:px-3',
                    active === s.id ? 'font-semibold text-primary lg:border-primary' : 'text-muted hover:text-ink lg:border-transparent',
                  )}
                >
                  <span className="mr-2 tabular-nums text-slate-400">{i + 1}.</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="max-w-3xl">
          <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-5 text-sm leading-relaxed text-slate-700">
            <strong className="text-ink">Prototype notice.</strong> {doc.intro}
          </div>
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-line py-8 last:border-b-0">
              <h2 className="text-xl font-bold">
                <span className="mr-2 text-slate-300">{i + 1}.</span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-700">
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {s.cta && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary btn-sm">
                    Contact us
                  </Link>
                  <Link to={other.to} className="btn-secondary btn-sm">
                    Read our {other.label}
                  </Link>
                </div>
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  )
}
