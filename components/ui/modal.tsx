import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  Modal as RNModal,
  Text,
  View,
} from "react-native";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  dismissible?: boolean;
};

export function Modal({
  visible,
  onClose,
  title,
  description,
  children,
  dismissible = true,
}: ModalProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  return (
    <RNModal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={dismissible ? onClose : undefined}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 16,
          backgroundColor: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"],
          }),
        }}
      >
        {/* Backdrop tap to dismiss */}
        {dismissible && (
          <Pressable
            style={{ position: "absolute", inset: 0 }}
            onPress={onClose}
          />
        )}

        {/* Modal Content */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            backgroundColor: "white",
            borderRadius: 12,
            paddingHorizontal: 24,
            paddingVertical: 20,
            maxWidth: "90%",
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 24,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-1">
              {title && (
                <Text className="text-lg font-bold text-slate-900">
                  {title}
                </Text>
              )}
              {description && (
                <Text className="text-sm text-slate-500 mt-1">
                  {description}
                </Text>
              )}
            </View>
            {dismissible && (
              <Pressable
                onPress={onClose}
                className="p-1 ml-2 rounded-lg active:bg-slate-100"
                hitSlop={8}
              >
                <Ionicons name="close" size={20} color="#64748b" />
              </Pressable>
            )}
          </View>

          {/* Divider */}
          {(title || description) && (
            <View className="h-px bg-slate-200 my-4" />
          )}

          {/* Content */}
          <View className="mb-6">{children}</View>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
}
