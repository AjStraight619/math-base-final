import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type FeatureProps = {
  title: string;
  description: string;
  icon: string;
};

const Feature = ({ title, description, icon }: FeatureProps) => {
  return (
    <Card className="transform transition duration-300 hover:scale-105 hover:shadow-lg shadow-violet-700 w-[16rem]">
      <CardHeader className="p-4">
        <CardTitle className="flex flex-row items-center justify-between gap-2">
          <span className="text-lg font-semibold">{title}</span>
          <span className="text-xl">{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-left p-4">{description}</CardContent>
    </Card>
  );
};

export default Feature;
