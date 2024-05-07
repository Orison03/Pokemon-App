import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface cardProp {
  name: string;
  image: string;
  height: number;
  weight: number;
  abilities: any;
  stats: any;
}

export const Card = ({
  name,
  image,
  height,
  weight,
  abilities,
  stats,
}: cardProp) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-[20px] p-2 group cursor-pointer">
      <div className="bg-gray-100/45 w-full flex justify-center items-center rounded-[15px]">
        <img
          src={image}
          className="w-auto h-[171px] object-cover relative -top-14"
        />
      </div>
      <p className="font-title text-center font-medium text-2xl text-black pt-5">
        {name}
      </p>
      {/* view btn */}
      <Sheet>
        <SheetTrigger className="w-full">
          <div className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto py-3 transition-opacity duration-200 ease-in-out">
            <div className="flex justify-between items-center  py-3 px-5 bg-[#E85382] text-white rounded-[14px]">
              <p className="font-description">View Pokemon</p>
              <Eye />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-[#FFFFFF] border-none w-full overflow-y-scroll">
          {/* dominant color not working for me :( */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full flex justify-center items-center rounded-[15px] relative">
            <img
              src={image}
              className="relative -bottom-14 w-auto h-[340px] object-cover"
            />
          </div>
          <p className="font-title text-center font-semibold text-2xl text-black pt-20 pb-3 capitalize">
            {name}
          </p>
          {/* tabs */}
          <div className="w-full">
            <Tabs defaultValue="about" className="w-full">
              {/* start of about */}
              <TabsContent
                value="about"
                className="text-center font-description"
              >
                <Separator className="md:w-[428px] mx-auto" />
                <h2 className="font-description font-semibold text-2xl pt-2">
                  About
                </h2>
                <div className="space-y-4 flex flex-col py-3 mt-3 mb-20 bg-gradient-to-r from-[#D9D9D9] to-[#D9D9D9]/30 md:w-[428px] mx-auto">
                  <p className="font-normal text-xl border-b border-[#D9D9D9] py-3">
                    Height : <span className="font-semibold">{height}m</span>
                  </p>
                  <p className="font-normal text-xl border-b border-[#D9D9D9] py-3">
                    Weight : <span className="font-semibold">{weight}kg</span>
                  </p>
                  <p className="font-normal text-xl flex justify-center space-x-1 py-3">
                    Abilities :
                    {abilities.map((ability: any, index: any) => (
                      <ul key={index} className="font-semibold">
                        {" "}
                        {ability.ability.name}
                        {index < abilities.length - 1 ? ", " : ""}
                      </ul>
                    ))}
                  </p>
                </div>
              </TabsContent>
              {/* end of about */}

              {/* start of stats */}
              <TabsContent
                value="stats"
                className="text-center font-description"
              >
                <Separator className="md:w-[428px] mx-auto" />
                <h2 className="font-description font-semibold text-2xl pt-2">
                  Stats
                </h2>
                <div className="space-y-4 flex flex-col py-3 mt-3 mb-20 bg-gradient-to-r from-[#D9D9D9] to-[#D9D9D9]/30 md:w-[428px] mx-auto">
                  {stats.map((stat: any, index: any) => (
                    <p
                      key={index}
                      className="font-normal max-sm:text-lg text-xl border-b border-[#D9D9D9] py-3 flex items-center justify-between space-x-3 text-nowrap px-4"
                    >
                      <span>{stat.stat.name.toUpperCase()}</span>
                      <Progress value={(stat.base_stat / 255) * 100} />
                    </p>
                  ))}
                </div>
              </TabsContent>
              {/* end of stats */}

              {/* start of similar */}
              <TabsContent
                value="similar"
                className="text-center font-description"
              >
                <Separator className="md:w-[428px] mx-auto" />
                <h2 className="font-description font-semibold text-2xl pt-2">
                  Similar
                </h2>
                {/* <div className="space-y-4 flex flex-col py-3 mt-3 mb-20 bg-gradient-to-r from-[#D9D9D9] to-[#D9D9D9]/30 w-[428px] mx-auto"></div> */}
              </TabsContent>
              <TabsList>
                <TabsTrigger
                  className="px-4 md:px-10 py-3 rounded-[30px] md:rounded-[60px] text-lg font-medium"
                  value="about"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  className="px-4 md:px-10 py-3 rounded-[30px] md:rounded-[60px] text-lg font-medium"
                  value="stats"
                >
                  Stats
                </TabsTrigger>
                <TabsTrigger
                  className="px-4 md:px-10 py-1 md:py-3 rounded-[30px] md:rounded-[60px] text-lg font-medium max-sm:text-sm"
                  value="similar"
                >
                  Similar
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
