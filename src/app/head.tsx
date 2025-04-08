// File: src/app/head.tsx
// Purpose: Custom head file for landing demo 1 with SEO, social preview, and favicon

export default function Head() {
    return (
      <>
        <title>Demo 1 – Coaches & Consultants | NPR Media</title>
        <meta
          name="description"
          content="A $2,000-grade landing page demo for coaching businesses built by NPR Media."
        />
        <meta property="og:title" content="Demo 1 – Coaches & Consultants" />
        <meta
          property="og:description"
          content="High-conversion landing page demo for coaching businesses."
        />
        <meta property="og:image" content="/og/demo-1.png" />
        <meta property="og:url" content="https://npr-media.com/demo/1" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Demo 1 – Coaches & Consultants" />
        <meta name="twitter:description" content="Conversion-optimized landing page demo for coaches." />
        <meta name="twitter:image" content="/og/demo-1.png" />
        <link rel="icon" href="/favicon.ico" />
      </>
    );
  }
  