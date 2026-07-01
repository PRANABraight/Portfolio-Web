export const HERO_QUERY = `*[_type == "hero"][0]{
  roleLabel, name, description, traits,
  profileImage,
  "resumeUrl": resume.asset->url,
  socials[]{ label, url, iconName }
}`;

export const ABOUT_QUERY = `*[_type == "about"][0]{
  codeLines,
  cards[]{ title, text, iconName }
}`;

export const JOURNEY_QUERY = `*[_type == "journey"][0]{
  entries[]{ year, title, desc, type }
}`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  _id, title, description, status,
  image, features, stack, github, deployment
}`;

export const EDUCATION_QUERY = `*[_type == "education"] | order(order asc) {
  _id, title, org, date, dateEnd, gpa, desc
}`;

export const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc) {
  _id, title, company, location, startDate, endDate, bullets, desc, iconName
}`;

export const SKILLS_QUERY = `*[_type == "skill"] | order(order asc) {
  _id, name, iconName, color, category
}`;

export const STATS_QUERY = `*[_type == "stat"] | order(order asc) {
  _id, num, suffix, label
}`;
