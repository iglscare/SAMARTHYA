import React, { useState, useRef } from 'react';
import { VFile, ActiveWindowType, SubShellModeType, TerminalHistoryItem } from '../types';
import { resolvePath as resolvePathUtil } from './pathUtils';
import { runPythonCode } from './pythonRunner';
import { evaluateSingleCommand, evaluatePipeline } from './commandEvaluator';
import { evaluateMsfCommand } from './subshellEvaluator';

interface UseTerminalSessionParams {
  vfs: Record<string, VFile>;
  setVfs: React.Dispatch<React.SetStateAction<Record<string, VFile>>>;
  openWindow: (win: ActiveWindowType) => void;
}

export const useTerminalSession = ({
  vfs,
  setVfs,
  openWindow,
}: UseTerminalSessionParams) => {
  // Shell State
  const [currentDir, setCurrentDir] = useState<string>('/home/kali');
  const [currentUser, setCurrentUser] = useState<'kali' | 'root'>('kali');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [envVars, setEnvVars] = useState<Record<string, string>>({
    USER: 'kali',
    HOME: '/home/kali',
    SHELL: '/bin/zsh',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    TERM: 'xterm-256color',
  });

  // Sub-Shell Modes (Python REPL, Metasploit msfconsole, Nano Editor)
  const [subShellMode, setSubShellMode] = useState<SubShellModeType>('bash');
  const [msfModule, setMsfModule] = useState<string>('');
  const [msfOptions, setMsfOptions] = useState<Record<string, string>>({
    RHOSTS: '192.168.1.105',
    RPORT: '22',
    USER_FILE: '/usr/share/wordlists/rockyou.txt',
    STOP_ON_SUCCESS: 'true',
  });
  const [nanoEditingFile, setNanoEditingFile] = useState<string>('');
  const [nanoBuffer, setNanoBuffer] = useState<string>('');

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const resolvePath = (p: string) => resolvePathUtil(p, currentDir, currentUser);

  const [outputHistory, setOutputHistory] = useState<TerminalHistoryItem[]>([
    {
      user: 'kali',
      dir: '~',
      cmd: '',
      output: '',
      isNeofetch: true,
    },
  ]);

  const runSingleCommand = (raw: string): string => {
    return evaluateSingleCommand(raw, {
      currentDir,
      setCurrentDir,
      currentUser,
      setCurrentUser,
      envVars,
      setEnvVars,
      vfs,
      resolvePath,
      setSubShellMode,
      setNanoEditingFile,
      setNanoBuffer,
    });
  };

  const executeCommand = (fullCmd: string) => {
    const trimmed = fullCmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Python REPL
    if (subShellMode === 'python') {
      if (trimmed === 'exit()' || trimmed === 'quit()' || trimmed === 'exit') {
        setSubShellMode('bash');
        setOutputHistory((prev) => [
          ...prev,
          { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: 'Exiting Python REPL.' },
        ]);
        return;
      }
      const pyOut = runPythonCode(trimmed);
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: pyOut },
      ]);
      return;
    }

    // Metasploit Framework Mode
    if (subShellMode === 'msfconsole') {
      const output = evaluateMsfCommand(trimmed, {
        msfModule,
        setMsfModule,
        msfOptions,
        setMsfOptions,
        exitMsf: () => {
          setSubShellMode('bash');
          setMsfModule('');
        },
      });
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output },
      ]);
      return;
    }

    // Direct app launch commands from terminal CLI
    const appWindowMap: Record<string, ActiveWindowType> = {
      firefox: 'browser',
      browser: 'browser',
      wireshark: 'wireshark',
      burp: 'burp',
      burpsuite: 'burp',
      files: 'files',
      thunar: 'files',
      nautilus: 'files',
    };
    if (appWindowMap[trimmed]) {
      const win = appWindowMap[trimmed];
      openWindow(win);
      const appName =
        win === 'browser'
          ? 'Mozilla Firefox browser'
          : win === 'wireshark'
          ? 'Wireshark packet analyzer'
          : win === 'burp'
          ? 'Burp Suite Community Edition'
          : 'Files manager';
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: `[+] Launched ${appName} window.` },
      ]);
      return;
    }

    if (trimmed === 'neofetch' || trimmed === 'fastfetch') {
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: '', isNeofetch: true },
      ]);
      return;
    }

    // Pipeline processing (|)
    if (trimmed.includes('|')) {
      const pipelineOutput = evaluatePipeline(trimmed, runSingleCommand);
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: pipelineOutput },
      ]);
      return;
    }

    // Output redirection (>)
    if (trimmed.includes('>')) {
      const isAppend = trimmed.includes('>>');
      const [cmdPart, filePart] = trimmed.split(isAppend ? '>>' : '>').map((s) => s.trim());
      const res = runSingleCommand(cmdPart);
      const filePath = resolvePath(filePart);

      setVfs((prev) => ({
        ...prev,
        [filePath]: {
          content: isAppend && prev[filePath] ? `${prev[filePath].content}\n${res}` : res,
          size: (res || '').length,
          perms: '-rw-r--r--',
          owner: currentUser,
          group: currentUser,
          date: 'Aug 27 14:26',
        },
      }));

      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: `[+] Written to ${filePath}` },
      ]);
      return;
    }

    // Command chaining (&&)
    if (trimmed.includes('&&')) {
      const subCmds = trimmed.split('&&').map((s) => s.trim());
      const outputs: string[] = [];
      for (const sc of subCmds) {
        const out = runSingleCommand(sc);
        if (out) outputs.push(out);
      }
      setOutputHistory((prev) => [
        ...prev,
        { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: outputs.join('\n') },
      ]);
      return;
    }

    // Single standard command
    const out = runSingleCommand(trimmed);
    if (trimmed === 'clear') {
      setOutputHistory([]);
      return;
    }

    setOutputHistory((prev) => [
      ...prev,
      { user: currentUser, dir: currentDir.replace('/home/kali', '~'), cmd: trimmed, output: out },
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
    setTerminalInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  const handleSaveNano = () => {
    setVfs((prev) => ({
      ...prev,
      [nanoEditingFile]: {
        content: nanoBuffer,
        size: nanoBuffer.length,
        perms: '-rw-r--r--',
        owner: currentUser,
        group: currentUser,
        date: 'Aug 27 14:32',
      },
    }));
    setSubShellMode('bash');
    setOutputHistory((prev) => [
      ...prev,
      {
        user: currentUser,
        dir: currentDir.replace('/home/kali', '~'),
        cmd: `nano ${nanoEditingFile}`,
        output: `[+] Saved ${nanoEditingFile} (${nanoBuffer.length} bytes)`,
      },
    ]);
  };

  return {
    currentDir,
    setCurrentDir,
    currentUser,
    setCurrentUser,
    terminalInput,
    setTerminalInput,
    commandHistory,
    historyIndex,
    subShellMode,
    setSubShellMode,
    msfModule,
    msfOptions,
    nanoEditingFile,
    nanoBuffer,
    setNanoBuffer,
    terminalBottomRef,
    terminalInputRef,
    outputHistory,
    setOutputHistory,
    executeCommand,
    handleFormSubmit,
    handleKeyDown,
    handleSaveNano,
  };
};
