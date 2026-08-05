import React from 'react'
import { BarLoader } from 'react-spinners'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Filter } from 'lucide-react'
import Error from '../components/error'
import { UrlState } from '../context'
import useFetch from '../hooks/use-fetch'
import { getUrls } from '../db/apiUrls'
import { getClicksForUrls } from '../db/clicks'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import LinkCard from '../components/ui/link-card'
import { useMemo } from 'react'
import CreateLink from '../components/ui/create-link'

function Dashboard() {

  const [searchQuery, setSearchQuery] = React.useState("");

  const { user } = UrlState()

  const {
    data: urls,
    loading,
    error,
    fn: fnUrls
  } = useFetch(getUrls, user?.id);

  const {
    data: clicks,
    loading: clicksLoading,
    error: clicksError,
    fn: fnClicks
  } = useFetch(
    getClicksForUrls,
    urls?.map(url => url.id)
  );

  useEffect(() => {
    fnUrls()
  }, []);

  //if there is url then only fetch the clicks for those urls
  useEffect(() => {
    if (urls?.length > 0) {
      fnClicks();
    }
  }, [urls?.length]);

  //getting the searched url

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10 bg-[#12131A] text-[#F5F3EF] min-h-screen w-full max-w-full overflow-x-hidden">

      {loading || clicksLoading ? (
        <BarLoader width={"100%"} color={"#E8A73B"} />
      ) : null}

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

        <Card className='bg-[#1B1D28] border border-[#2C2E3D] text-[#F5F3EF]'>
          <CardHeader>
            <CardTitle className='font-mono text-xs tracking-[0.15em] uppercase text-[#7C8CFF]'>
              Links Created
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className='text-2xl sm:text-3xl lg:text-4xl font-extrabold'>
              {urls?.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card className='bg-[#1B1D28] border border-[#2C2E3D] text-[#F5F3EF]'>
          <CardHeader>
            <CardTitle className='font-mono text-xs tracking-[0.15em] uppercase text-[#7C8CFF]'>
              Total Clicks
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className='text-2xl sm:text-3xl lg:text-4xl font-extrabold'>
              {clicks?.length || 0}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Heading and Create Button */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F3EF]'>
          My Links
        </h1>

        <div className="w-full sm:w-auto">
          <CreateLink />
        </div>
      </div>

      {/* Search Box */}
      <div className='relative w-full max-w-full'>
        <Input

          type='text'
          placeholder='Search Links'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full pr-10 mb-6 bg-[#1B1D28] border border-[#2C2E3D] text-[#F5F3EF] placeholder:text-[#5C5E6E] focus-visible:ring-[#E8A73B]'
        />

        <Filter className='absolute right-3 top-3 h-5 w-5 text-[#5C5E6E]' />

        {error && <Error message={error.message} />}
        {clicksError && <Error message={clicksError.message} />}

        {/* //filtering the urls based on the search query and mapping them to the LinkCard component
        //if there are "" in search then filteredUrls will be equal to urls and all the urls will be displayed

        //here if filteredUrls is null or undefined then we will map over an empty array to avoid errors

        //if there are no urls then we will display a message saying "No Links Found" */}
        {filteredUrls?.length === 0 &&
          <p className='text-center text-[#5C5E6E] mt-4'>
            No Links Found
          </p>
        }

        {/* //url,i
        //url= is current url in the array
        //and i is the index of the current url in the array */}

        {/* return (
    <LinkCard
        key={0}
        url={{
            id:1,
            title:"Google",
            short_url:"abc123"
        }}
        fetchUrls={fnUrls}
    />
); */}

        <div className="flex flex-col gap-4 w-full max-w-full">
          {(filteredUrls || []).map((url, i) => {
            return (
              <LinkCard
                key={i}
                url={url}
                fetchUrls={fnUrls}
              />
            );
          })}
        </div>

      </div>

    </div>
  )
}

export default Dashboard