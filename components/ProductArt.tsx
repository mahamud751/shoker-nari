type Props = { icon?: string; tint?: string; label: string; size?: "sm" | "md" | "lg"; image?: string };

export function ProductArt({ icon, tint, label, size = "md", image }: Props) {
  if (image) {
    return (
      <div className={`art art-${size} art-photo`}>
        <img src={image} alt={label} />
      </div>
    );
  }
  return (
    <div className={`art art-${size}`} style={{ background: tint }} role="img" aria-label={label}>
      <span aria-hidden>{icon}</span>
    </div>
  );
}
