export const STANDARD_FORMATS = [
   { value: "png", label: "PNG" },
   { value: "jpg", label: "JPG" },
   { value: "jpeg", label: "JPEG" },
   { value: "gif", label: "GIF" },
   { value: "mp4", label: "MP4" },
   { value: "mov", label: "MOV" },
   { value: "mp3", label: "MP3" },
];

export const customSelectStyles = {
   control: (provided: any) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: "#D1D5DB",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      padding: "4px 0",
      minHeight: "44px",
   }),
   multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#E0F2F1",
      color: "#12ABAA",
      borderRadius: "4px",
   }),
   multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#12ABAA",
      fontWeight: "600",
   }),
   multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#12ABAA",
      "&:hover": {
         backgroundColor: "#B2EBF2",
         color: "#12ABAA",
      },
   }),
   placeholder: (provided: any) => ({
      ...provided,
      color: "#9CA3AF",
   }),
};
