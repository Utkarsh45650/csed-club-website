import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const DOMAIN = "https://csed.example.com";
const DEFAULT_DESC = "The official website of the CSED Club. Innovating, building, and exploring the frontiers of technology.";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200";

export default function SEO({ 
  title, 
  description = DEFAULT_DESC, 
  image = DEFAULT_IMAGE, 
  url = "/", 
  type = "website" 
}: SEOProps) {
  
  const siteTitle = `${title} | CSED Club`;
  const canonicalUrl = `${DOMAIN}${url}`;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    "name": siteTitle,
    "description": description,
    "url": canonicalUrl,
    "image": image,
    "publisher": {
      "@type": "Organization",
      "name": "CSED Club",
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/favicon.svg`
      }
    }
  };

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
