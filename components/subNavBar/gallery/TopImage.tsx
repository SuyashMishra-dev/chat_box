import { AppContext } from "@/providers";
import React, { useContext } from "react";
import Image from "next/image"; // Assuming you're using Next.js, replace with standard <img> if not

const TopImage = () => {
  const { appData } = useContext(AppContext);

  if (!appData?.card) return null;

  const cardDetails = appData.card;

  return (
    <div className="t-body-chat relative h-full space-y-6 px-5 text-primary-700 w-full mx-auto xl:max-w-[40rem]">
      <div className="pb-6 lg:pb-8 min-h-[calc(100%-60px)] sm:min-h-[calc(100%-120px)]">
        <div className="relative space-y-6">
          <div
            className="space-y-6"
            style={{ opacity: 1, transform: "none" }}
          ></div>
          <div>
            <div className="flex items-end gap-2 overflow-hidden rounded-2xl border border-[#E0D5C1] p-2">
              <div className="t-heading-m font-semibold text-4xl flex-1 py-2 pl-2 text-primary-700">
                {cardDetails.text}
              </div>
              <div className="relative h-[180px] w-full flex-1 overflow-hidden rounded-xl">
                <Image
                  alt="Card header for Tap into your creative side"
                  loading="lazy"
                  decoding="async"
                  src={cardDetails.imgUrl}
                  layout="fill"
                  objectFit="cover"
                  sizes="100vw"
                />
              </div>
            </div>
            <div className="py-2 pt-4">
              <div className="t-body-chat px-4">
                <div className="w-full">
                  <div className="whitespace-pre-wrap mb-4 last:mb-0">
                    <span>Tapping </span>
                    <span>into </span>
                    <span>your </span>
                    <span>creativity </span>
                    <span>can </span>
                    <span>be </span>
                    <span>a </span>
                    <span>rewarding </span>
                    <span>and </span>
                    <span>enriching </span>
                    <span>experience.</span>
                  </div>
                  <div className="whitespace-pre-wrap mb-4 last:mb-0">
                    <span className="font-bold">Here </span>
                    <span className="font-bold">are </span>
                    <span className="font-bold">some </span>
                    <span className="font-bold">tips </span>
                    <span className="font-bold">to </span>
                    <span className="font-bold">help </span>
                    <span className="font-bold">you </span>
                    <span className="font-bold">get </span>
                    <span className="font-bold">started:</span>
                  </div>
                  <ol
                    start={1}
                    className="[&_li]:mb-2 leading-7 pl-6 mb-4 last:mb-0 list-decimal"
                  >
                    <li className="pl-1 marker:text-neutral-700 marker:font-medium">
                      <div className="w-full">
                        <div className="whitespace-pre-wrap mb-4 last:mb-0">
                          <span>Set </span>
                          <span>aside </span>
                          <span>dedicated </span>
                          <span>creative </span>
                          <span>time: </span>
                          <span>Schedule </span>
                          <span>time </span>
                          <span>in </span>
                          <span>your </span>
                          <span>day </span>
                          <span>for </span>
                          <span>creative </span>
                          <span>pursuits </span>
                          <span>and </span>
                          <span>make </span>
                          <span>it </span>
                          <span>a </span>
                          <span>priority. </span>
                          <span>Even </span>
                          <span>just </span>
                          <span>a </span>
                          <span>few </span>
                          <span>minutes </span>
                          <span>of </span>
                          <span>creative </span>
                          <span>activity </span>
                          <span>each </span>
                          <span>day </span>
                          <span>can </span>
                          <span>help </span>
                          <span>build </span>
                          <span>a </span>
                          <span>habit.</span>
                        </div>
                      </div>
                    </li>
                    <li className="pl-1 marker:text-[#a99e89]">
                      <div className="w-full">
                        <div className="whitespace-pre-wrap mb-4 last:mb-0">
                          <span>Explore </span>
                          <span>different </span>
                          <span>mediums: </span>
                          <span>Try </span>
                          <span>different </span>
                          <span>forms </span>
                          <span>of </span>
                          <span>creative </span>
                          <span>expression, </span>
                          <span>such </span>
                          <span>as </span>
                          <span>writing, </span>
                          <span>painting, </span>
                          <span>music, </span>
                          <span>or </span>
                          <span>photography, </span>
                          <span>to </span>
                          <span>find </span>
                          <span>what </span>
                          <span>resonates </span>
                          <span>with </span>
                          <span>you.</span>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopImage;
