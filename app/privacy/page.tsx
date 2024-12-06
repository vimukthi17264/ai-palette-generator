

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container px-4">
        <div className="prose prose-gray dark:prose-invert max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us when using our color palette generation service, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Email address (if you subscribe to our newsletter)</li>
                <li>Generated color palettes and preferences</li>
                <li>Usage data and interactions with our service</li>
                <li>Device and browser information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Provide and improve our color palette generation service</li>
                <li>Send you updates and marketing communications (with your consent)</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Protect against fraudulent or unauthorized activity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the Internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience on our website.
                You can control cookie preferences through your browser settings.
              </p>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
} 