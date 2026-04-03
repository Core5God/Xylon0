interface Window {
  aistudio: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
}

declare var window: Window & typeof globalThis;
