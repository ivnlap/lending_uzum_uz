export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  [key: string]: string | undefined;
}

/**
 * Storage key for persisting original URL parameters
 */
const ORIGINAL_PARAMS_STORAGE_KEY = 'uzum_original_params';

/**
 * Captures and stores original URL parameters from the current page
 */
export function captureOriginalParameters(): UTMParameters {
  if (typeof window === 'undefined') return {};
  
  const searchParams = new URLSearchParams(window.location.search);
  const originalParams: UTMParameters = {};
  
  // Store all parameters, not just UTM ones
  searchParams.forEach((value, key) => {
    originalParams[key] = value;
  });
  
  // Store in sessionStorage to persist during the session
  if (Object.keys(originalParams).length > 0) {
    sessionStorage.setItem(ORIGINAL_PARAMS_STORAGE_KEY, JSON.stringify(originalParams));
  }
  
  return originalParams;
}

/**
 * Retrieves stored original parameters
 */
export function getOriginalParameters(): UTMParameters {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem(ORIGINAL_PARAMS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Returns original parameters if they exist, otherwise uses component-specific UTM parameters
 * Original parameters take full precedence - if any exist, use only those
 */
export function mergeWithOriginalParameters(componentParams: UTMParameters): UTMParameters {
  const originalParams = getOriginalParameters();
  
  // If we have any original parameters, use only those without mixing
  if (Object.keys(originalParams).length > 0) {
    return originalParams;
  }
  
  // Otherwise, use component defaults
  return componentParams;
}

export interface UrlWithUTMOptions {
  baseUrl: string;
  utmParams: UTMParameters;
}

/**
 * Generates a URL with UTM parameters
 */
export function buildUTMUrl({ baseUrl, utmParams }: UrlWithUTMOptions): string {
  const url = new URL(baseUrl);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
}

/**
 * Default UTM configuration for the courier landing
 */
export const DEFAULT_UTM_CONFIG = {
  utm_campaign: 'courier-landing',
  utm_term: 'lendings'
} as const;

/**
 * Predefined UTM configurations for different components
 */
export const UTM_SOURCES = {
  header: {
    ...DEFAULT_UTM_CONFIG,
    utm_source: 'header',
    utm_medium: 'button'
  },
  hero: {
    ...DEFAULT_UTM_CONFIG,
    utm_source: 'hero',
    utm_medium: 'cta'
  },
  floating: {
    ...DEFAULT_UTM_CONFIG,
    utm_source: 'floating',
    utm_medium: 'cta'
  },
  footer: {
    ...DEFAULT_UTM_CONFIG,
    utm_source: 'footer',
    utm_medium: 'button'
  },
  howToStart: {
    ...DEFAULT_UTM_CONFIG,
    utm_source: 'how-to-start',
    utm_medium: 'form'
  },
  cities: {
    ...DEFAULT_UTM_CONFIG,
    utm_source: 'cities',
    utm_medium: 'button'
  },
  referral: {
    ...DEFAULT_UTM_CONFIG,
    utm_source: 'referral',
    utm_medium: 'cta'
  }
} as const;

/**
 * Main URLs used in the application
 */
export const URLS = {
  courierForm: 'https://uzumtezkorcourier.paperform.co/',
  referralProgram: 'https://tezkor-referral-boost.lovable.app/',
  legalTerms: 'https://legal.uzumtezkor.uz/courier-terms'
} as const;

/**
 * Helper function to open courier registration form with UTM tracking
 */
export function openCourierForm(source: keyof typeof UTM_SOURCES, additionalParams?: UTMParameters): void {
  const componentParams = {
    ...UTM_SOURCES[source],
    ...additionalParams
  };
  
  // Merge with original parameters (original takes precedence)
  const finalParams = mergeWithOriginalParameters(componentParams);
  
  const url = buildUTMUrl({
    baseUrl: URLS.courierForm,
    utmParams: finalParams
  });
  
  window.open(url, '_blank');
}

/**
 * Helper function to open referral program with UTM tracking
 */
export function openReferralProgram(source: keyof typeof UTM_SOURCES = 'referral', additionalParams?: UTMParameters): void {
  const componentParams = {
    ...UTM_SOURCES[source],
    ...additionalParams
  };
  
  // Merge with original parameters (original takes precedence)
  const finalParams = mergeWithOriginalParameters(componentParams);
  
  const url = buildUTMUrl({
    baseUrl: URLS.referralProgram,
    utmParams: finalParams
  });
  
  window.open(url, '_blank');
}

/**
 * Helper function to open legal terms with UTM tracking (optional)
 */
export function openLegalTerms(source: string = 'footer'): void {
  const componentParams = {
    utm_source: source,
    utm_medium: 'link',
    utm_campaign: 'legal'
  };
  
  // Merge with original parameters (original takes precedence)
  const finalParams = mergeWithOriginalParameters(componentParams);
  
  const url = buildUTMUrl({
    baseUrl: URLS.legalTerms,
    utmParams: finalParams
  });
  
  window.open(url, '_blank');
}