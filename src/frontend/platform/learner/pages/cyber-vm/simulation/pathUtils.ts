export const resolvePath = (
  p: string,
  currentDir: string = '/home/kali',
  currentUser: 'kali' | 'root' = 'kali'
): string => {
  const clean = p.trim();
  if (!clean || clean === '.') return currentDir;
  if (clean === '~') return currentUser === 'root' ? '/root' : '/home/kali';
  if (clean.startsWith('~/')) {
    return `${currentUser === 'root' ? '/root' : '/home/kali'}/${clean.slice(2)}`.replace(/\/+/g, '/');
  }
  if (clean.startsWith('/')) return clean.replace(/\/+/g, '/');
  return `${currentDir}/${clean}`.replace(/\/+/g, '/');
};
