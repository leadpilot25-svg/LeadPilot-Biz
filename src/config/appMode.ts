/**
 * APP_MODE configuration for Master vs Client deployment.
 * 
 * In Client Deployment mode (VITE_APP_MODE="client" or URL query parameter ?mode=client):
 * - The application is locked to client view.
 * - Developer controls (Dev Mode toggle, Edit CONFIG, Industry Preset selector, Code Exporter) are disabled/omitted.
 * - There is no route or action to return to developer/master mode.
 * - Client data is isolated to the client's specific clientId.
 */

export const IS_CLIENT_DEPLOYMENT =
  ((import.meta as any).env?.VITE_APP_MODE === 'client') ||
  (typeof window !== 'undefined' && window.location.search.includes('mode=client'));

export const DEPLOYMENT_APP_MODE: 'development' | 'client' = IS_CLIENT_DEPLOYMENT ? 'client' : 'development';
