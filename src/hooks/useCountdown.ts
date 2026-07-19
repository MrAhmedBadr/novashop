import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function diff(target: number): Countdown {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isExpired: total === 0,
  };
}

/** Live countdown to an ISO/epoch target. */
export function useCountdown(target: string | number | Date): Countdown {
  const ts = new Date(target).getTime();
  const [state, setState] = useState<Countdown>(() => diff(ts));

  useEffect(() => {
    const id = setInterval(() => setState(diff(ts)), 1000);
    return () => clearInterval(id);
  }, [ts]);

  return state;
}
