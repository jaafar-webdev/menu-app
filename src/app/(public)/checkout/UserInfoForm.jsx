import PhoneIcon from "../../../components/icon/PhoneIcon";
import UserIcon from "../../../components/icon/UserIcon";
import Input from "@/components/ui/Input";

const UserInfoForm = ({ userInfo, onInputChange, onBlur, errors }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          icon={<UserIcon />}
          type="text"
          name="name"
          value={userInfo.name}
          onChange={onInputChange}
          readOnly
          disabled
        />
        <Input
          icon={<PhoneIcon />}
          type="text"
          name="phone"
          value={userInfo.phone}
          onChange={onInputChange}
          readOnly
          disabled
        />
      </div>
      <textarea
        name="address"
        value={userInfo.address}
        onChange={onInputChange}
        onBlur={onBlur}
        placeholder="أدخل عنوانك هنا..."
        className={`w-full p-3 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
          errors.address ? "border-red-500" : "border-gray-300"
        }
            }`}
        rows="4"
      />
      {errors.address && (
        <p className="text-red-500 text-sm">{errors.address}</p>
      )}
    </div>
  );
};

export default UserInfoForm;
