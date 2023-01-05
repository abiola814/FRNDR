import { TouchableOpacity } from "react-native";

const Icon = ({ size, color, icon, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
  
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size / 2,
        backgroundColor: color,
        zIndex: 102,
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default Icon;
