import { toast } from "react-toastify";
const copyToClipboard = async (text: string) => {
  //   if ("clipboard" in navigator) {
  toast.success("Copied Successfully", {
    hideProgressBar: true,
    autoClose: 800,
  });
  return await navigator.clipboard.writeText(text);
  //   } else {
  //     return document.execCommand("copy", true, text);
  //   }
};

export default copyToClipboard;
