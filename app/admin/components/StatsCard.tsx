import { HiBriefcase, HiUsers } from "react-icons/hi";

interface StatsCardProps {
  title: string;
  value: number;
  icon: "briefcase" | "users";
  color: "blue" | "green";
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const iconMap = {
    briefcase: HiBriefcase,
    users: HiUsers,
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-500";
      case "green":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100";
      case "green":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const Icon = iconMap[icon];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${getBgColor(color)}`}>
          <Icon className={`h-6 w-6 ${getIconColor(color)}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
