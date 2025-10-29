interface FounderCardProps {
  name: string;
  headline: string;
  bio: string;
  email: string;
  imageSrc: string;
  imageAlt: string;
}

const FounderCard = ({ name, headline, bio, email, imageSrc, imageAlt }: FounderCardProps) => {
  return (
    <article className="bg-card border rounded-lg p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/10"
        loading="lazy"
      />
      <div className="text-center">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{headline}</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{bio}</p>
        <p className="text-xs text-muted-foreground">
          <a href={`mailto:${email}`} className="text-accent hover:underline font-medium">
            {email}
          </a>
        </p>
      </div>
    </article>
  );
};

export default FounderCard;
