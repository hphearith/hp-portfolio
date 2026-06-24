import type { CSSProperties, ReactNode } from "react";

type FrameProps = {
  children: ReactNode;
  /** set true once /sprites/frame.png exists to use the pixel-art border */
  sprite?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Reusable Deltarune-style bordered window. */
export default function Frame({
  children,
  sprite = false,
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
