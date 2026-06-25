import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');

const failures = [];

function fail(message) {
  failures.push(message);
}

function getJsonLdBlocks() {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match, index) => {
      try {
        return JSON.parse(match[1]);
      } catch (error) {
        fail(`JSON-LD block ${index + 1} does not parse: ${error.message}`);
        return null;
      }
    })
    .filter(Boolean);
}

function getMetaContent(name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<meta name="${escapedName}" content="([^"]*)">`));
  return match ? match[1] : '';
}

function getVisibleFaqQuestions() {
  return [...html.matchAll(/<button class="faq__question"[^>]*>\s*<span>(.*?)<\/span>/g)]
    .map((match) => match[1].replace(/\s+/g, ' ').trim());
}

const jsonLd = getJsonLdBlocks();
const localBusiness = jsonLd.find((block) => {
  const type = block['@type'];
  return Array.isArray(type) ? type.includes('LocalBusiness') : type === 'LocalBusiness';
});
const faqPage = jsonLd.find((block) => block['@type'] === 'FAQPage');

if (!localBusiness) {
  fail('LocalBusiness JSON-LD block is missing.');
} else {
  const sameAs = localBusiness.sameAs || [];
  const expectedProfiles = [
    'https://www.facebook.com/p/FPC-Construction-LLC-100066373038903/',
    'https://www.instagram.com/fpcconstructions'
  ];

  for (const profile of expectedProfiles) {
    if (!sameAs.includes(profile)) {
      fail(`LocalBusiness sameAs is missing ${profile}.`);
    }
  }

  const openingSpecs = localBusiness.openingHoursSpecification || [];
  const openDays = openingSpecs.flatMap((spec) => Array.isArray(spec.dayOfWeek) ? spec.dayOfWeek : [spec.dayOfWeek]);

  if (html.includes('Saturday - Sunday: Closed') && (openDays.includes('Saturday') || openDays.includes('Sunday'))) {
    fail('LocalBusiness openingHoursSpecification must match visible Saturday-Sunday closed hours.');
  }
}

if (!faqPage) {
  fail('FAQPage JSON-LD block is missing.');
} else {
  const structuredQuestions = faqPage.mainEntity.map((entry) => entry.name);
  const visibleQuestions = getVisibleFaqQuestions();

  const structuredOnly = structuredQuestions.filter((question) => !visibleQuestions.includes(question));
  const visibleOnly = visibleQuestions.filter((question) => !structuredQuestions.includes(question));

  if (structuredOnly.length > 0) {
    fail(`FAQ JSON-LD includes questions not visible on the page: ${structuredOnly.join(' | ')}`);
  }

  if (visibleOnly.length > 0) {
    fail(`Visible FAQ questions are missing from JSON-LD: ${visibleOnly.join(' | ')}`);
  }
}

const description = getMetaContent('description');
if (!description.includes('North Augusta') || !description.includes('land clearing')) {
  fail('Meta description should mention the local service area and core services.');
}

if (description.length < 120 || description.length > 170) {
  fail(`Meta description should be 120-170 characters; found ${description.length}.`);
}

const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const fragmentUrls = sitemapUrls.filter((url) => url.includes('#'));

if (fragmentUrls.length > 0) {
  fail(`Sitemap should not list fragment URLs: ${fragmentUrls.join(' | ')}`);
}

if (!sitemapUrls.includes('https://fpcconstructions.com/')) {
  fail('Sitemap is missing the canonical home page URL.');
}

if (failures.length > 0) {
  console.error('SEO check failed:');
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log('SEO check passed.');
