/**
 * Schema.org JSON-LD structured data for Innerloom.
 *
 * Uses two overlapping types:
 *   - MedicalBusiness  → tells Google this is a healthcare provider
 *   - LocalBusiness    → enables Google Business-style rich results
 *   - Person           → links the psychologist as the named practitioner
 *
 * Drop <JsonLd /> anywhere in a Server Component (layout or page).
 * It renders a <script type="application/ld+json"> tag — invisible to users,
 * readable by search engines.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://innerloom.in"

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Primary business entity ─────────────────────────────────────────
      {
        "@type": ["MedicalBusiness", "LocalBusiness"],
        "@id": `${BASE_URL}/#business`,
        name: "Innerloom",
        description:
          "Warm, CBT-based online counselling for young adults, students, " +
          "and professionals across India.",
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo.png`,
        image: `${BASE_URL}/images/about-photo.jpg`,
        telephone: process.env.NEXT_PUBLIC_WA_NUMBER
          ? `+${process.env.NEXT_PUBLIC_WA_NUMBER}`
          : undefined,
        email: "innerloom16@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dehradun",
          addressRegion: "Uttarakhand",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          // Dehradun approximate coordinates — update if needed
          latitude: 30.3165,
          longitude: 78.0322,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        availableService: [
          {
            "@type": "MedicalTherapy",
            name: "Individual Counselling",
            description:
              "One-on-one counselling sessions for anxiety, burnout, " +
              "relationship stress, and life transitions.",
          },
          {
            "@type": "MedicalTherapy",
            name: "Cognitive Behavioural Therapy (CBT)",
            description:
              "Evidence-based CBT sessions tailored to each client's needs.",
          },
          {
            "@type": "MedicalTherapy",
            name: "Online Therapy",
            description:
              "Secure video-based counselling sessions accessible across India.",
          },
        ],
        priceRange: "₹₹",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        sameAs: [
          // Add your social/directory profile URLs here when ready:
          // "https://www.instagram.com/innerloom",
          // "https://www.linkedin.com/in/parishkriti-bamrara",
        ],
        employee: { "@id": `${BASE_URL}/#practitioner` },
      },

      // ── Practitioner (the psychologist) ────────────────────────────────
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#practitioner`,
        name: "Parishkriti Bamrara",
        jobTitle: "Counselling Psychologist",
        description:
          "Certified counselling psychologist with 120-hour CBT training, " +
          "working with young adults, students, and professionals.",
        url: `${BASE_URL}/about`,
        image: `${BASE_URL}/images/about-photo.jpg`,
        knowsAbout: [
          "Cognitive Behavioural Therapy",
          "Anxiety",
          "Burnout",
          "Relationship counselling",
          "Life transitions",
          "Mental health",
        ],
        worksFor: { "@id": `${BASE_URL}/#business` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dehradun",
          addressCountry: "IN",
        },
      },

      // ── Website entity ──────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Innerloom",
        description:
          "Counselling psychology practice by Parishkriti Bamrara — " +
          "online & in-person sessions across India.",
        publisher: { "@id": `${BASE_URL}/#business` },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/contact`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}