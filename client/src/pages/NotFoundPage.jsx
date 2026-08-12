import { Link } from "react-router-dom";
import ScrollReveal from "../components/common/ScrollReveal";
import SEO from "../components/common/SEO";

function NotFoundPage() {
  return (
    <>
      <SEO title="404 - Page Not Found" description="The page you are looking for doesn't exist." />
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <ScrollReveal direction="up">
        <div className="max-w-md w-full bg-white rounded-[2rem] border border-stone-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-10 text-center">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h1 className="font-serif text-5xl font-bold text-stone-900 mb-4">404</h1>
          <h2 className="text-xl font-bold text-stone-800 mb-3">Page Not Found</h2>
          <p className="text-stone-500 text-sm mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </Link>
        </div>
      </ScrollReveal>
      </div>
    </>
  );
}

export default NotFoundPage;
