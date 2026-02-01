# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **2D Landscape Overlay System**
  - `LandscapeOverlay` component for rendering landscapes with sprite overlays
  - `Sprite2D` component for positioned sprites with anchor point support
  - `DebugOverlay` with boundary visualization and tree placement controls
  - `useLandscapeTransform` hook for object-contain letterbox coordinate conversion
  - `boundaryUtils.js` with polygon hit-testing and random point generation
  - `landscapeConfig.js` with landscape and sprite definitions

- **Summary Screen Redesign**
  - Replaced centered layout with landscape background + floating card overlay
  - Session stats now overlay the revealed scene

- **Development Tools**
  - `skipToEnd` action in focus store for debug/testing
  - "Skip to End" button on FocusScreen for rapid session completion
  - Playwright e2e test setup with smoke tests
  - npm scripts: `test:e2e`, `test:e2e:ui`, `test:e2e:headed`

- **Assets**
  - `landscape 1.png` - isometric forest scene (1024x1024)
  - `tree_1.png` - tree sprite for scene decoration

### Changed

- FocusScreen now includes skip debug button (bottom-right corner)
