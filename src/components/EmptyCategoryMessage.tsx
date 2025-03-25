interface EmptyCategoryMessageProps {
  description: string;
}

const EmptyCategoryMessage = ({ description }: EmptyCategoryMessageProps) => (
  <p className="text-gray-500 italic text-center p-4">{description}</p>
);

export default EmptyCategoryMessage;
