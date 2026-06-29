"use client";

export function SocialButtons({
  socials,
}: {
  socials?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    viber?: string;
  };
}) {
  if (!socials) return null;

  const items = [
    { key: "facebook", url: socials.facebook, color: "#1877f2", icon: FacebookIcon },
    { key: "instagram", url: socials.instagram, color: "#e4405f", icon: InstagramIcon },
    { key: "telegram", url: socials.telegram, color: "#0088cc", icon: TelegramIcon },
    { key: "viber", url: socials.viber, color: "#7360f2", icon: ViberIcon },
  ].filter((i) => i.url);

  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
          style={{ backgroundColor: item.color }}
          aria-label={item.key}
        >
          <item.icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function ViberIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.32 0C6.746 0 2.453 4.105 2.453 9.538c0 1.669.49 3.321 1.417 4.762L2.05 21.974a.59.59 0 0 0 .093.506.592.592 0 0 0 .48.246c.112 0 .223-.032.32-.092l5.358-3.38a10.77 10.77 0 0 0 4.02.765h.006c5.574 0 9.867-4.105 9.867-9.537C22.194 4.105 17.894 0 12.32 0zm6.464 13.94c-.265.745-1.39 1.368-1.93 1.46-.51.087-1.005.196-3.43-.716-2.898-1.075-4.773-3.86-4.918-4.052-.144-.19-1.173-1.56-1.173-2.975 0-1.414.743-2.104 1.006-2.39.263-.285.58-.356.773-.356.193 0 .387.002.556.01.19.01.446-.072.698.53.265.633.902 2.19.98 2.348.078.158.13.343.025.555-.104.212-.313.325-.486.444-.173.118-.365.25-.525.337-.167.09-.35.188-.477.318-.15.153-.303.385-.132.713.17.327.756 1.247 1.625 2.02 1.117 1.002 2.06 1.312 2.354 1.456.293.144.465.12.637-.073.17-.193.743-.86.94-1.156.198-.295.396-.247.665-.149.27.098 1.73.815 2.027.964.298.149.495.223.568.349.074.127.05.733-.216 1.478z" />
    </svg>
  );
}
