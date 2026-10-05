import * as LucideIcons from "lucide-react";

export const getIcon = (iconName) => {
  const Icon = LucideIcons[iconName];

  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return null;
  }

  return Icon;
};

export const renderIcon = (iconName, props = {}) => {
  const Icon = getIcon(iconName);

  if (!Icon) return null;

  if (typeof props !== "object" || Array.isArray(props)) {
    console.warn("renderIcon props must be object");
    return <Icon />;
  }

  return <Icon {...props} />;
};
