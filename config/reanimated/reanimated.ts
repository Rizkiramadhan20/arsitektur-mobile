if (__DEV__) {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("[Reanimated]")
    ) {
      return; // Skip Reanimated warnings
    }
    originalConsoleWarn.apply(console, args);
  };
}
