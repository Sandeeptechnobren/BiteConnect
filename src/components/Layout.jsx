import { Component, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ToastViewport from './Toast'

class PageErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('Page crashed', error, info)
  }
  componentDidUpdate(prev) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null })
  }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-muted">This page hit an unexpected error. Please try again.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" className="btn-primary" onClick={() => window.location.reload()}>Reload page</button>
            <Link to="/" className="btn-secondary">Go home</Link>
          </div>
        </div>
      </div>
    )
  }
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <PageErrorBoundary resetKey={pathname}>
          <Outlet />
        </PageErrorBoundary>
      </main>
      <Footer />
      <ToastViewport />
    </div>
  )
}
