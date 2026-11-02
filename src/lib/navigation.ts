export function getProgramAnchor(slugOrId: string): string {
  const value = slugOrId.toLowerCase();

  if (value.includes('education')) return 'education';
  if (value.includes('nature') || value.includes('biodiversity')) return 'biodiversity';
  if (value.includes('agri') || value.includes('food')) return 'agriculture';
  if (value.includes('health') || value.includes('wellbeing')) return 'health';
  return 'livelihoods';
}

export function getProgramHashRoute(slugOrId: string): string {
  return `/programs#${getProgramAnchor(slugOrId)}`;
}
