// src/components/ui/card.tsx
import * as React from "react";

// Define props for the Card component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Card component - a simple div with styling
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Define props for the CardHeader component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

// CardHeader component (optional, but often used with Card)
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// Define props for the CardTitle component
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

// CardTitle component (optional)
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// Define props for the CardDescription component
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

// CardDescription component (optional)
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// Define props for the CardContent component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// CardContent component - used to wrap the main content within a Card
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  )
);
CardContent.displayName = "CardContent";

// Define props for the CardFooter component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// CardFooter component (optional)
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Export the components
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
