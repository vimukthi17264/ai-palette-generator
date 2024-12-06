

export default function TermsPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container px-4">
        <div className="prose prose-gray dark:prose-invert max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using our color palette generation service, you agree to be bound 
                by these Terms of Service and all applicable laws and regulations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-muted-foreground">
                We grant you a personal, non-exclusive, non-transferable license to use our service
                for creating and managing color palettes. Generated palettes may be used for both
                personal and commercial projects.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>You must provide accurate information when using our service</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You agree not to misuse or attempt to disrupt our service</li>
                <li>You will not use our service for any illegal purposes</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Service Limitations</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue any part of our service
                at any time without notice. We are not liable for any modification, suspension,
                or discontinuation of the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                Our service, including its original content and features, is owned by us and
                protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
              <p className="text-muted-foreground">
                Our service is provided "as is" without any warranties, expressed or implied.
                We do not guarantee that the service will be uninterrupted, secure, or error-free.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 