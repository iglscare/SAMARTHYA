import React from 'react';
import { useCyberVmSimulation } from './useCyberVmSimulation';
import { CyberVmTopBar } from './CyberVmTopBar';
import { KaliDesktopPanel } from './KaliDesktopPanel';
import { KaliWhiskerMenu } from './KaliWhiskerMenu';
import { KaliDesktopDock } from './KaliDesktopDock';
import { KaliWallpaper } from './KaliWallpaper';
import { KaliTerminalWindow } from './KaliTerminalWindow';
import { KaliBrowserWindow } from './KaliBrowserWindow';
import { KaliFileManagerWindow } from './KaliFileManagerWindow';
import { KaliEditorWindow } from './KaliEditorWindow';
import { KaliWiresharkWindow } from './KaliWiresharkWindow';
import { KaliZenmapWindow } from './KaliZenmapWindow';
import { KaliBurpWindow } from './KaliBurpWindow';
import { KaliLabGuideModal } from './KaliLabGuideModal';
import { KaliWorkspaceBar } from './KaliWorkspaceBar';

export * from './types';
export * from './constants';

export const CyberVmFullScreenPage: React.FC = () => {
  const vm = useCyberVmSimulation();

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0A0E17] flex flex-col select-none text-slate-200 font-sans">
      {/* 1. TOP HEADER: SAMARTHYA VIRTUAL LAB HEADER */}
      <CyberVmTopBar
        sessionSecondsLeft={vm.sessionSecondsLeft}
        isFullscreen={vm.isFullscreen}
        onResetVm={vm.handleResetVm}
        onToggleFullscreen={vm.toggleNativeFullscreen}
        onEndSession={vm.handleEndSession}
      />

      {/* 2. KALI SYSTEM PANEL (XFCE / GNOME BAR) */}
      <KaliDesktopPanel
        showWhiskerMenu={vm.showWhiskerMenu}
        setShowWhiskerMenu={vm.setShowWhiskerMenu}
        openWindow={vm.openWindow}
        systemTimeFormatted={vm.systemTimeFormatted}
      />

      {/* Whisker Application Menu Popover */}
      {vm.showWhiskerMenu && (
        <KaliWhiskerMenu
          openWindow={vm.openWindow}
          setShowWhiskerMenu={vm.setShowWhiskerMenu}
          executeCommand={vm.executeCommand}
          setEditorFile={vm.setEditorFile}
          setEditorContent={vm.setEditorContent}
        />
      )}

      {/* 3. MAIN KALI DESKTOP AREA: LEFT DOCK + WALLPAPER + FLOATING WINDOWS */}
      <div className="flex-1 relative overflow-hidden flex bg-gradient-to-br from-[#060D1A] via-[#0A162B] to-[#040913]">
        {/* Left Dock Launcher */}
        <KaliDesktopDock
          activeWindow={vm.activeWindow}
          openWindow={vm.openWindow}
          showWhiskerMenu={vm.showWhiskerMenu}
          setShowWhiskerMenu={vm.setShowWhiskerMenu}
          setFilesPath={vm.setFilesPath}
          executeCommand={vm.executeCommand}
        />

        {/* Desktop Wallpaper Area */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center select-none">
          <KaliWallpaper />

          {/* Floating Windows */}
          {vm.activeWindow === 'terminal' && !vm.minimizedWindows.has('terminal') && (
            <KaliTerminalWindow
              maximizedWindow={vm.maximizedWindow}
              subShellMode={vm.subShellMode}
              msfModule={vm.msfModule}
              currentUser={vm.currentUser}
              currentDir={vm.currentDir}
              nanoEditingFile={vm.nanoEditingFile}
              nanoBuffer={vm.nanoBuffer}
              setNanoBuffer={vm.setNanoBuffer}
              handleSaveNano={vm.handleSaveNano}
              setSubShellMode={vm.setSubShellMode}
              outputHistory={vm.outputHistory}
              terminalInputRef={vm.terminalInputRef}
              terminalBottomRef={vm.terminalBottomRef}
              terminalInput={vm.terminalInput}
              setTerminalInput={vm.setTerminalInput}
              handleFormSubmit={vm.handleFormSubmit}
              handleKeyDown={vm.handleKeyDown}
              minimizeWindow={vm.minimizeWindow}
              toggleMaximize={vm.toggleMaximize}
              closeWindow={vm.closeWindow}
            />
          )}

          {vm.activeWindow === 'browser' && !vm.minimizedWindows.has('browser') && (
            <KaliBrowserWindow
              maximizedWindow={vm.maximizedWindow}
              minimizeWindow={vm.minimizeWindow}
              toggleMaximize={vm.toggleMaximize}
              closeWindow={vm.closeWindow}
              browserActiveTab={vm.browserActiveTab}
              setBrowserActiveTab={vm.setBrowserActiveTab}
              browserUrl={vm.browserUrl}
              setBrowserUrl={vm.setBrowserUrl}
              browserSearchQuery={vm.browserSearchQuery}
              setBrowserSearchQuery={vm.setBrowserSearchQuery}
              handleCopyIp={vm.handleCopyIp}
              copiedIp={vm.copiedIp}
            />
          )}

          {vm.activeWindow === 'files' && !vm.minimizedWindows.has('files') && (
            <KaliFileManagerWindow
              maximizedWindow={vm.maximizedWindow}
              minimizeWindow={vm.minimizeWindow}
              toggleMaximize={vm.toggleMaximize}
              closeWindow={vm.closeWindow}
              filesPath={vm.filesPath}
              setFilesPath={vm.setFilesPath}
              vfs={vm.vfs}
              setEditorFile={vm.setEditorFile}
              setEditorContent={vm.setEditorContent}
              openWindow={vm.openWindow}
            />
          )}

          {vm.activeWindow === 'editor' && !vm.minimizedWindows.has('editor') && (
            <KaliEditorWindow
              maximizedWindow={vm.maximizedWindow}
              minimizeWindow={vm.minimizeWindow}
              toggleMaximize={vm.toggleMaximize}
              closeWindow={vm.closeWindow}
              editorFile={vm.editorFile}
              editorContent={vm.editorContent}
              setEditorContent={vm.setEditorContent}
              editorSearch={vm.editorSearch}
              setEditorSearch={vm.setEditorSearch}
              editorSaveNotice={vm.editorSaveNotice}
              handleSaveEditor={vm.handleSaveEditor}
              handleCopyIp={vm.handleCopyIp}
            />
          )}

          {vm.activeWindow === 'wireshark' && !vm.minimizedWindows.has('wireshark') && (
            <KaliWiresharkWindow
              maximizedWindow={vm.maximizedWindow}
              minimizeWindow={vm.minimizeWindow}
              toggleMaximize={vm.toggleMaximize}
              closeWindow={vm.closeWindow}
              wiresharkFilter={vm.wiresharkFilter}
              setWiresharkFilter={vm.setWiresharkFilter}
              setAppliedWiresharkFilter={vm.setAppliedWiresharkFilter}
              filteredPackets={vm.filteredPackets}
              selectedPacketNo={vm.selectedPacketNo}
              setSelectedPacketNo={vm.setSelectedPacketNo}
            />
          )}

          {vm.activeWindow === 'zenmap' && !vm.minimizedWindows.has('zenmap') && (
            <KaliZenmapWindow
              maximizedWindow={vm.maximizedWindow}
              minimizeWindow={vm.minimizeWindow}
              toggleMaximize={vm.toggleMaximize}
              closeWindow={vm.closeWindow}
            />
          )}

          {vm.activeWindow === 'burp' && !vm.minimizedWindows.has('burp') && (
            <KaliBurpWindow
              maximizedWindow={vm.maximizedWindow}
              minimizeWindow={vm.minimizeWindow}
              toggleMaximize={vm.toggleMaximize}
              closeWindow={vm.closeWindow}
              burpTab={vm.burpTab}
              setBurpTab={vm.setBurpTab}
              burpIntercept={vm.burpIntercept}
              setBurpIntercept={vm.setBurpIntercept}
              burpRepeaterReq={vm.burpRepeaterReq}
              setBurpRepeaterReq={vm.setBurpRepeaterReq}
              burpRepeaterResp={vm.burpRepeaterResp}
              setBurpRepeaterResp={vm.setBurpRepeaterResp}
            />
          )}

          {/* Floating Task Guide Modal */}
          {vm.showLabGuide && (
            <KaliLabGuideModal
              setShowLabGuide={vm.setShowLabGuide}
              handleCopyIp={vm.handleCopyIp}
              copiedIp={vm.copiedIp}
            />
          )}
        </div>
      </div>

      {/* 4. BOTTOM BAR: WORKSPACE SWITCHER & LAB GUIDE */}
      <KaliWorkspaceBar
        activeWorkspace={vm.activeWorkspace}
        setActiveWorkspace={vm.setActiveWorkspace}
        showLabGuide={vm.showLabGuide}
        setShowLabGuide={vm.setShowLabGuide}
      />
    </div>
  );
};

export default CyberVmFullScreenPage;
