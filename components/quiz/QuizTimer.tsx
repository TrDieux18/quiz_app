import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

type QuizTimerProps = {
  timelimitSec: number;
  timestartSec: number;
  onTimeUp: () => void;
};

export function QuizTimer({
  timelimitSec,
  timestartSec,
  onTimeUp,
}: QuizTimerProps) {
  // Theme colors - use light theme explicitly
  const themeColors = Colors.light;
  const {
    warningBackground,
    errorBackground,
    surfaceVariant,
    warning,
    error,
    textTertiary,
  } = themeColors;

  const [remaining, setRemaining] = useState(() => {
    if (timelimitSec <= 0) return -1; // unlimited
    const elapsed = Math.floor(Date.now() / 1000) - timestartSec;
    return Math.max(0, timelimitSec - elapsed);
  });

  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    if (remaining <= 0 && timelimitSec > 0) {
      onTimeUpRef.current();
      return;
    }
    if (timelimitSec <= 0) return; // unlimited — no timer

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(interval);
          onTimeUpRef.current();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timelimitSec]);

  // No timer for unlimited
  if (timelimitSec <= 0) return null;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isLow = remaining <= 60;
  const isCritical = remaining <= 30;

  const bgColor = isCritical
    ? errorBackground
    : isLow
      ? warningBackground
      : surfaceVariant;
  const iconColor = isCritical ? error : isLow ? warning : textTertiary;
  const textColor = isCritical ? error : isLow ? warning : textTertiary;

  return (
    <View
      style={{ backgroundColor: bgColor }}
      className="flex-row items-center px-3 py-1.5 rounded-full"
    >
      <Ionicons name="timer-outline" size={14} color={iconColor} />
      <Text
        style={{ color: textColor }}
        className="ml-1 text-xs font-bold tabular-nums"
      >
        {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      </Text>
    </View>
  );
}
