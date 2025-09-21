import 'react-native-reanimated';

if (__DEV__) {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      (args[0].includes("[Reanimated]") || args[0].includes("level"))
    ) {
      return; // Skip Reanimated warnings and level errors
    }
    originalConsoleWarn.apply(console, args);
  };
}
