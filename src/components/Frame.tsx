import type { CSSProperties, ReactNode } from "react";

type FrameProps = {
  children: ReactNode;
  /** use the pixel-art border (/sprites/frame.png); on by default */
  sprite?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Reusable Deltarune-style bordered window. */
export default function Frame({
  children,
  sprite = true,
  className = "",
  style,
}: FrameProps) {
  const cls = ["frame", sprite ? "frame--sprite" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
