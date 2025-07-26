import { SplittingText } from "../animate-ui/text/splitting";
import { Container } from "./CardBody";

interface CardHeaderProps {
  title: string;
  description?: string;
}

export const CardHeader = ({ title, description }: CardHeaderProps) => (
  <Container>
    <div className="p-2 w-full flex justify-center">
      <SplittingText className="text-4xl font-bold" text={title} />
    </div>
    {description && (
      <div>
        <p className="text-gray-700 text-center dark:text-gray-300">{description}</p>
      </div>
    )}
  </Container>
);
