import { useId, useRef, useState } from 'react'
import { Camera, Globe, Trash2 } from 'lucide-react'
import Modal from './Modal'
import ImageWithFallback from './ImageWithFallback'
import TagInput from './students/TagInput'
import { GitHubIcon, LinkedInIcon } from './students/SocialIcons'
import { useApp } from '../context/AppContext'
import { getStudentYears } from '../data/selectors'
import { allColleges, allCourses, courseDisplay, isValidUrl, list } from './students/helpers'

const MAX_PHOTO_BYTES = 2 * 1024 * 1024
const ABOUT_MAX = 500
const HEADLINE_MAX = 120
const SEMESTERS = Array.from({ length: 10 }, (_, i) => `Semester ${i + 1}`)

function initialForm(user = {}) {
  return {
    image: user.image ?? null,
    name: user.name ?? '',
    collegeId: user.collegeId ?? '',
    collegeName: user.collegeName ?? '',
    courseId: user.courseId ?? '',
    course: user.course ?? '',
    year: user.year ?? '',
    semester: user.semester ?? '',
    location: user.location ?? '',
    headline: user.headline ?? '',
    about: user.about ?? '',
    skills: list(user.skills),
    interests: list(user.interests),
    social: { linkedin: user.social?.linkedin ?? '', github: user.social?.github ?? '', portfolio: user.social?.portfolio ?? '' },
  }
}

// Downscale the chosen photo so the data URL stays small enough for localStorage.
function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('read'))
    reader.onload = () => {
      const dataUrl = reader.result
      try {
        const img = new Image()
        img.onload = () => {
          try {
            const max = 480
            const scale = Math.min(1, max / Math.max(img.width, img.height))
            const canvas = document.createElement('canvas')
            canvas.width = Math.round(img.width * scale)
            canvas.height = Math.round(img.height * scale)
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
            resolve(canvas.toDataURL('image/jpeg', 0.86))
          } catch {
            resolve(dataUrl)
          }
        }
        img.onerror = () => reject(new Error('decode'))
        img.src = dataUrl
      } catch {
        resolve(dataUrl)
      }
    }
    reader.readAsDataURL(file)
  })
}

function Field({ id, label, error, hint, children, optional }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>
      )}
    </div>
  )
}

/** <EditProfileModal open onClose /> — edits useApp().user via updateProfile. */
export default function EditProfileModal({ open, onClose }) {
  const { user, updateProfile, toast } = useApp()
  const uid = useId()
  const fileRef = useRef(null)
  const [form, setForm] = useState(() => initialForm(user))
  const [errors, setErrors] = useState({})
  const [photoBusy, setPhotoBusy] = useState(false)
  const [wasOpen, setWasOpen] = useState(open)

  // Re-seed the form every time the modal opens (Cancel discards edits).
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setForm(initialForm(user))
      setErrors({})
    }
  }

  const colleges = allColleges()
  const courses = allCourses()
  const years = getStudentYears()
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const setSocial = (key, value) => setForm((f) => ({ ...f, social: { ...f.social, [key]: value } }))
  const fid = (name) => `${uid}-${name}`

  const onPhoto = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type?.startsWith('image/')) {
      setErrors((er) => ({ ...er, image: 'Please choose an image file (JPG, PNG or WebP).' }))
      return
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setErrors((er) => ({ ...er, image: 'That image is larger than 2 MB. Please choose a smaller one.' }))
      return
    }
    setPhotoBusy(true)
    try {
      const dataUrl = await readImage(file)
      set('image', dataUrl)
      setErrors((er) => ({ ...er, image: undefined }))
    } catch {
      setErrors((er) => ({ ...er, image: 'We could not read that image. Please try another file.' }))
    } finally {
      setPhotoBusy(false)
    }
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (form.about.length > ABOUT_MAX) next.about = `About must be ${ABOUT_MAX} characters or fewer.`
    if (form.headline.length > HEADLINE_MAX) next.headline = `Headline must be ${HEADLINE_MAX} characters or fewer.`
    const s = form.social
    if (s.linkedin && (!isValidUrl(s.linkedin) || !/linkedin\.com/i.test(s.linkedin)))
      next.linkedin = 'Enter a valid LinkedIn URL, e.g. https://www.linkedin.com/in/your-name'
    if (s.github && (!isValidUrl(s.github) || !/github\.com/i.test(s.github)))
      next.github = 'Enter a valid GitHub URL, e.g. https://github.com/your-name'
    if (s.portfolio && !isValidUrl(s.portfolio)) next.portfolio = 'Enter a full URL starting with https://'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.values(next).some(Boolean)) {
      toast('Please fix the highlighted fields', { type: 'error' })
      return
    }
    updateProfile({
      ...form,
      name: form.name.trim().replace(/\s+/g, ' '),
      location: form.location.trim(),
      headline: form.headline.trim(),
      about: form.about.trim(),
      collegeId: form.collegeId === '' ? null : form.collegeId,
      social: {
        linkedin: form.social.linkedin.trim(),
        github: form.social.github.trim(),
        portfolio: form.social.portfolio.trim(),
      },
    })
    toast('Profile updated')
    onClose?.()
  }

  const onCollege = (value) => {
    const college = colleges.find((c) => String(c.id) === value)
    setForm((f) => ({ ...f, collegeId: college ? college.id : '', collegeName: college ? college.shortName || college.name : '' }))
  }
  const onCourse = (value) => {
    const course = courses.find((c) => c.id === value)
    setForm((f) => ({ ...f, courseId: course ? course.id : '', course: course ? courseDisplay(course) : '' }))
  }

  const errProps = (key) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `${fid(key)}-error` } : {})

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit profile"
      description="This is how other students see you on Bite Connect."
      size="lg"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form={fid('form')} className="btn-primary" disabled={photoBusy}>
            Save changes
          </button>
        </div>
      }
    >
      <form id={fid('form')} onSubmit={onSubmit} noValidate className="space-y-6">
        {/* Photo */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <ImageWithFallback
            key={form.image ?? 'none'}
            src={form.image}
            alt="Profile photo preview"
            name={form.name}
            kind="avatar"
            className="size-20 shrink-0 rounded-full text-xl ring-4 ring-primary-50"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink">Profile photo</p>
            <p className="text-xs text-muted">JPG, PNG or WebP, up to 2 MB. Stored only in this browser.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <input ref={fileRef} id={fid('photo')} type="file" accept="image/*" className="sr-only" onChange={onPhoto} />
              <button type="button" className="btn-secondary btn-sm" onClick={() => fileRef.current?.click()} disabled={photoBusy}>
                <Camera className="size-4" aria-hidden="true" />
                {photoBusy ? 'Processing…' : form.image ? 'Change photo' : 'Upload photo'}
              </button>
              {form.image && (
                <button type="button" className="btn-ghost btn-sm text-danger hover:text-danger" onClick={() => set('image', null)}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  Remove photo
                </button>
              )}
            </div>
            {errors.image && (
              <p className="mt-1.5 text-xs text-danger" role="alert">
                {errors.image}
              </p>
            )}
          </div>
        </section>

        {/* Basics */}
        <section className="grid gap-4 sm:grid-cols-2">
          <Field id={fid('name')} label="Full name" error={errors.name}>
            <input
              id={fid('name')}
              className="input"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              autoComplete="name"
              maxLength={60}
              required
              {...errProps('name')}
            />
          </Field>
          <Field id={fid('location')} label="Location" optional>
            <input
              id={fid('location')}
              className="input"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
              placeholder="City, State"
              maxLength={60}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field id={fid('headline')} label="Headline" error={errors.headline} hint={`${form.headline.length}/${HEADLINE_MAX}`}>
              <input
                id={fid('headline')}
                className="input"
                value={form.headline}
                onChange={(e) => set('headline', e.target.value.slice(0, HEADLINE_MAX))}
                placeholder="e.g. Aspiring full-stack developer"
                {...errProps('headline')}
              />
            </Field>
          </div>
        </section>

        {/* Education */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-ink">Education</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field id={fid('college')} label="College">
                <select id={fid('college')} className="input" value={String(form.collegeId ?? '')} onChange={(e) => onCollege(e.target.value)}>
                  <option value="">Select your college</option>
                  {colleges.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field id={fid('course')} label="Course">
                <select id={fid('course')} className="input" value={form.courseId ?? ''} onChange={(e) => onCourse(e.target.value)}>
                  <option value="">Select your course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {courseDisplay(c)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id={fid('year')} label="Year">
              <select id={fid('year')} className="input" value={form.year} onChange={(e) => set('year', e.target.value)}>
                <option value="">Select year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={fid('semester')} label="Semester" optional>
              <select id={fid('semester')} className="input" value={form.semester} onChange={(e) => set('semester', e.target.value)}>
                <option value="">Not specified</option>
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {/* About */}
        <Field id={fid('about')} label="About" error={errors.about} optional>
          <textarea
            id={fid('about')}
            className="input min-h-28 resize-y"
            rows={4}
            value={form.about}
            maxLength={ABOUT_MAX}
            onChange={(e) => set('about', e.target.value.slice(0, ABOUT_MAX))}
            placeholder="What are you studying, building or looking for?"
            {...errProps('about')}
          />
          <p className={`mt-1 text-right text-xs ${form.about.length >= ABOUT_MAX ? 'text-danger' : 'text-muted'}`} aria-live="polite">
            {form.about.length}/{ABOUT_MAX}
          </p>
        </Field>

        {/* Tags */}
        <section className="grid gap-4 sm:grid-cols-2">
          <TagInput label="Skills" value={form.skills} onChange={(v) => set('skills', v)} placeholder="e.g. React" />
          <TagInput label="Interests" value={form.interests} onChange={(v) => set('interests', v)} placeholder="e.g. Open Source" />
        </section>

        {/* Social */}
        <section>
          <h3 className="mb-3 text-sm font-semibold text-ink">Social links</h3>
          <div className="space-y-4">
            {[
              { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon, placeholder: 'https://www.linkedin.com/in/your-name' },
              { key: 'github', label: 'GitHub', Icon: GitHubIcon, placeholder: 'https://github.com/your-name' },
              { key: 'portfolio', label: 'Portfolio', Icon: Globe, placeholder: 'https://your-site.com' },
            ].map(({ key, label, Icon, placeholder }) => (
              <Field key={key} id={fid(key)} label={label} error={errors[key]} optional>
                <div className="relative">
                  <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id={fid(key)}
                    type="url"
                    inputMode="url"
                    className="input pl-10"
                    value={form.social[key]}
                    onChange={(e) => setSocial(key, e.target.value)}
                    placeholder={placeholder}
                    {...errProps(key)}
                  />
                </div>
              </Field>
            ))}
          </div>
        </section>
      </form>
    </Modal>
  )
}
