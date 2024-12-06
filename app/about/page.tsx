import React from 'react';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">About Color Palette</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Color Palette is dedicated to helping designers, developers, and creative professionals find the perfect color combinations for their projects. We believe that the right color palette can transform any design from good to extraordinary.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Advanced color palette generation</li>
          <li>Color harmony exploration tools</li>
          <li>Accessibility-focused color combinations</li>
          <li>Export options for various design tools</li>
          <li>Community-curated color collections</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our platform uses advanced color theory algorithms to generate harmonious color combinations. Whether you're starting from scratch or have a specific color in mind, our tools help you explore and refine your color choices to create the perfect palette for your project.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Have questions or suggestions? We'd love to hear from you! Reach out to us at{' '}
          <a 
            href="mailto:contact@colorpalette.com" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            hello@oortrain.com
          </a>
        </p>
      </section>
    </main>
  );
} 