import { Pressable, Text, View } from "react-native";
import { Modal } from "./modal";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: DialogProps) {
  return (
    <Modal
      visible={open}
      onClose={() => onOpenChange(false)}
      title={title}
      description={description}
      dismissible
    >
      {children}
    </Modal>
  );
}

type DialogContentProps = {
  children: React.ReactNode;
};

export function DialogContent({ children }: DialogContentProps) {
  return <View>{children}</View>;
}

type DialogHeaderProps = {
  children: React.ReactNode;
};

export function DialogHeader({ children }: DialogHeaderProps) {
  return <View className="mb-2">{children}</View>;
}

type DialogTitleProps = {
  children: React.ReactNode;
};

export function DialogTitle({ children }: DialogTitleProps) {
  return <Text className="text-lg font-bold text-slate-900">{children}</Text>;
}

type DialogDescriptionProps = {
  children: React.ReactNode;
};

export function DialogDescription({ children }: DialogDescriptionProps) {
  return <Text className="text-sm text-slate-500 mt-1">{children}</Text>;
}

type DialogFooterProps = {
  children: React.ReactNode;
};

export function DialogFooter({ children }: DialogFooterProps) {
  return <View className="flex-row gap-2 mt-6">{children}</View>;
}

type DialogActionProps = {
  onPress: () => void;
  variant?: "default" | "destructive" | "outline";
  children: React.ReactNode;
  disabled?: boolean;
};

export function DialogAction({
  onPress,
  variant = "default",
  children,
  disabled = false,
}: DialogActionProps) {
  const baseClasses =
    "flex-1 py-2.5 px-4 rounded-lg items-center justify-center";
  const variantClasses = {
    default: "bg-indigo-600 active:bg-indigo-700",
    destructive: "bg-red-600 active:bg-red-700",
    outline: "bg-slate-100 active:bg-slate-200",
  };
  const textColors = {
    default: "text-white",
    destructive: "text-white",
    outline: "text-slate-700",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50" : ""}`}
    >
      <Text className={`font-medium text-sm ${textColors[variant]}`}>
        {children}
      </Text>
    </Pressable>
  );
}
