import {
  useWindowManager,
  useAppStates,
  useTerminalSession,
} from './simulation';

export const useCyberVmSimulation = () => {
  const windowManager = useWindowManager();

  const appStates = useAppStates('kali', () => {
    windowManager.setActiveWindow('terminal');
    windowManager.setMinimizedWindows(new Set());
    windowManager.setMaximizedWindow(null);
  });

  const terminalSession = useTerminalSession({
    vfs: appStates.vfs,
    setVfs: appStates.setVfs,
    openWindow: windowManager.openWindow,
  });

  const handleResetVm = () => {
    appStates.handleResetVm();
    terminalSession.setOutputHistory([
      {
        user: 'kali',
        dir: '~',
        cmd: '',
        output: '',
        isNeofetch: true,
      },
    ]);
  };

  return {
    // Window manager
    activeWindow: windowManager.activeWindow,
    setActiveWindow: windowManager.setActiveWindow,
    minimizedWindows: windowManager.minimizedWindows,
    setMinimizedWindows: windowManager.setMinimizedWindows,
    maximizedWindow: windowManager.maximizedWindow,
    setMaximizedWindow: windowManager.setMaximizedWindow,
    showWhiskerMenu: windowManager.showWhiskerMenu,
    setShowWhiskerMenu: windowManager.setShowWhiskerMenu,
    showLabGuide: windowManager.showLabGuide,
    setShowLabGuide: windowManager.setShowLabGuide,
    activeWorkspace: windowManager.activeWorkspace,
    setActiveWorkspace: windowManager.setActiveWorkspace,
    isFullscreen: windowManager.isFullscreen,
    toggleNativeFullscreen: windowManager.toggleNativeFullscreen,
    openWindow: windowManager.openWindow,
    minimizeWindow: windowManager.minimizeWindow,
    closeWindow: windowManager.closeWindow,
    toggleMaximize: windowManager.toggleMaximize,

    // App states
    sessionSecondsLeft: appStates.sessionSecondsLeft,
    copiedIp: appStates.copiedIp,
    vfs: appStates.vfs,
    editorFile: appStates.editorFile,
    setEditorFile: appStates.setEditorFile,
    editorContent: appStates.editorContent,
    setEditorContent: appStates.setEditorContent,
    editorSearch: appStates.editorSearch,
    setEditorSearch: appStates.setEditorSearch,
    editorSaveNotice: appStates.editorSaveNotice,
    filesPath: appStates.filesPath,
    setFilesPath: appStates.setFilesPath,
    wiresharkFilter: appStates.wiresharkFilter,
    setWiresharkFilter: appStates.setWiresharkFilter,
    appliedWiresharkFilter: appStates.appliedWiresharkFilter,
    setAppliedWiresharkFilter: appStates.setAppliedWiresharkFilter,
    selectedPacketNo: appStates.selectedPacketNo,
    setSelectedPacketNo: appStates.setSelectedPacketNo,
    burpIntercept: appStates.burpIntercept,
    setBurpIntercept: appStates.setBurpIntercept,
    burpTab: appStates.burpTab,
    setBurpTab: appStates.setBurpTab,
    burpRepeaterReq: appStates.burpRepeaterReq,
    setBurpRepeaterReq: appStates.setBurpRepeaterReq,
    burpRepeaterResp: appStates.burpRepeaterResp,
    setBurpRepeaterResp: appStates.setBurpRepeaterResp,
    browserUrl: appStates.browserUrl,
    setBrowserUrl: appStates.setBrowserUrl,
    browserActiveTab: appStates.browserActiveTab,
    setBrowserActiveTab: appStates.setBrowserActiveTab,
    browserSearchQuery: appStates.browserSearchQuery,
    setBrowserSearchQuery: appStates.setBrowserSearchQuery,
    handleCopyIp: appStates.handleCopyIp,
    handleSaveEditor: appStates.handleSaveEditor,
    handleResetVm,
    handleEndSession: appStates.handleEndSession,
    filteredPackets: appStates.filteredPackets,
    systemTimeFormatted: appStates.systemTimeFormatted,

    // Terminal session
    currentDir: terminalSession.currentDir,
    currentUser: terminalSession.currentUser,
    terminalInput: terminalSession.terminalInput,
    setTerminalInput: terminalSession.setTerminalInput,
    commandHistory: terminalSession.commandHistory,
    historyIndex: terminalSession.historyIndex,
    subShellMode: terminalSession.subShellMode,
    setSubShellMode: terminalSession.setSubShellMode,
    msfModule: terminalSession.msfModule,
    nanoEditingFile: terminalSession.nanoEditingFile,
    nanoBuffer: terminalSession.nanoBuffer,
    setNanoBuffer: terminalSession.setNanoBuffer,
    terminalBottomRef: terminalSession.terminalBottomRef,
    terminalInputRef: terminalSession.terminalInputRef,
    outputHistory: terminalSession.outputHistory,
    executeCommand: terminalSession.executeCommand,
    handleFormSubmit: terminalSession.handleFormSubmit,
    handleKeyDown: terminalSession.handleKeyDown,
    handleSaveNano: terminalSession.handleSaveNano,
  };
};
