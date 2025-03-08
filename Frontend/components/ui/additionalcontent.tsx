import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import MyImage from "../MyImage2.jpeg";
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

const AdditionalContent = () => {
  return (
    <div className="w-full max-w-7xl">
      <div className="flex justify-between mb-32">
        {[
          "Audience Insights",
          "Real-Time Personalization",
          "Campaign Optimization",
        ].map((title, index) => (
          <div key={index} className="w-[300px]">
            <div className="h-[350px] rounded-[50px] overflow-hidden border-[5px] border-gradient">
              <Image
                src={MyImage}
                alt={title}
                width={300}
                height={350}
                className="object-cover w-full h-full"
              />
            </div>
            <h3
              className={`${josefinSans.className} text-[30px] text-white text-center mt-4`}
            >
              {title}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <div className="w-1/2 pr-8">
          <Image
            src={MyImage}
            alt="AI Marketing"
            width={400}
            height={400}
            className="rounded-3xl"
          />
        </div>
        <div className="w-1/2">
          <h2
            className={`${josefinSans.className} text-[60px] font-bold leading-tight mb-6`}
          >
            <span className="bg-gradient-to-r from-[#2BD8D5] to-[#DC00D3] text-transparent bg-clip-text">
              Transform Marketing with AI
            </span>
            <span className="text-white">—One Insight at a Time</span>
          </h2>
          <p
            className={`${josefinSans.className} text-white text-[15px] font-light mb-6`}
          >
            Step into the future of marketing with AI-powered solutions that
            deliver precision like never before. Identify your target audience,
            create hyper-personalized campaigns, and adapt strategies in
            real-time to maximize engagement and conversions. The smarter the
            campaign, the higher the impact—experience the power of AI-driven
            marketing today.
          </p>
          <button
            className={`${josefinSans.className} w-[180px] h-[32px] rounded-[15px] bg-gradient-to-r from-[#2BD8D5] via-[#DC00D3] to-purple-600 text-white text-[15px] font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalContent;
