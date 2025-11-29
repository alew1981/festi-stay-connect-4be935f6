interface SEOTextProps {
  title: string;
  description: string;
  keywords?: string[];
}

export const SEOText = ({ title, description, keywords }: SEOTextProps) => {
  return (
    <div className="mb-12 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        {keywords && keywords.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold">Búsquedas relacionadas:</span> {keywords.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};
