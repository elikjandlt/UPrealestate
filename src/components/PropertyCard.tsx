import Image from "next/image";
import { MapPin, Maximize, BedDouble, Bath } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { HoverCard } from "@/components/motion/FadeIn";

interface Property {
  _id: string;
  title: string;
  slug: string;
  price: number;
  location: string;
  rooms: number;
  bathrooms: number;
  area: number;
  floor: string;
  badges: string[];
  image?: string;
}

export function PropertyCard({ property }: { property: Property }) {
  const formatPrice = (price: number) =>
    "₮" + price.toLocaleString("mn-MN");

  return (
    <HoverCard className="group h-full">
      <Link href={`/properties/${property.slug}`} className="block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {property.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-muted-foreground/30 text-muted-foreground/50">
                <span className="text-lg font-bold">?</span>
              </div>
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {property.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-semibold",
                  badge === "Зарах"
                    ? "bg-primary text-primary-foreground"
                    : badge === "Түрээс"
                    ? "bg-purple-600 text-white"
                    : badge === "Verified"
                    ? "bg-success text-white"
                    : badge === "Эрэлт их"
                    ? "bg-destructive text-white"
                    : "bg-foreground text-background"
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-base font-semibold text-card-foreground">
            {property.title}
          </h3>
          <p className="mt-1 text-xl font-bold text-primary">{formatPrice(property.price)}</p>
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {property.rooms > 0 && (
              <div className="flex items-center gap-1">
                <BedDouble className="h-4 w-4" />
                <span>{property.rooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.area}м²</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Давхар: {property.floor}</p>
        </div>
      </Link>
    </HoverCard>
  );
}
