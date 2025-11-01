// times.js: helper functions for initializing and updating available times
// These call the global fetchAPI(date) when available; kept synchronous to
// match the original capstone helper which returns an array.
export function initializeTimes() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const dateStr = `${yyyy}-${mm}-${dd}`;

  try {
    const fetchFn =
      typeof window !== "undefined" && typeof window.fetchAPI === "function"
        ? window.fetchAPI
        : null;
    if (typeof fetchFn === "function") {
      return fetchFn(dateStr);
    }
  } catch (err) {
    // ignore and fall back
  }

  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
}

export function updateTimes(state, action) {
  switch (action.type) {
    case "date": {
      try {
        const fetchFn =
          typeof window !== "undefined" && typeof window.fetchAPI === "function"
            ? window.fetchAPI
            : null;
        if (typeof fetchFn === "function") {
          return fetchFn(action.date);
        }
      } catch (err) {
        // fall through
      }
      return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    }
    default:
      return state;
  }
}
