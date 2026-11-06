import React from 'react';

export interface MsfContext {
  msfModule: string;
  setMsfModule: (m: string) => void;
  msfOptions: Record<string, string>;
  setMsfOptions: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  exitMsf: () => void;
}

export const evaluateMsfCommand = (trimmed: string, ctx: MsfContext): string => {
  const { msfModule, setMsfModule, msfOptions, setMsfOptions, exitMsf } = ctx;

  if (trimmed === 'exit' || trimmed === 'quit') {
    exitMsf();
    return '[-] Exiting msfconsole.';
  }

  if (trimmed === 'back') {
    setMsfModule('');
    return '';
  }

  if (trimmed.startsWith('search')) {
    const query = trimmed.replace(/^search\s*/, '').trim() || 'ssh';
    return `Matching Modules for '${query}'\n================\n   #  Name                                         Disclosure Date  Rank    Check  Description\n   -  ----                                         ---------------  ----    -----  -----------\n   0  auxiliary/scanner/ssh/ssh_login              .                normal  Yes    SSH Login Check Scanner\n   1  auxiliary/scanner/ssh/ssh_version            .                normal  Yes    SSH Version Scanner\n   2  exploit/linux/ssh/sshd_priv_escalation       2023-07-19       manual  No     Linux OpenSSH Privilege Escalation`;
  }

  if (trimmed.startsWith('use')) {
    const mod = trimmed.replace(/^use\s*/, '').trim() || 'auxiliary/scanner/ssh/ssh_login';
    setMsfModule(`auxiliary(${mod.split('/').pop()})`);
    return `[+] Using module ${mod}`;
  }

  if (trimmed === 'show options' || trimmed === 'options') {
    return `Module options (${msfModule || 'auxiliary/scanner/ssh/ssh_login'}):\n\n   Name             Current Setting                   Required  Description\n   ----             ---------------                   --------  -----------\n   RHOSTS           ${msfOptions.RHOSTS}                     yes       The target host(s)\n   RPORT            ${msfOptions.RPORT}                              yes       The target port\n   USER_FILE        ${msfOptions.USER_FILE}  no        File containing usernames\n   STOP_ON_SUCCESS  ${msfOptions.STOP_ON_SUCCESS}                              yes       Stop after finding valid login`;
  }

  if (trimmed.startsWith('set')) {
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 3) {
      const opt = parts[1].toUpperCase();
      const val = parts.slice(2).join(' ');
      setMsfOptions((prev) => ({ ...prev, [opt]: val }));
      return `${opt} => ${val}`;
    }
  }

  if (trimmed === 'run' || trimmed === 'exploit') {
    return `[*] Starting SSH login brute-force check on ${msfOptions.RHOSTS}:${msfOptions.RPORT}...\n[*] 192.168.1.105:22 - Trying 'admin:admin'\n[-] 192.168.1.105:22 - Failed: 'admin:admin'\n[*] 192.168.1.105:22 - Trying 'root:toor'\n[-] 192.168.1.105:22 - Failed: 'root:toor'\n[*] 192.168.1.105:22 - Trying 'student:password'\n[+] 192.168.1.105:22 - Success: 'student:password'\n[*] Command shell session 1 opened (192.168.1.50:44321 -> 192.168.1.105:22)\n[*] Scanned 1 of 1 hosts (100% complete)`;
  }

  return `[-] Unknown msf command: ${trimmed}`;
};
