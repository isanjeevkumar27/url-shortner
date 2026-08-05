import React from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/use-fetch'
import { getUrl } from '../db/apiUrls'
import { deleteUrl } from '../db/apiUrls'
import { getClicksForUrl } from '../db/clicks'
import { UrlState } from '../context'
import { BarLoader, BeatLoader } from 'react-spinners'
import { LinkIcon, Copy, Download, Trash } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

import Location from '../components/location-stats'
import DeviceStats from '../components/device-stats'

const Link = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

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
  const navigate = useNavigate();
  const {user} = UrlState();
  const {id} = useParams();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, {id, user_id: user?.id});

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#E8A73B" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between px-6 md:px-11 py-10 bg-[#12131A] text-[#F5F3EF] min-h-screen">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5 min-w-0 max-w-full">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer break-words">
            {url?.title}
          </span>
          <a
            href={`/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-[#7C8CFF] font-bold hover:underline cursor-pointer font-mono break-all"
          >
            https://trimrr.in/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer text-[#B8B9C4] break-all"
          >
            <LinkIcon className="p-1 shrink-0" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm text-[#5C5E6E]">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-[#F5F3EF] hover:bg-[#1B1D28] hover:text-[#E8A73B]"
              onClick={() =>
                navigator.clipboard.writeText(`https://trimrr.in/${link}`)
              }
            >
              <Copy />
            </Button>
            <Button
              variant="ghost"
              className="text-[#F5F3EF] hover:bg-[#1B1D28] hover:text-[#E8A73B]"
              onClick={downloadImage}
            >
              <Download />
            </Button>
            <Button
              variant="ghost"
              className="text-[#F5F3EF] hover:bg-[#1B1D28] hover:text-red-400"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-[#E8A73B] p-1 object-contain rounded-md bg-[#1B1D28]"
            alt="qr code"
          />
        </div>

        <Card className="sm:w-3/5 min-w-0 max-w-full bg-[#1B1D28] border border-[#2C2E3D] text-[#F5F3EF]">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card className="bg-[#12131A] border border-[#2C2E3D] text-[#F5F3EF]">
                <CardHeader>
                  <CardTitle className="font-mono text-xs tracking-[0.15em] uppercase text-[#7C8CFF]">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-extrabold">{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle className="text-[#F5F3EF]">Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle className="text-[#F5F3EF]">Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent className="text-[#5C5E6E]">
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;