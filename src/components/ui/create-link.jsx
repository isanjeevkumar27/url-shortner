import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { getUrls } from '@/db/apiUrls'
import useFetch from '@/hooks/use-fetch'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import { UrlState } from "@/context";
import Error from "../error";
import { Card } from "@/components/ui/card"
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import * as yup from "yup"
import { QRCode } from "react-qrcode-logo";
import { createUrl } from '@/db/apiUrls'
import { BeatLoader } from "react-spinners";
import { useMemo } from 'react'
import { useCallback } from 'react'

export default function CreateLink() {
  const {user} = UrlState();

  const navigate = useNavigate();
  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, {...formValues, user_id: user.id});

  useEffect(() => {
  if (data) {
    navigate(`/link/${data[0].id}`);
  }
}, [data]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, {abortEarly: false});

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-[#E8A73B] hover:bg-[#F2B754] text-[#12131A] font-semibold rounded-md">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#1B1D28] border border-[#2C2E3D] text-[#F5F3EF]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-[#F5F3EF]">Create New</DialogTitle>
        </DialogHeader>
        
        {formValues?.longUrl && (
          <div className="self-center rounded-md overflow-hidden ring ring-[#2C2E3D]">
            <QRCode ref={ref} size={250} value={formValues?.longUrl} />
          </div>
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
          className="bg-[#12131A] border border-[#2C2E3D] text-[#F5F3EF] placeholder:text-[#5C5E6E] focus-visible:ring-[#E8A73B]"
        />
        {errors.title && <Error message={errors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter your Loooong URL"
          value={formValues.longUrl}
          onChange={handleChange}
          className="bg-[#12131A] border border-[#2C2E3D] text-[#F5F3EF] placeholder:text-[#5C5E6E] focus-visible:ring-[#E8A73B] font-mono"
        />
        {errors.longUrl && <Error message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-2 bg-[#12131A] border border-[#2C2E3D] text-[#7C8CFF] font-mono text-sm">trimrr.in</Card> <span className="text-[#5C5E6E]">/</span>
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl?formValues.customUrl:null}
            onChange={handleChange}
            className="bg-[#12131A] border border-[#2C2E3D] text-[#F5F3EF] placeholder:text-[#5C5E6E] focus-visible:ring-[#E8A73B] font-mono"
          />
        </div>
        {error && <Error message={error.message} />}
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            onClick={createNewLink}
            disabled={loading}
            className="bg-[#E8A73B] hover:bg-[#F2B754] text-[#12131A] font-semibold rounded-md"
          >
            {loading ? <BeatLoader size={10} color="#12131A" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}