/* eslint-disable react/prop-types */
import {Copy, Download, LinkIcon, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import {deleteUrl} from "@/db/apiUrls";
import {BeatLoader} from "react-spinners";




const LinkCard = ({url = [], fetchUrls}) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title; // Desired file name for the downloaded image

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url.id);

  return (
    
    <div className="flex flex-col md:flex-row gap-5 border border-[#2C2E3D] p-4 bg-[#1B1D28] text-[#F5F3EF] rounded-lg w-full max-w-full overflow-hidden">
      <img
        src={url?.qr}
        className="h-32 w-32 object-contain ring ring-[#E8A73B] self-start rounded-md bg-[#12131A] shrink-0"
        alt="qr code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 min-w-0">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer break-words">
          {url?.title}
        </span>
        <span className="text-2xl text-[#7C8CFF] font-bold hover:underline cursor-pointer font-mono break-all">
          https://link-url-shortner.vercel.app/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer text-[#B8B9C4] break-all">
          <LinkIcon className="p-1 shrink-0" />
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1 text-[#5C5E6E]">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2 shrink-0">
        <Button
          variant="ghost"
          className="text-[#F5F3EF] hover:bg-[#12131A] hover:text-[#E8A73B]"
          onClick={() =>
  navigator.clipboard.writeText(
    `https://link-url-shortner.vercel.app/${url?.custom_url || url?.short_url}`
  )
}
        >
          <Copy />
        </Button>
        <Button
          variant="ghost"
          className="text-[#F5F3EF] hover:bg-[#12131A] hover:text-[#E8A73B]"
          onClick={downloadImage}
        >
          <Download />
        </Button>
        <Button
          variant="ghost"
          className="text-[#F5F3EF] hover:bg-[#12131A] hover:text-red-400"
          onClick={() => fnDelete().then(() => fetchUrls())}
          disable={loadingDelete}
        >
          {loadingDelete ? <BeatLoader size={5} color="#F5F3EF" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;