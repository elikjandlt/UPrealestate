import { getApolloClient } from "@/lib/apollo/client";
import { CP_PAGES, CP_MENUS } from "@/graphql/cms/queries";
import {
  properties,
  agents,
  testimonials,
  jobs,
  faqs,
  contactInfo,
  districts,
  news,
} from "./data";
import type { Page, MenuItem } from "@/graphql/cms/queries";

export async function getPages(language?: string): Promise<Page[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: CP_PAGES,
      variables: { language },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    return ((data as any)?.cpPages ?? []) as Page[];
  } catch {
    return [];
  }
}

export async function getPageBySlug(
  slug: string,
  language?: string
): Promise<Page | null> {
  try {
    const pages = await getPages(language);
    return pages.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export async function getHeaderMenu(language?: string): Promise<MenuItem[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: CP_MENUS,
      variables: { language, kind: "header" },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    return ((data as any)?.cpMenus ?? []) as MenuItem[];
  } catch {
    return [];
  }
}

export async function getFooterMenu(language?: string): Promise<MenuItem[]> {
  try {
    const client = getApolloClient();
    const { data } = await client.query({
      query: CP_MENUS,
      variables: { language, kind: "footer" },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    return ((data as any)?.cpMenus ?? []) as MenuItem[];
  } catch {
    return [];
  }
}

export function getProperties() {
  return properties;
}

export function getPropertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug) ?? null;
}

export function getAgents() {
  return agents;
}

export function getAgentBySlug(slug: string) {
  return agents.find((a) => a.slug === slug) ?? null;
}

export function getTestimonials() {
  return testimonials;
}

export function getJobs() {
  return jobs;
}

export function getFaqs() {
  return faqs;
}

export function getContactInfo() {
  return contactInfo;
}

export function getNews() {
  return news;
}

export { districts };
